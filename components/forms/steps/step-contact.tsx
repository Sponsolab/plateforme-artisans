import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FieldErrors, FormValues } from '@/components/forms/lead-form-config';
import { Field } from '@/components/forms/steps/field';

type Props = {
  values: FormValues;
  errors: FieldErrors;
  onChange: <K extends keyof FormValues>(field: K, value: FormValues[K]) => void;
};

export function StepContact({ values, errors, onChange }: Props) {
  return (
    <div className="space-y-5">
      <Field id="nom" label="Nom et prénom" error={errors.nom}>
        <Input
          id="nom"
          autoComplete="name"
          value={values.nom}
          onChange={(e) => onChange('nom', e.target.value)}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </Field>
        <Field id="telephone" label="Téléphone" error={errors.telephone}>
          <Input
            id="telephone"
            type="tel"
            autoComplete="tel"
            value={values.telephone}
            onChange={(e) => onChange('telephone', e.target.value)}
          />
        </Field>
      </div>

      {/* Honeypot : invisible pour un humain, rempli par les bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(e) => onChange('honeypot', e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consentement_rgpd"
            checked={values.consentement_rgpd}
            onCheckedChange={(c) => onChange('consentement_rgpd', c === true)}
            className="mt-0.5"
          />
          <Label htmlFor="consentement_rgpd" className="text-sm leading-snug font-normal">
            J&apos;accepte que mes coordonnées et les informations de ma demande soient transmises à
            un artisan partenaire afin qu&apos;il me contacte pour établir un devis.
          </Label>
        </div>
        {errors.consentement_rgpd && (
          <p role="alert" className="text-destructive text-sm">
            {errors.consentement_rgpd}
          </p>
        )}
      </div>
    </div>
  );
}
