import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site : éditeur, hébergeur et propriété intellectuelle.',
  openGraph: { title: 'Mentions légales', url: '/legal/mentions-legales' },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Mentions légales</h1>
      <p className="rounded-md border border-dashed p-3 text-sm">
        TODO : contenu générique à relire et compléter par un juriste avant la mise en production.
      </p>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Éditeur du site</h2>
        <p>
          TODO : raison sociale, forme juridique, capital, SIRET, adresse du siège, email, directeur
          de la publication.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Hébergeur</h2>
        <p>
          Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. TODO : à vérifier.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Nature de l’activité</h2>
        <p>
          Le site met en relation des particuliers avec des artisans indépendants (apporteur
          d’affaires). Il ne réalise pas les travaux, n’établit pas les devis et n’encaisse aucun
          paiement du client. TODO : formulation à valider.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
        <p>TODO : mention sur les contenus, marques et logos du site.</p>
      </section>
    </article>
  );
}
