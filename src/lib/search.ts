// Removes diacritics (háčky/čárky) from Czech text
export function removeDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Search function that ignores diacritics and case
export function searchMatch(text: string, query: string): boolean {
  if (!query.trim()) return true;
  
  const normalizedText = removeDiacritics(text);
  const normalizedQuery = removeDiacritics(query);
  
  return normalizedText.includes(normalizedQuery);
}
