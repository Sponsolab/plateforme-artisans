'use server';

import { randomInt } from 'node:crypto';
import { createElement } from 'react';
import LeadConfirmation from '@/emails/lead-confirmation';
import LeadNotificationInterne from '@/emails/lead-notification-interne';
import { sendEmail } from '@/lib/email/send';
import { getIpHash, isRateLimited } from '@/lib/leads/rate-limit';
import { nextLeadReference } from '@/lib/leads/reference';
import { createAdminClient } from '@/lib/supabase/admin';
import { departementFromCodePostal } from '@/lib/utils/departement';
import { leadSchema } from '@/lib/validators/lead';
import type { ActionResult, Lead } from '@/types';

const MAX_PHOTOS = 5;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const fail = (error: string): { ok: false; error: string } => ({ ok: false, error });

export async function submitLead(formData: FormData): Promise<ActionResult<{ reference: string }>> {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value : '';
  };

  // Honeypot rempli = bot. On renvoie un faux succès avec une référence crédible (LD-année-NNNN
  // aléatoire) pour que le bot ne puisse pas distinguer un faux succès d'un vrai.
  // NE PAS "nettoyer" cette logique : ce n'est pas un bug. La référence est purement fictive :
  // elle n'est jamais insérée en base ni journalisée (ni console, ni Sentry), et ne doit jamais
  // l'être. Une valeur constante (ex. LD-0000-0000) serait un signal détectable par les bots.
  if (text('honeypot') !== '') {
    const fake = String(randomInt(1, 10000)).padStart(4, '0');
    return { ok: true, data: { reference: `LD-${new Date().getFullYear()}-${fake}` } };
  }

  const parsed = leadSchema.omit({ photos: true }).safeParse({
    metier_id: text('metier_id'),
    sous_type: text('sous_type') || undefined,
    urgence: text('urgence'),
    description: text('description'),
    budget_estime: text('budget_estime') || undefined,
    adresse: text('adresse'),
    code_postal: text('code_postal'),
    ville: text('ville'),
    departement_code: text('departement_code'),
    nom: text('nom'),
    email: text('email'),
    telephone: text('telephone'),
    consentement_rgpd: text('consentement_rgpd') === 'true',
    honeypot: text('honeypot'),
  });
  if (!parsed.success) return fail('Certains champs sont invalides. Vérifiez le formulaire.');
  const input = parsed.data;

  if (departementFromCodePostal(input.code_postal) !== input.departement_code) {
    return fail('Le code postal ne correspond pas au département.');
  }

  const photos = formData
    .getAll('photos')
    .filter((f): f is File => f instanceof File && f.size > 0);
  const totalBytes = photos.reduce((sum, f) => sum + f.size, 0);
  if (photos.length > MAX_PHOTOS) return fail(`${MAX_PHOTOS} photos maximum.`);
  if (photos.some((f) => !(f.type in EXTENSIONS))) return fail('Format de photo non supporté.');
  if (totalBytes > MAX_TOTAL_BYTES)
    return fail('Photos trop volumineuses (4 Mo maximum au total).');

  const supabase = createAdminClient();

  try {
    const ipHash = await getIpHash();
    if (await isRateLimited(supabase, ipHash)) {
      return fail('Trop de demandes envoyées. Réessayez dans une heure.');
    }

    let lead: Lead | null = null;
    for (let attempt = 0; attempt < 5 && !lead; attempt++) {
      const { data, error } = await supabase
        .from('leads')
        .insert({
          metier_id: input.metier_id,
          sous_type: input.sous_type,
          urgence: input.urgence,
          description: input.description,
          budget_estime: input.budget_estime,
          adresse: input.adresse,
          code_postal: input.code_postal,
          ville: input.ville,
          departement_code: input.departement_code,
          nom: input.nom,
          email: input.email,
          telephone: input.telephone,
          reference: await nextLeadReference(supabase),
          consentement_rgpd_at: new Date().toISOString(),
          ip_hash: ipHash,
          source: 'site',
        })
        .select()
        .single();
      if (error && error.code !== '23505') throw error; // 23505 : référence déjà prise, on réessaie
      lead = data;
    }
    if (!lead) throw new Error('Impossible de générer une référence unique.');

    if (photos.length > 0) {
      const paths = photos.map((f, i) => `${lead.reference}/${i + 1}.${EXTENSIONS[f.type]}`);
      const uploads = await Promise.all(
        photos.map((f, i) =>
          supabase.storage.from('lead-photos').upload(paths[i], f, { contentType: f.type }),
        ),
      );
      const uploadError = uploads.find((u) => u.error)?.error;
      if (uploadError) {
        await supabase.storage.from('lead-photos').remove(paths);
        await supabase.from('leads').delete().eq('id', lead.id);
        throw uploadError;
      }
      const { error } = await supabase.from('leads').update({ photos: paths }).eq('id', lead.id);
      if (error) throw error;
      lead.photos = paths;
    }

    await notify(lead);
    return { ok: true, data: { reference: lead.reference } };
  } catch (err) {
    console.error('submitLead:', err);
    return fail("Une erreur est survenue, votre demande n'a pas été enregistrée. Réessayez.");
  }
}

// Le lead est déjà enregistré : un échec d'email est journalisé mais ne fait pas échouer l'action.
async function notify(lead: Lead) {
  const { data: metier } = await createAdminClient()
    .from('metiers')
    .select('label')
    .eq('id', lead.metier_id)
    .single();
  const metierLabel = metier?.label ?? 'Artisan';
  const admins = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

  const results = await Promise.allSettled([
    sendEmail({
      to: lead.email,
      subject: `Votre demande de devis ${lead.reference}`,
      react: createElement(LeadConfirmation, {
        nom: lead.nom,
        reference: lead.reference,
        metierLabel,
      }),
    }),
    ...(admins.length > 0
      ? [
          sendEmail({
            to: admins,
            subject: `Nouveau lead ${lead.reference} — ${metierLabel} (${lead.departement_code})`,
            react: createElement(LeadNotificationInterne, { lead, metierLabel }),
          }),
        ]
      : []),
  ]);
  for (const r of results) {
    if (r.status === 'rejected') console.error('submitLead email:', r.reason);
  }
}
