import { RangeSimple } from "../vis_str";
export declare const replaceEffectiveAlphabet: (str: string) => string[];
export declare const suffixArray: (str: string) => number[];
export declare const rankArray: (str: string, sa?: number[]) => number[];
export declare const nssArray: (str: string, rank?: number[]) => number[];
export declare const prevArray: (str: string, rank?: number[]) => number[];
export declare const nextSmallerSuffixes: (str: string) => RangeSimple[][];
export declare const prevSmallerSuffixes: (str: string) => RangeSimple[][];
