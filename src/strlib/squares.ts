import { RangeSimple } from "../vis_str";

export const isSquare = (s: string, beg: number, p: number): boolean => {
  for (let i = 0; i < p; i++) {
    if (s[beg + i] != s[beg + p + i]) return false;
  }
  return true;
};

export const isRightmostSquare = (
  s: string,
  beg: number,
  p: number,
): boolean => {
  if (!isSquare(s, beg, p)) return false;
  return !s.includes(s.slice(beg, beg + 2 * p), beg + 1);
};

export const isLeftmostSquare = (
  s: string,
  beg: number,
  p: number,
): boolean => {
  if (!isSquare(s, beg, p)) return false;
  return !s.slice(0, beg + 2 * p - 1).includes(s.slice(beg, beg + 2 * p));
};

/** Enumerate squares (beg, period p) of `s` matching `predicate`. */
const enumSquareLike = (
  s: string,
  predicate: (s: string, beg: number, p: number) => boolean,
): RangeSimple[] => {
  const n = s.length;
  const res: RangeSimple[] = [];
  for (let p = 1; p < n; p++) {
    for (let offset = 0; offset < 2 * p; offset++) {
      for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
        if (predicate(s, beg, p)) {
          res.push([beg, beg + 2 * p - 1, p]);
        }
      }
    }
  }
  return res;
};

export const enumSquares = (s: string): RangeSimple[] =>
  enumSquareLike(s, isSquare);

export const enumRightmostSquares = (s: string): RangeSimple[] =>
  enumSquareLike(s, isRightmostSquare);

export const enumLeftmostSquares = (s: string): RangeSimple[] =>
  enumSquareLike(s, isLeftmostSquare);
