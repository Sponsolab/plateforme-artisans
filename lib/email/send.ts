import 'server-only';
import type { ReactElement } from 'react';
import { Resend } from 'resend';

type SendEmailParams = {
  to: string | string[];
  subject: string;
  react: ReactElement;
};

export async function sendEmail({ to, subject, react }: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY est manquante : impossible d'envoyer l'email.");
  }

  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
  const { error } = await new Resend(apiKey).emails.send({ from, to, subject, react });
  if (error) {
    throw new Error(`Échec de l'envoi de l'email via Resend : ${error.message}`);
  }
}
