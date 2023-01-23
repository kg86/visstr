import { Range, RangeSimple, RangeLine, VisStr } from "./vis_str";
export const isPalindrome = (str: string): boolean => {
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] != str[str.length - i - 1]) return false;
    }
    return true;
};

export const enumPalindromes = (str: string): RangeLine[] => {
    // export const enumPalindromes = (str: string): RangeSimple[] => {
    const n = str.length;
    // let res: RangeSimple[] = [];
    let res: RangeLine[] = [];
    for (let len = 1; len <= n; len++) {
        for (let beg = 0; beg + len <= n; beg++) {
            if (isPalindrome(str.substring(beg, beg + len)))
                res.push([beg, beg + len - 1]);
        }
    }
    return res;
};
