import { reverse } from "./util";

export const leftExtensions = (str: string, pat: string): string[] => {
  const res = new Set<string>();
  const fromIdx = 1;
  let pos = str.indexOf(pat, fromIdx);
  while (pos !== -1) {
    res.add(str[pos - 1]);
    pos = str.indexOf(pat, pos + 1);
  }
  return [...res.keys()];
};

export const rightExtensions = (str: string, pat: string): string[] => {
  const rstr = reverse(str);
  const rpat = reverse(pat);
  return leftExtensions(rstr, rpat);
};

export const isLeftMaximal = (str: string, pat: string): boolean => {
  return leftExtensions(str, pat).length > 1;
};

export const isRightMaximal = (str: string, pat: string): boolean => {
  return rightExtensions(str, pat).length > 1;
};

export const isMaxRepeat = (str: string, pat: string): boolean => {
  return isLeftMaximal(str, pat) && isRightMaximal(str, pat);
};
