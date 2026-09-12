import { RangeSimple } from "../vis_str";

export const flat = <T>(arr: T[][]): T[] => {
  return arr.reduce((acm, x) => acm.concat(x), [] as T[]);
};

export const substrings = (str: string): string[] => {
  const n = str.length;
  const res = new Set<string>();
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j <= n; j++) res.add(str.substring(i, j));
  }
  return [...res.keys()];
};

export const findAll = (str: string, pat: string): RangeSimple[] => {
  const m = pat.length;
  const res: RangeSimple[] = [];
  let pos = str.indexOf(pat);
  while (pos !== -1) {
    res.push([pos, pos + m]);
    pos = str.indexOf(pat, pos + 1);
  }
  return res;
};

export const lcp = (str: string, i: number, j: number): number => {
  const n = str.length;
  let matchLen = 0;
  while (i + matchLen < n && j + matchLen < n) {
    if (str[i + matchLen] == str[j + matchLen]) matchLen++;
    else break;
  }
  return matchLen;
};

export const reverse = (str: string): string => {
  return str.split("").reverse().join("");
};

export const enumIf = (
  str: string,
  check: (s: string, p: string) => boolean,
): RangeSimple[] => {
  return flat(enumIfGroup(str, check));
};

export const enumIfGroup = (
  str: string,
  check: (s: string, p: string) => boolean,
): RangeSimple[][] => {
  return substrings(str)
    .filter((p) => check(str, p))
    .map((p) => findAll(str, p));
};
