import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components';
import { SITE } from '@/lib/site';

type Props = {
  nom: string;
  reference: string;
  metierLabel: string;
};

export default function LeadConfirmation({ nom, reference, metierLabel }: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>{`Votre demande ${reference} a bien été reçue`}</Preview>
      <Body
        style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f6f6f6', padding: '24px' }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '32px',
            borderRadius: '8px',
            maxWidth: '560px',
          }}
        >
          <Heading as="h1" style={{ fontSize: '22px' }}>
            Votre demande est bien reçue
          </Heading>
          <Text>Bonjour {nom},</Text>
          <Text>
            Nous avons bien reçu votre demande de devis ({metierLabel}). Votre référence :{' '}
            <strong>{reference}</strong>.
          </Text>
          <Text>
            Nous recherchons un artisan qualifié dans votre secteur. Il vous contactera directement
            pour établir votre devis, gratuitement et sans engagement.
          </Text>
          <Text style={{ color: '#666666', fontSize: '13px' }}>
            Conservez cette référence pour tout échange avec {SITE.name}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
