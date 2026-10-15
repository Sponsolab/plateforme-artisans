import { Input } from '@/components/ui/input';
import type { FieldErrors, FormValues } from '@/components/forms/lead-form-config';
import { Field } from '@/components/forms/steps/field';
import { departementFromCodePostal } from '@/lib/utils/departement';

type Props = {
  values: FormValues;
  errors: FieldErrors;
  onChange: <K extends keyof FormValues>(field: K, value: FormValues[K]) => void;
};

export function StepLocalisation({ values, errors, onChange }: Props) {
  const onCodePostal = (value: string) => {
    const code = value.replace(/\D/g, '').slice(0, 5);
    onChange('code_postal', code);
    onChange('departement_code', departementFromCodePostal(code) ?? '');
  };

  return (
    <div className="space-y-5">
      <Field id="adresse" label="Adresse du chantier" error={errors.adresse}>
        <Input
          id="adresse"
          autoComplete="street-address"
          value={values.adresse}
          onChange={(e) => onChange('adresse', e.target.value)}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="code_postal"
          label="Code postal"
          error={errors.code_postal ?? errors.departement_code}
        >
          <Input
            id="code_postal"
            inputMode="numeric"
            autoComplete="postal-code"
            value={values.code_postal}
            onChange={(e) => onCodePostal(e.target.value)}
          />
        </Field>
        <Field id="ville" label="Ville" error={errors.ville}>
          <Input
            id="ville"
            autoComplete="address-level2"
            value={values.ville}
            onChange={(e) => onChange('ville', e.target.value)}
          />
        </Field>
      </div>
      <Field id="departement_code" label="Département">
        <Input id="departement_code" value={values.departement_code} readOnly placeholder="Auto" />
      </Field>
    </div>
  );
}
