import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Demande envoyée',
  description: 'Votre demande de devis a bien été enregistrée.',
  robots: { index: false, follow: false },
  openGraph: { title: 'Demande envoyée', url: '/demande/merci' },
};

const REFERENCE = /^LD-\d{4}-\d{4}$/;

export default async function MerciPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const reference = ref && REFERENCE.test(ref) ? ref : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Merci, votre demande est envoyée</h1>
      {reference && (
        <p className="mt-4 text-lg">
          Votre référence : <strong>{reference}</strong>
        </p>
      )}
      <ol className="text-muted-foreground mx-auto mt-8 max-w-md space-y-3 text-left">
        <li>1. Vous recevez un email de confirmation.</li>
        <li>2. Nous transmettons votre demande à un artisan qualifié de votre secteur.</li>
        <li>
          3. L&apos;artisan vous contacte pour établir votre devis, gratuit et sans engagement.
        </li>
      </ol>
      <Button asChild variant="outline" className="mt-10">
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  );
}
