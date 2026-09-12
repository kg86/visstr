import { RangeSimple } from "../vis_str";
import { lcp } from "./util";

export const prevOccLPF = (str: string): [number[], number[]] => {
  const prevOcc = [];
  const lpf = [];
  const n = str.length;
  for (let i = 0; i < n; i++) {
    let poccx = -1;
    let lpfx = 0;
    for (let j = 0; j < i; j++) {
      const l = lcp(str, i, j);
      if (lpfx < l) {
        lpfx = l;
        poccx = j;
      }
    }
    prevOcc.push(poccx);
    lpf.push(lpfx);
  }
  return [prevOcc, lpf];
};

export const enumPrevOccLPF = (str: string): RangeSimple[][] => {
  const n = str.length;
  const [prevOcc, lpf] = prevOccLPF(str);
  const res: RangeSimple[][] = [
    [[-1, n, ["occ"].concat(prevOcc.map((x) => x.toString()))]],
    [[-1, n, ["len"].concat(lpf.map((x) => x.toString()))]],
  ];
  for (let i = 0; i < prevOcc.length; i++) {
    if (lpf[i] > 0) {
      res.push([
        [i, i + lpf[i]],
        [prevOcc[i], prevOcc[i] + lpf[i]],
      ]);
    }
  }
  return res;
};

export const lz77 = (
  str: string,
  showFactorId: number = 1,
): RangeSimple[][] => {
  const n = str.length;
  const [occs, lens] = prevOccLPF(str);
  const res: RangeSimple[][] = [];

  for (let i = 0; i < n;) {
    let ranges: RangeSimple[] = [];
    if (occs[i] === -1) {
      ranges = [[i, i + 1, [str[i]]]];
      i += 1;
    } else {
      ranges = [
        [occs[i], occs[i] + lens[i]],
        [i, i + lens[i]],
      ];
      i += lens[i];
    }
    if (showFactorId >= 0) {
      const lastEnd = ranges[ranges.length - 1][1];
      ranges.push([lastEnd, lastEnd + 1, ["f" + showFactorId]]);
      showFactorId++;
    }
    res.push(ranges);
  }
  return res;
};

export const lz78 = (str: string, showFactorId = 1): RangeSimple[][] => {
  const d = new Map<string, number>();
  const res: RangeSimple[][] = [];
  for (let i = 0; i < str.length;) {
    let j = i + 1;
    while (j <= str.length && d.has(str.substring(i, j))) {
      j++;
    }
    const row: RangeSimple[] = [];
    if (j - i > 1) {
      const prev = d.get(str.substring(i, j - 1)) as number;
      row.push([prev, prev + (j - i - 1)]);
      row.push([i, j - 1]);
    }
    if (j < str.length) {
      row.push([j - 1, j + 1, [str[j - 1], "f" + showFactorId]]);
    } else {
      row.push([j - 1, j, ["f" + showFactorId]]);
    }
    showFactorId++;
    res.push(row);
    d.set(str.substring(i, j), i);
    i = j;
  }
  return res;
};
