import Fuse from 'fuse.js';
import type { Entry } from '../types';

export type SearchResult =
  | { type: 'match'; entry: Entry }
  | { type: 'suggest'; entries: Entry[] }
  | { type: 'none' };

/** Lowercase, drop apostrophes and punctuation, collapse spaces. */
export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’`.]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/**
 * Safety rule: only an EXACT name or alias match returns a verdict.
 * Fuzzy matches are returned as suggestions ("Did you mean...?") and never
 * shown as a result, so a typo can't silently land on the wrong entry.
 */
export function makeSearch(entries: Entry[]) {
  const exact = new Map<string, Entry>();
  for (const e of entries) {
    for (const term of [e.name, ...e.aliases]) exact.set(normalize(term), e);
  }
  const fuse = new Fuse(
    entries.map((entry) => ({ entry, terms: [entry.name, ...entry.aliases].map(normalize) })),
    { keys: ['terms'], threshold: 0.35 },
  );

  return (query: string): SearchResult => {
    const q = normalize(query);
    if (!q) return { type: 'none' };
    const hit = exact.get(q);
    if (hit) return { type: 'match', entry: hit };
    const near = fuse.search(q).slice(0, 3).map((r) => r.item.entry);
    return near.length ? { type: 'suggest', entries: near } : { type: 'none' };
  };
}
