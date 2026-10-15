export type Severity = 'avoid' | 'caution' | 'low';
export type Kind = 'food' | 'drink' | 'medication' | 'supplement' | 'substance';

export interface Source {
  title: string;
  url?: string;
}

export interface Step {
  title: string;
  body: string;
}

/** One thing a person might ask about (a food, drink, medicine or supplement). */
export interface Entry {
  id: string;
  name: string;
  /** Brand names, generic names, common misspellings. Used for exact matching. */
  aliases: string[];
  kind: Kind;
  /** One-line description shown under the name. */
  blurb: string;
  severity: Severity;
  headline: string;
  summary: string;
  signsLabel: string;
  signs: string[];
  steps: Step[];
  /** Ids of groups (e.g. "serotonergic") this entry belongs to. */
  groups: string[];
  /** "draft" = written from general knowledge, not yet checked against a source. */
  status: 'draft' | 'verified';
  sources: Source[];
  /** Optional caveat, e.g. when sources disagree. */
  note?: string;
}

export interface GroupItem {
  name: string;
  examples: string;
  severity: 'avoid' | 'caution';
  /** Links to a full Entry when one exists. */
  entryId?: string;
}

/** A class of interactions (e.g. serotonin syndrome) with its own guide screen. */
export interface Group {
  id: string;
  title: string;
  whatItIs: string;
  earlySigns: string[];
  emergency: Step;
  items: GroupItem[];
}

export interface Medication {
  id: string;
  brandName: string;
  genericName: string;
  drugClass: string;
}
