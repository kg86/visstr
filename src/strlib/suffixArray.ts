import { RangeSimple } from "../vis_str";

// replace the characters to effective alphabet [0, sigma-1]
// sigma is the number of distinct characters of given string
// sigma must be less than 10
export const replaceEffectiveAlphabet = (str: string): string[] => {
  const chars = new Set<string>();
  for (let i = 0; i < str.length; i++) chars.add(str[i]);
  const arr = Array.from(chars.values());
  arr.sort();
  const rep = new Map<string, string>();
  arr.map((c, i) => rep.set(c, i.toString()));
  const reps: string[] = [];

  for (let i = 0; i < str.length; i++) reps.push(rep.get(str[i]) as string);
  return reps;
};

export const suffixArray = (str: string): number[] => {
  const suffixes = [...Array(str.length).keys()].map((i) => str.slice(i));
  suffixes.sort();
  return suffixes.map((s) => str.length - s.length);
};

export const rankArray = (str: string, sa?: number[]): number[] => {
  if (sa === undefined) sa = suffixArray(str);
  const rank = Array(str.length);
  sa.forEach((pos, r) => (rank[pos] = r));
  return rank;
};

/**
 * Scan for, at each index `i`, the nearest index in `direction` whose rank
 * is smaller than `rank[i]`. Used by both `nssArray` (direction 1, "next
 * smaller suffix") and `prevArray` (direction -1, "previous smaller
 * suffix"), which are otherwise mirror images of each other.
 */
const scanSmallerRank = (rank: number[], direction: 1 | -1): number[] => {
  const n = rank.length;
  const notFound = direction === 1 ? n : -1;
  const res = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    res[i] = notFound;
    for (let j = i + direction; j >= 0 && j < n; j += direction) {
      if (rank[i] > rank[j]) {
        res[i] = j;
        break;
      }
    }
  }
  return res;
};

// next smaller suffixes
export const nssArray = (str: string, rank?: number[]): number[] => {
  if (rank === undefined) rank = rankArray(str);
  return scanSmallerRank(rank, 1);
};

// previous smaller suffixes
export const prevArray = (str: string, rank?: number[]): number[] => {
  if (rank === undefined) rank = rankArray(str);
  return scanSmallerRank(rank, -1);
};

export const nextSmallerSuffixes = (str: string): RangeSimple[][] => {
  const nssa = nssArray(str);
  const res: RangeSimple[][] = [];
  for (let i = 0; i < str.length; i++) {
    const group: RangeSimple[] = [[i, nssa[i]]];
    if (group.length > 0) res.push(group);
  }
  return res;
};

export const prevSmallerSuffixes = (str: string): RangeSimple[][] => {
  const pssa = prevArray(str);
  const res: RangeSimple[][] = [];
  for (let i = 0; i < str.length; i++) {
    const group: RangeSimple[] = [[pssa[i], i]];
    if (group.length > 0) res.push(group);
  }
  return res;
};
