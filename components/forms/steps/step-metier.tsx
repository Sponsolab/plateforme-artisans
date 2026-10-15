import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  URGENCE_LABELS,
  type FieldErrors,
  type FormValues,
} from '@/components/forms/lead-form-config';
import { Field } from '@/components/forms/steps/field';
import type { Metier } from '@/types';

type Props = {
  values: FormValues;
  errors: FieldErrors;
  metiers: Metier[];
  onChange: <K extends keyof FormValues>(field: K, value: FormValues[K]) => void;
};

export function StepMetier({ values, errors, metiers, onChange }: Props) {
  return (
    <div className="space-y-5">
      <Field id="metier_id" label="Métier" error={errors.metier_id}>
        <Select value={values.metier_id} onValueChange={(v) => onChange('metier_id', v)}>
          <SelectTrigger id="metier_id" className="w-full">
            <SelectValue placeholder="Choisissez un métier" />
          </SelectTrigger>
          <SelectContent>
            {metiers.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field id="urgence" label="Quand souhaitez-vous intervenir ?" error={errors.urgence}>
        <Select value={values.urgence} onValueChange={(v) => onChange('urgence', v)}>
          <SelectTrigger id="urgence" className="w-full">
            <SelectValue placeholder="Choisissez une échéance" />
          </SelectTrigger>
          <SelectContent>
            {URGENCE_LABELS.map((u) => (
              <SelectItem key={u.value} value={u.value}>
                {u.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
