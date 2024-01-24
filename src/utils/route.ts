export function toSlug(name: string): string {
  return name.normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replaceAll(/[^a-z0-9 -]/gi, '')
    .replaceAll(/ /g, '-')
    .replaceAll(/-{2,}/g, '-')
    .replace(/-$/, '')
}
