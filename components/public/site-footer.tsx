import Link from 'next/link';
import { SITE } from '@/lib/site';

const LINKS = [
  { href: '/legal/mentions-legales', label: 'Mentions légales' },
  { href: '/legal/confidentialite', label: 'Confidentialité' },
  { href: '/legal/cgu', label: 'CGU' },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <nav className="flex gap-4">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
