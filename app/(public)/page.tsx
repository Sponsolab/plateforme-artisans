import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getActiveMetiers } from '@/lib/data/metiers';
import { SITE } from '@/lib/site';

// Lecture de la base à chaque requête : évite d'interroger Supabase au build.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Devis gratuit par un artisan qualifié` },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — Devis gratuit par un artisan qualifié`,
    description: SITE.description,
    url: '/',
  },
};

const STEPS = [
  { title: 'Vous décrivez', text: 'Votre projet, votre adresse et votre urgence, en 2 minutes.' },
  {
    title: 'Nous trouvons un artisan',
    text: 'Un artisan qualifié de votre secteur reçoit votre demande en exclusivité.',
  },
  {
    title: 'Vous recevez un devis',
    text: "L'artisan vous contacte et vous remet un devis gratuit, sans engagement.",
  },
];

export default async function HomePage() {
  const metiers = await getActiveMetiers();

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Trouvez l&apos;artisan qualifié près de chez vous
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">{SITE.description}</p>
        <Button asChild size="lg" className="mt-8 h-11 px-6 text-base">
          <Link href="/demande">Demander un devis</Link>
        </Button>
      </section>

      <section className="bg-muted/40 border-y">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-2xl font-semibold">Comment ça marche</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Card className="h-full">
                  <CardHeader>
                    <span className="text-muted-foreground text-sm font-medium">Étape {i + 1}</span>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.text}</CardDescription>
                  </CardHeader>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {metiers.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-center text-2xl font-semibold">Nos métiers</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metiers.map((m) => (
              <li key={m.id}>
                <Link href={`/demande?metier=${m.slug}`} className="block">
                  <Card className="hover:bg-muted/50 h-full transition-colors">
                    <CardHeader>
                      <CardTitle>{m.label}</CardTitle>
                      <CardDescription>Demander un devis gratuit</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
