import type { Entry, Group, Medication } from '../types';
import medicationJson from './lexapro/medication.json';
import entriesJson from './lexapro/entries.json';
import groupsJson from './lexapro/groups.json';

// The JSON is validated by src/data/data.test.ts, so a cast is safe here.
export const medication = medicationJson as Medication;
export const entries = entriesJson as unknown as Entry[];
export const groups = groupsJson as unknown as Group[];

export const getEntry = (id: string) => entries.find((e) => e.id === id);
export const getGroup = (id: string) => groups.find((g) => g.id === id);
