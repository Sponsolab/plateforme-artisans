import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions générales d’utilisation',
  description:
    'Conditions générales d’utilisation du service de mise en relation avec des artisans.',
  openGraph: { title: 'Conditions générales d’utilisation', url: '/legal/cgu' },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Conditions générales d’utilisation</h1>
      <p className="rounded-md border border-dashed p-3 text-sm">
        TODO : contenu générique à relire et compléter par un juriste avant la mise en production.
      </p>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Objet</h2>
        <p>TODO : décrire le service de mise en relation et ses conditions d’accès.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Rôle de la plateforme</h2>
        <p>
          La plateforme est un simple apporteur d’affaires : elle n’est pas partie au contrat entre
          le client et l’artisan. TODO : à valider.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Responsabilité</h2>
        <p>
          TODO : limites de responsabilité, litiges, droit applicable et juridiction compétente.
        </p>
      </section>
    </article>
  );
}
