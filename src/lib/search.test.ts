import { describe, expect, it } from 'vitest';
import { entries } from '../data';
import { makeSearch } from './search';

const search = makeSearch(entries);

describe('search', () => {
  it('matches names and aliases exactly', () => {
    expect(search('Advil')).toMatchObject({ type: 'match', entry: { id: 'ibuprofen' } });
    expect(search('wine')).toMatchObject({ type: 'match', entry: { id: 'alcohol' } });
  });

  it('ignores case, punctuation and apostrophes', () => {
    expect(search("St. John's Wort")).toMatchObject({ type: 'match', entry: { id: 'st-johns-wort' } });
    expect(search('st johns wort')).toMatchObject({ type: 'match', entry: { id: 'st-johns-wort' } });
  });

  it('suggests, but never auto-matches, a misspelling', () => {
    const r = search('ibuprofin');
    expect(r.type).toBe('suggest');
    if (r.type === 'suggest') expect(r.entries.map((e) => e.id)).toContain('ibuprofen');
  });

  it('returns none for things we have not reviewed', () => {
    expect(search('elderberry gummies')).toEqual({ type: 'none' });
    expect(search('')).toEqual({ type: 'none' });
  });
});
