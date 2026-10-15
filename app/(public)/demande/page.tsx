import type { Metadata } from 'next';
import { LeadForm } from '@/components/forms/lead-form';
import { getActiveMetiers } from '@/lib/data/metiers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Demander un devis gratuit',
  description:
    'Décrivez votre projet en 2 minutes : un artisan qualifié de votre secteur vous contacte pour un devis gratuit et sans engagement.',
  openGraph: {
    title: 'Demander un devis gratuit',
    description: 'Décrivez votre projet en 2 minutes et recevez un devis gratuit.',
    url: '/demande',
  },
};

export default async function DemandePage({
  searchParams,
}: {
  searchParams: Promise<{ metier?: string }>;
}) {
  const [{ metier }, metiers] = await Promise.all([searchParams, getActiveMetiers()]);
  const defaultMetierId = metiers.find((m) => m.slug === metier)?.id;

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Demander un devis gratuit</h1>
      {metiers.length > 0 ? (
        <LeadForm metiers={metiers} defaultMetierId={defaultMetierId} />
      ) : (
        <p className="text-muted-foreground">
          Le service est momentanément indisponible. Merci de réessayer dans quelques instants.
        </p>
      )}
    </div>
  );
}
