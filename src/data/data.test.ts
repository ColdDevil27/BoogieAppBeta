import { describe, expect, it } from 'vitest';
import { entries, groups } from './index';
import { normalize } from '../lib/search';

const SEVERITIES = ['avoid', 'caution', 'low'];

describe('entries', () => {
  it('have unique ids', () => {
    const ids = entries.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('have no name or alias claimed by two entries', () => {
    const seen = new Map<string, string>();
    for (const e of entries) {
      for (const term of [e.name, ...e.aliases]) {
        const key = normalize(term);
        expect(seen.has(key) && seen.get(key) !== e.id, `"${term}" is used by two entries`).toBe(false);
        seen.set(key, e.id);
      }
    }
  });

  it('are complete', () => {
    for (const e of entries) {
      expect(SEVERITIES, e.id).toContain(e.severity);
      expect(e.headline.length, e.id).toBeGreaterThan(0);
      expect(e.summary.length, e.id).toBeGreaterThan(0);
      expect(e.signs.length, e.id).toBeGreaterThan(0);
      expect(e.steps.length, e.id).toBeGreaterThan(0);
    }
  });

  it('only claim "verified" when they cite a source', () => {
    for (const e of entries) {
      if (e.status === 'verified') expect(e.sources.length, e.id).toBeGreaterThan(0);
    }
  });

  it('only reference groups that exist', () => {
    const groupIds = new Set(groups.map((g) => g.id));
    for (const e of entries) {
      for (const g of e.groups) {
        // "bleeding" is a tag used for grouping later; it need not have a guide screen yet.
        if (g !== 'bleeding') expect(groupIds.has(g), `${e.id} -> ${g}`).toBe(true);
      }
    }
  });
});

describe('groups', () => {
  it('link only to entries that exist', () => {
    const ids = new Set(entries.map((e) => e.id));
    for (const g of groups) {
      for (const item of g.items) {
        if (item.entryId) expect(ids.has(item.entryId), `${g.id} -> ${item.entryId}`).toBe(true);
      }
    }
  });
});
