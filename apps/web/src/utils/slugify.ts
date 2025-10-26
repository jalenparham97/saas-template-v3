import { nanoid } from '@/lib/nanoid';

/**
 * Converts a given string into a URL-friendly slug.
 *
 * This function performs several transformations on the input text:
 * - Converts the input to a string.
 * - Applies Unicode normalization (NFD) to decompose combined characters.
 * - Removes diacritical marks.
 * - Eliminates special characters (allowing only alphanumerics, whitespace, and hyphens).
 * - Trims leading and trailing whitespace.
 * - Replaces internal whitespace sequences with a single hyphen.
 * - Converts the final string to lowercase.
 *
 * @param text - The input string to be slugified. Defaults to an empty string if not provided.
 * @returns A slugified, URL-safe string.
 */
export function slugify(text: string = ''): string {
  if (!text) return '';

  return text
    .toString() // Convert to string
    .normalize('NFD') // Normalize the string
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
    .trim() // Trim whitespace from both ends
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase(); // Convert to lowercase
}

/**
 * Generates a slug from the given text and appends a random identifier.
 *
 * This function first slugifies the input string using the slugify function, and then
 * appends a random alphanumeric identifier to ensure uniqueness.
 *
 * @param text - The input string to be slugified. Defaults to an empty string.
 * @returns A string that combines the slugified text with a random identifier.
 */
export function slugifyRandom(text: string = ''): string {
  if (!text) return '';
  const slugifiedText = slugify(text);
  const randomId = nanoid(8);
  return `${slugifiedText}-${randomId}`;
}
