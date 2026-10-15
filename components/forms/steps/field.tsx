import { Label } from '@/components/ui/label';

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
