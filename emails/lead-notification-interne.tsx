import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components';
import type { Lead } from '@/types';

type Props = {
  lead: Lead;
  metierLabel: string;
};

const URGENCES: Record<string, string> = {
  immediat: 'Immédiat',
  semaine: 'Dans la semaine',
  mois: 'Dans le mois',
  projet: 'Projet à plus long terme',
};

export default function LeadNotificationInterne({ lead, metierLabel }: Props) {
  const rows: [string, string][] = [
    ['Référence', lead.reference],
    ['Métier', metierLabel + (lead.sous_type ? ` — ${lead.sous_type}` : '')],
    ['Urgence', URGENCES[lead.urgence] ?? lead.urgence],
    ['Budget estimé', lead.budget_estime ?? '—'],
    ['Adresse', `${lead.adresse}, ${lead.code_postal} ${lead.ville} (${lead.departement_code})`],
    ['Nom', lead.nom],
    ['Email', lead.email],
    ['Téléphone', lead.telephone],
    ['Photos', String(lead.photos.length)],
  ];

  return (
    <Html lang="fr">
      <Head />
      <Preview>{`Nouveau lead ${lead.reference} — ${metierLabel} (${lead.departement_code})`}</Preview>
      <Body
        style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f6f6', padding: '24px' }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '32px',
            borderRadius: '8px',
            maxWidth: '600px',
          }}
        >
          <Heading as="h1" style={{ fontSize: '20px' }}>
            Nouveau lead {lead.reference}
          </Heading>
          {rows.map(([label, value]) => (
            <Text key={label} style={{ margin: '4px 0' }}>
              <strong>{label} :</strong> {value}
            </Text>
          ))}
          <Hr />
          <Text style={{ fontWeight: 'bold', marginBottom: '4px' }}>Description</Text>
          <Text style={{ whiteSpace: 'pre-wrap', marginTop: 0 }}>{lead.description}</Text>
        </Container>
      </Body>
    </Html>
  );
}
