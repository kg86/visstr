import { RangeSimple } from "../vis_str";
export declare const flat: <T>(arr: T[][]) => T[];
export declare const substrings: (str: string) => string[];
export declare const findAll: (str: string, pat: string) => RangeSimple[];
export declare const lcp: (str: string, i: number, j: number) => number;
export declare const reverse: (str: string) => string;
export declare const enumIf: (str: string, check: (s: string, p: string) => boolean) => RangeSimple[];
export declare const enumIfGroup: (str: string, check: (s: string, p: string) => boolean) => RangeSimple[][];
