'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { submitLead } from '@/app/actions/lead';
import {
  FIELD_MESSAGES,
  INITIAL_VALUES,
  STEP_SCHEMAS,
  STEP_TITLES,
  type FieldErrors,
  type FormValues,
} from '@/components/forms/lead-form-config';
import { MAX_PHOTOS, StepDescription } from '@/components/forms/steps/step-description';
import { StepContact } from '@/components/forms/steps/step-contact';
import { StepLocalisation } from '@/components/forms/steps/step-localisation';
import { StepMetier } from '@/components/forms/steps/step-metier';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { resizeImage } from '@/lib/utils/image';
import type { Metier } from '@/types';

type Props = {
  metiers: Metier[];
  defaultMetierId?: string;
};

export function LeadForm({ metiers, defaultMetierId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>({
    ...INITIAL_VALUES,
    metier_id: defaultMetierId ?? '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onChange = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const onAddPhotos = (files: File[]) => {
    const images = files.filter((f) => f.type.startsWith('image/'));
    if (photos.length + images.length > MAX_PHOTOS) {
      setPhotoError(`${MAX_PHOTOS} photos maximum.`);
    } else {
      setPhotoError(null);
    }
    setPhotos((p) => [...p, ...images].slice(0, MAX_PHOTOS));
  };

  const validateStep = () => {
    const data = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, v === '' ? undefined : v]),
    );
    const result = STEP_SCHEMAS[step].safeParse({ ...data, metier_id: values.metier_id });
    if (result.success) return true;
    const next: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormValues;
      next[field] = FIELD_MESSAGES[field] ?? issue.message;
    }
    setErrors(next);
    return false;
  };

  const onNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSubmitError(null);

    startTransition(async () => {
      try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) formData.append(key, String(value));
        for (const photo of await Promise.all(photos.map((p) => resizeImage(p)))) {
          formData.append('photos', photo);
        }
        const result = await submitLead(formData);
        if (result.ok) {
          router.push(`/demande/merci?ref=${encodeURIComponent(result.data.reference)}`);
        } else {
          setSubmitError(result.error);
        }
      } catch {
        setSubmitError("Une erreur est survenue, votre demande n'a pas été envoyée. Réessayez.");
      }
    });
  };

  const isLast = step === STEP_TITLES.length - 1;

  return (
    <Card className="relative">
      <CardHeader>
        <p className="text-muted-foreground text-sm">
          Étape {step + 1} sur {STEP_TITLES.length}
        </p>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEP_TITLES.length}
          aria-valuenow={step + 1}
          className="bg-muted h-2 overflow-hidden rounded-full"
        >
          <div
            className="bg-primary h-full transition-all"
            style={{ width: `${((step + 1) / STEP_TITLES.length) * 100}%` }}
          />
        </div>
        <CardTitle className="pt-2 text-xl">{STEP_TITLES[step]}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          {step === 0 && (
            <StepMetier values={values} errors={errors} metiers={metiers} onChange={onChange} />
          )}
          {step === 1 && <StepLocalisation values={values} errors={errors} onChange={onChange} />}
          {step === 2 && (
            <StepDescription
              values={values}
              errors={errors}
              photos={photos}
              photoError={photoError}
              onChange={onChange}
              onAddPhotos={onAddPhotos}
              onRemovePhoto={(i) => setPhotos((p) => p.filter((_, idx) => idx !== i))}
            />
          )}
          {step === 3 && <StepContact values={values} errors={errors} onChange={onChange} />}

          {submitError && (
            <p role="alert" className="text-destructive text-sm">
              {submitError}
            </p>
          )}

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0 || isPending}
              onClick={() => setStep((s) => s - 1)}
            >
              Retour
            </Button>
            {isLast ? (
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Envoi…' : 'Envoyer ma demande'}
              </Button>
            ) : (
              <Button type="button" onClick={onNext}>
                Continuer
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
