import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          {SITE.name}
        </Link>
        <Button asChild size="sm">
          <Link href="/demande">Demander un devis</Link>
        </Button>
      </div>
    </header>
  );
}
