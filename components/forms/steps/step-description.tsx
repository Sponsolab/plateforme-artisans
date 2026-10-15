import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { FieldErrors, FormValues } from '@/components/forms/lead-form-config';
import { Field } from '@/components/forms/steps/field';

export const MAX_PHOTOS = 5;

type Props = {
  values: FormValues;
  errors: FieldErrors;
  photos: File[];
  photoError: string | null;
  onChange: <K extends keyof FormValues>(field: K, value: FormValues[K]) => void;
  onAddPhotos: (files: File[]) => void;
  onRemovePhoto: (index: number) => void;
};

export function StepDescription({
  values,
  errors,
  photos,
  photoError,
  onChange,
  onAddPhotos,
  onRemovePhoto,
}: Props) {
  return (
    <div className="space-y-5">
      <Field id="description" label="Décrivez votre projet" error={errors.description}>
        <Textarea
          id="description"
          rows={5}
          maxLength={2000}
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="sous_type" label="Type de prestation (optionnel)">
          <Input
            id="sous_type"
            value={values.sous_type}
            onChange={(e) => onChange('sous_type', e.target.value)}
          />
        </Field>
        <Field id="budget_estime" label="Budget estimé (optionnel)">
          <Input
            id="budget_estime"
            value={values.budget_estime}
            onChange={(e) => onChange('budget_estime', e.target.value)}
          />
        </Field>
      </div>
      <Field
        id="photos"
        label={`Photos (optionnel, ${MAX_PHOTOS} maximum)`}
        error={photoError ?? undefined}
      >
        <Input
          id="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => {
            onAddPhotos(Array.from(e.target.files ?? []));
            e.target.value = '';
          }}
        />
      </Field>
      {photos.length > 0 && (
        <ul className="space-y-1 text-sm">
          {photos.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-2">
              <span className="truncate">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`Retirer ${file.name}`}
                onClick={() => onRemovePhoto(i)}
              >
                <X />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
