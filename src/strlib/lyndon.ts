import { RangeSimple } from "../vis_str";

export const isLyndon = (str: string): boolean => {
  for (let i = 1; i < str.length; i++) {
    let lessthan = false;
    for (let j = 0; j < str.length; j++) {
      const j2 = (i + j) % str.length;
      if (str[j] > str[j2]) return false;
      else if (str[j] < str[j2]) {
        lessthan = true;
        break;
      }
    }
    if (!lessthan) return false;
  }
  return true;
};

export const enumLyndon = (str: string): RangeSimple[][] => {
  const res: RangeSimple[][] = [];
  for (let len = 1; len <= str.length; len++) {
    const group: RangeSimple[] = [];
    for (let i = 0; i + len <= str.length; i++) {
      const sub = str.slice(i, i + len);
      if (isLyndon(sub)) group.push([i, i + len]);
    }
    if (group.length > 0) res.push(group);
  }
  return res;
};

// Duval's algorithm
// find longest lyndon factor which starts at beg in str.
// return [len, repeat], where
// len is the length of the factor,
// repeat is the maximum repeat of the factor.
export const findLongestLyndonFactor = (
  str: string,
  beg: number,
): [number, number] => {
  let i = beg;
  let end = beg + 1;
  while (end < str.length && str[i] <= str[end]) {
    if (str[i] === str[end]) {
      i++;
      end++;
    } else if (str[i] < str[end]) {
      // str[beg...end] is Lyndon string
      i = beg;
      end++;
    }
  }
  // str[beg...end-1] is the longest Lyndon prefix of str[beg...].
  const len = end - i;
  const repeat = Math.floor((end - beg) / (end - i));
  return [len, repeat];
};

export const lyndonFactorization = (str: string): RangeSimple[][] => {
  const res: RangeSimple[][] = [];
  let beg = 0;

  while (beg < str.length) {
    const factor = findLongestLyndonFactor(str, beg);
    const lenFactor = factor[0] * factor[1];
    res.push([[beg, beg + lenFactor, factor[0]]] as RangeSimple[]);
    beg += lenFactor;
  }
  return res;
};

export const lyndonArray = (str: string): RangeSimple[][] => {
  const res: RangeSimple[][] = [];
  for (let i = 0; i < str.length; i++) {
    const factor = findLongestLyndonFactor(str, i);
    res.push([[i, i + factor[0]]] as RangeSimple[]);
  }
  return res;
};
