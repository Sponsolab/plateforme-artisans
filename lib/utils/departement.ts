const DROM = ['971', '972', '973', '974', '976'];

// Déduit le code département d'un code postal français ; null si inconnu.
export function departementFromCodePostal(codePostal: string): string | null {
  if (!/^\d{5}$/.test(codePostal)) return null;

  if (codePostal.startsWith('97')) {
    const code = codePostal.slice(0, 3);
    return DROM.includes(code) ? code : null;
  }
  if (codePostal.startsWith('20')) {
    return Number(codePostal.slice(0, 3)) <= 201 ? '2A' : '2B';
  }

  const code = codePostal.slice(0, 2);
  const n = Number(code);
  return n >= 1 && n <= 95 ? code : null;
}
