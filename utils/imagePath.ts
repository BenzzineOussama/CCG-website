export function getImagePath(src: string): string {
  // En production sur GitHub Pages, ajouter le basePath
  const basePath = process.env.NODE_ENV === 'production' ? '/CCG-website' : '';
  return `${basePath}${src}`;
}