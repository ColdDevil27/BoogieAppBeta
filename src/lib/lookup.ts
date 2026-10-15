import { entries } from '../data';
import { makeSearch } from './search';

export const lookup = makeSearch(entries);
