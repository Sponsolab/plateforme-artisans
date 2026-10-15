import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Comment vos données personnelles sont collectées, utilisées et transmises aux artisans partenaires.',
  openGraph: { title: 'Politique de confidentialité', url: '/legal/confidentialite' },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Politique de confidentialité</h1>
      <p className="rounded-md border border-dashed p-3 text-sm">
        TODO : contenu générique à relire et compléter par un juriste avant la mise en production.
      </p>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Responsable du traitement</h2>
        <p>
          TODO : identité et coordonnées du responsable du traitement, contact DPO le cas échéant.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Données collectées et finalités</h2>
        <p>
          Nous collectons les informations de votre demande de devis (projet, adresse, coordonnées,
          photos) afin de la transmettre à un artisan partenaire qui vous contactera. TODO : base
          légale et finalités à détailler.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Transmission aux artisans</h2>
        <p>
          Avec votre consentement explicite, vos données sont transmises à un artisan partenaire de
          votre secteur. TODO : à préciser.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Durée de conservation et sous-traitants</h2>
        <p>
          TODO : durées de conservation, sous-traitants (Supabase, Resend, Vercel) et transferts
          hors UE.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Vos droits</h2>
        <p>
          Accès, rectification, effacement, opposition, portabilité et réclamation auprès de la
          CNIL. TODO : adresse de contact pour exercer vos droits.
        </p>
      </section>
    </article>
  );
}
