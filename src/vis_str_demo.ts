import { Range, RangeSimple, VisStr } from "./vis_str";
import * as strlib from "./strlib";

const substrings = (str: string): string[] => {
    const n = str.length;
    let res = new Set<string>();
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j <= n; j++) res.add(str.substring(i, j));
    }
    return [...res.keys()];
};

const findAll = (str: string, pat: string): RangeSimple[] => {
    const m = pat.length;
    let res: RangeSimple[] = [];
    let pos = str.indexOf(pat);
    while (pos !== -1) {
        res.push([pos, pos + m - 1]);
        pos = str.indexOf(pat, pos + 1);
    }
    return res;
};

// const isPalindrome = (str: string): boolean => {
//     for (let i = 0; i < str.length / 2; i++) {
//         if (str[i] != str[str.length - i - 1]) return false;
//     }
//     return true;
// };

// export const enumPalindromes = (str: string): RangeSimple[] => {
//     const n = str.length;
//     let res: RangeSimple[] = [];
//     for (let len = 1; len < n; len++) {
//         for (let beg = 0; beg + len <= n; beg++) {
//             if (isPalindrome(str.substring(beg, beg + len)))
//                 res.push([beg, beg + len - 1]);
//         }
//     }
//     return res;
// };
const isPalindrome = strlib.isPalindrome;
const enumPalindromes = strlib.enumPalindromes;

const lcp = (str: string, i: number, j: number): number => {
    let n = str.length;
    let match_len = 0;
    while (i + match_len < n && j + match_len < n) {
        if (str[i + match_len] == str[j + match_len]) match_len++;
        else break;
    }
    return match_len;
};

const prevOccLPF = (str: string): [number[], number[]] => {
    let prevOcc = [];
    let lpf = [];
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

const enumPrevOccLPF = (str: string): RangeSimple[][] => {
    const n = str.length;
    const [prevOcc, lpf] = prevOccLPF(str);
    let res: RangeSimple[][] = [
        [[-1, n - 1, ["occ"].concat(prevOcc.map((x) => x.toString()))]],
        [[-1, n - 1, ["len"].concat(lpf.map((x) => x.toString()))]],
    ];
    for (let i = 0; i < prevOcc.length; i++) {
        if (lpf[i] > 0) {
            res.push([
                [i, i + lpf[i] - 1],
                [prevOcc[i], prevOcc[i] + lpf[i] - 1],
            ]);
        }
    }
    return res;
};

const isSquare = (s: string, beg: number, p: number): boolean => {
    for (let i = 0; i < p; i++) {
        if (s[beg + i] != s[beg + p + i]) return false;
    }
    return true;
};

const enumSquares = (s: string): RangeSimple[] => {
    const n = s.length;
    let res: RangeSimple[] = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if (isSquare(s, beg, p)) {
                    res.push([beg, beg + 2 * p - 1, p]);
                }
            }
        }
    }
    return res;
};

const isRightmostSquare = (s: string, beg: number, p: number): boolean => {
    if (!isSquare(s, beg, p)) return false;
    return !s.includes(s.substr(beg, 2 * p), beg + 1);
};

const isLeftmostSquare = (s: string, beg: number, p: number): boolean => {
    if (!isSquare(s, beg, p)) return false;
    return !s.substr(0, beg + 2 * p - 1).includes(s.substr(beg, 2 * p));
};

const enumRightmostSquares = (s: string): RangeSimple[] => {
    const n = s.length;
    let res: RangeSimple[] = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if (isRightmostSquare(s, beg, p)) {
                    res.push([beg, beg + 2 * p - 1, p]);
                }
            }
        }
    }
    return res;
};

const enumLeftmostSquares = (s: string): RangeSimple[] => {
    const n = s.length;
    let res: RangeSimple[] = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if (isLeftmostSquare(s, beg, p)) {
                    res.push([beg, beg + 2 * p - 1, p]);
                }
            }
        }
    }
    return res;
};

const isRun = (s: string, beg: number, p: number): boolean => {
    if (beg > 0 && s[beg - 1] == s[beg + p - 1]) return false;
    for (let i = 0; i < p; i++) {
        if (s[beg + i] != s[beg + p + i]) return false;
    }
    return true;
};

