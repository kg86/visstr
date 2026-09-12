import { RangeSimple } from "../vis_str";

export const isRun = (s: string, beg: number, p: number): boolean => {
  if (beg > 0 && s[beg - 1] == s[beg + p - 1]) return false;
  for (let i = 0; i < p; i++) {
    if (s[beg + i] != s[beg + p + i]) return false;
  }
  return true;
};

export const enumRuns = (s: string): RangeSimple[] => {
  const n = s.length;
  const res: RangeSimple[] = [];
  const rmap = new Set<string>();
  for (let p = 1; p < n; p++) {
    for (let beg = 0; beg + 2 * p <= n; beg++) {
      if (isRun(s, beg, p)) {
        let match = 2 * p;
        while (match < n && s[beg + (match % p)] == s[beg + match]) {
          match++;
        }
        const key = beg + "," + (beg + match - 1);
        if (!rmap.has(key)) {
          res.push([beg, beg + match - 1, p]);
          rmap.add(key);
        }
      }
    }
  }
  return res;
};
