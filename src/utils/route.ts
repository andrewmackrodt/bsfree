export function toSlug(name: string): string {
  return name.toLowerCase().replaceAll(/[^a-z0-9 -]/gi, '')
    .replaceAll(/ /g, '-')
    .replaceAll(/-{2,}/g, '-')
    .replace(/-$/, '')
}