const enumRuns = (s: string): RangeSimple[] => {
    const n = s.length;
    let res: RangeSimple[] = [];
    let rmap = new Set<string>();
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

const leftExtensions = (str: string, pat: string): string[] => {
    let res = new Set<string>();
    let fromIdx = 1;
    let pos = str.indexOf(pat, fromIdx);
    while (pos !== -1) {
        res.add(str[pos - 1]);
        pos = str.indexOf(pat, pos + 1);
    }
    return [...res.keys()];
};

const reverse = (str: string): string => {
    return str.split("").reverse().join("");
};

const rightExtensions = (str: string, pat: string): string[] => {
    const rstr = reverse(str);
    const rpat = reverse(pat);
    return leftExtensions(rstr, rpat);
};

const isLeftMaximal = (str: string, pat: string): boolean => {
    return leftExtensions(str, pat).length > 1;
};

const isRightMaximal = (str: string, pat: string): boolean => {
    return rightExtensions(str, pat).length > 1;
};

const isMaxRepeat = (str: string, pat: string): boolean => {
    return isLeftMaximal(str, pat) && isRightMaximal(str, pat);
};

const lz77 = (str: string, show_factorid: number = 1): RangeSimple[][] => {
    const n = str.length;
    const [occs, lens] = prevOccLPF(str);
    const res: RangeSimple[][] = [];

    for (let i = 0; i < n; ) {
        let ranges: RangeSimple[] = [];
        if (occs[i] === -1) {
            ranges = [[i, i, [str[i]]]];
            i += 1;
        } else {
            ranges = [
                [occs[i], occs[i] + lens[i] - 1],
                [i, i + lens[i] - 1],
            ];
            i += lens[i];
        }
        if (show_factorid >= 0) {
            const last_end = ranges[ranges.length - 1][1];
            ranges.push([last_end + 1, last_end + 1, ["f" + show_factorid]]);
            show_factorid++;
        }
        res.push(ranges);
    }
    return res;
};

const lz78 = (str: string, show_factorid = 1): RangeSimple[][] => {
    let d = new Map<string, number>();
    let res: RangeSimple[][] = [];
    for (var i = 0; i < str.length; ) {
        let j = i + 1;
        while (j <= str.length && d.has(str.substring(i, j))) {
            j++;
        }
        let row: RangeSimple[] = [];
        if (j - i > 1) {
            const prev = d.get(str.substring(i, j - 1)) as number;
            row.push([prev, prev + (j - i - 2)]);
            row.push([i, j - 2]);
        }
        if (j < str.length) {
            row.push([j - 1, j, [str[j - 1], "f" + show_factorid]]);
        } else {
            row.push([j - 1, j - 1, ["f" + show_factorid]]);
        }
        show_factorid++;
        res.push(row);
        d.set(str.substring(i, j), i);
        i = j;
    }
    return res;
};

const isLyndon = (str: string): boolean => {
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

// const enumLyndon = (str: string): RangeSimple[][] => {
//   const check = (str: string, pat: string) => isLyndon(pat)
//   return enumIfGroup(str, check)
// }
const enumLyndon = (str: string): RangeSimple[][] => {
    const res: RangeSimple[][] = [];
    for (let len = 1; len <= str.length; len++) {
        const group: RangeSimple[] = [];
        for (let i = 0; i + len <= str.length; i++) {
            const sub = str.substr(i, len);
            if (isLyndon(sub)) group.push([i, i + len - 1]);
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
const findLongestLyndonFactor = (
    str: string,
    beg: number
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

const lyndonFactorization = (str: string): RangeSimple[][] => {
    let res: RangeSimple[][] = [];
    let beg = 0;

    while (beg < str.length) {
        const factor = findLongestLyndonFactor(str, beg);
        const len_factor = factor[0] * factor[1];
        res.push([[beg, beg + len_factor - 1, factor[0]]] as RangeSimple[]);
        beg += len_factor;
    }
    return res;
};

const lyndonArray = (str: string): RangeSimple[][] => {
    const res: RangeSimple[][] = [];
    for (let i = 0; i < str.length; i++) {
        const factor = findLongestLyndonFactor(str, i);
        res.push([[i, i + factor[0] - 1]] as RangeSimple[]);
    }
    return res;
};

// replace the characters to effective alphabet [0, sigma-1]
// sigma is the number of distinct characters of given string
// sigma must be less than 10
const replaceEffectiveAlphabet = (str: string): string[] => {
    const chars = new Set<string>();
    for (let i = 0; i < str.length; i++) chars.add(str[i]);
    const arr = Array.from(chars.values());
    arr.sort();
    const rep = new Map<string, string>();
    arr.map((c, i) => rep.set(c, i.toString()));
    const reps: string[] = [];

    for (let i = 0; i < str.length; i++) reps.push(rep.get(str[i]) as string);
    return reps;
    // return reps.join('')
};

const suffixArray = (str: string): number[] => {
    const suffixes = [...Array(str.length).keys()].map((i) => str.substr(i));
    suffixes.sort();
    return suffixes.map((s) => str.length - s.length);
};

const rankArray = (str: string, sa?: number[]) => {
    if (sa === undefined) sa = suffixArray(str);
    const rank = Array(str.length);
    sa.forEach((pos, r) => (rank[pos] = r));
    return rank;
};

// next smaller suffixes
const nssArray = (str: string, rank?: number[]) => {
    if (rank === undefined) rank = rankArray(str);
    const n = rank.length;
    const nssa = new Array(n);
    for (let i = 0; i < n; i++) {
        let nss = n;
        for (let j = i + 1; j < n; j++) {
            if (rank[i] > rank[j]) {
                nss = j;
                break;
            }
        }
        nssa[i] = nss;
    }
    return nssa;
};

// next smaller suffixes
const prevArray = (str: string, rank?: number[]) => {
    if (rank === undefined) rank = rankArray(str);
    const n = rank.length;
    const pssa = new Array(n);
    for (let i = 0; i < n; i++) {
        let pss = -1;
        for (let j = i - 1; j >= 0; j--) {
            if (rank[i] > rank[j]) {
                pss = j;
                break;
            }
        }
        pssa[i] = pss;
    }
    return pssa;
};

const nextSmallerSuffixes = (str: string): RangeSimple[][] => {
    const nssa = nssArray(str);
    const res: RangeSimple[][] = [];
    for (let i = 0; i < str.length; i++) {
        const group: RangeSimple[] = [[i, nssa[i]]];
        if (group.length > 0) res.push(group);
    }
    return res;
};

const prevSmallerSuffixes = (str: string): RangeSimple[][] => {
    const pssa = prevArray(str);
    const res: RangeSimple[][] = [];
    for (let i = 0; i < str.length; i++) {
        const group: RangeSimple[] = [[pssa[i], i]];
        if (group.length > 0) res.push(group);
    }
    return res;
};

const enumIf = (
    str: string,
    check: (s: string, p: string) => boolean
): RangeSimple[] => {
    return flat(enumIfGroup(str, check));
};

const enumIfGroup = (
    str: string,
    check: (s: string, p: string) => boolean
): RangeSimple[][] => {
    return substrings(str)
        .filter((p) => check(str, p))
        .map((p) => findAll(str, p));
};

const radioValue = (selector: string): string => {
    let res = "";
    const elms = document.querySelectorAll<HTMLInputElement>(selector);
    for (let i = 0; i < elms.length; i++) {
        if (elms[i].checked) res = elms[i].value;
    }
    return res;
};

const flat = <T>(arr: T[][]): T[] => {
    return arr.reduce((acm, x) => acm.concat(x), [] as T[]);
};

const draw = (e: Event) => {
    // get font size
    let font_size = parseInt(radioValue("[name=font_size]"));
    // get line style
    let range_style = radioValue("[name=line_style]");
    const line_style_right = radioValue("[name=line_style_right]");

    range_style += line_style_right.length === 0 ? "" : "," + line_style_right;
    let visualize = radioValue("[name=visualize]");
    console.log(
        `font_size=${font_size}, line_style=${range_style}, visualize=${visualize}`
    );

    // get input string
    const elm = document.querySelector("#input_str") as HTMLInputElement;
    let input_str = elm.value;

    // get canvas
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    // canvas.width = window.innerWidth - 50
    const visStr = new VisStr(canvas, (font_size = font_size));

    // compute ranges
    let rangesp: RangeSimple[] = [];
    let ranges_group: RangeSimple[][] = [];
    let ranges: Range[][] = [];

    const show_effective_alphabet = (
        document.getElementById("effective_alphabet") as HTMLInputElement
    ).checked;
    const show_rank_array = (
        document.getElementById("rank_array") as HTMLInputElement
    ).checked;

    if (show_effective_alphabet) {
        ranges_group.push([
            [
                -1,
                input_str.length - 1,
                ["eStr", ...replaceEffectiveAlphabet(input_str)],
            ],
        ] as RangeSimple[]);
    }
    if (show_rank_array) {
        ranges_group.push([
            [-1, input_str.length - 1, ["rank", ...rankArray(input_str)]],
        ] as RangeSimple[]);
    }

    if (
        visualize === "runs" ||
        visualize === "palindromes" ||
        visualize === "squares" ||
        visualize === "rmostsquares" ||
        visualize === "lmostsquares"
    ) {
        if (visualize === "runs") {
            rangesp = enumRuns(input_str) as RangeSimple[];
        } else if (visualize === "palindromes") {
            rangesp = enumPalindromes(input_str) as RangeSimple[];
        } else if (visualize === "squares") {
            rangesp = enumSquares(input_str) as RangeSimple[];
        } else if (visualize === "rmostsquares") {
            rangesp = enumRightmostSquares(input_str) as RangeSimple[];
        } else if (visualize === "lmostsquares") {
            rangesp = enumLeftmostSquares(input_str) as RangeSimple[];
        }
        console.log("rangesp", rangesp);
        ranges_group = ranges_group.concat(
            visStr.nonOverlapRangesSimple(rangesp)
        );
        console.log("range_group", ranges_group);
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        console.log("rangesp", ranges);
    } else {
        if (visualize === "lpf")
            ranges_group = ranges_group.concat(enumPrevOccLPF(input_str));
        else if (visualize === "left_maximal")
            ranges_group = ranges_group.concat(
                enumIfGroup(input_str, isLeftMaximal)
            );
        else if (visualize === "right_maximal")
            ranges_group = ranges_group.concat(
                enumIfGroup(input_str, isRightMaximal)
            );
        else if (visualize === "max_repeat")
            ranges_group = ranges_group.concat(
                enumIfGroup(input_str, isMaxRepeat)
            );
        else if (visualize === "lz77")
            ranges_group = ranges_group.concat(lz77(input_str));
        else if (visualize === "lz78")
            ranges_group = ranges_group.concat(lz78(input_str));
        else if (visualize === "lyndon_factorization")
            ranges_group = ranges_group.concat(lyndonFactorization(input_str));
        else if (visualize === "lyndon_array")
            ranges_group = ranges_group.concat(lyndonArray(input_str));
        else if (visualize === "enum_lyndon")
            ranges_group = ranges_group.concat(enumLyndon(input_str));
        else if (visualize === "prev_smaller_suffix")
            ranges_group = ranges_group.concat(prevSmallerSuffixes(input_str));
        else if (visualize === "next_smaller_suffix")
            ranges_group = ranges_group.concat(nextSmallerSuffixes(input_str));
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        ranges = flat(ranges.map((x) => visStr.nonOverlapRanges(x)));
    }

    visStr.draw(input_str, ranges);
};

const selectorAddEvent = (selector: string, event: string, func: any) => {
    const elms = document.querySelectorAll<HTMLInputElement>(selector);
    for (let i = 0; i < elms.length; i++) {
        elms[i].addEventListener(event, func);
    }
};

const main = () => {
    const input_str = document.getElementById("input_str") as HTMLElement;
    input_str.addEventListener("input", draw);
    input_str.addEventListener("propertychange", draw);

    // add event for radio buttons
    selectorAddEvent("[name=font_size]", "click", draw);
    selectorAddEvent("[name=line_style]", "click", draw);
    selectorAddEvent("[name=line_style_right]", "click", draw);
    selectorAddEvent("[name=visualize]", "click", draw);
    // selectorAddEvent('#effective_alphabet', 'click', draw)
    selectorAddEvent("[type=checkbox]", "click", draw);

    // draw initially.
    input_str.dispatchEvent(
        new CustomEvent("propertychange", { detail: "init event" })
    );
};

main();
