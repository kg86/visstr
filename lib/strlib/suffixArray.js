"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prevSmallerSuffixes = exports.nextSmallerSuffixes = exports.prevArray = exports.nssArray = exports.rankArray = exports.suffixArray = exports.replaceEffectiveAlphabet = void 0;
// replace the characters to effective alphabet [0, sigma-1]
// sigma is the number of distinct characters of given string
// sigma must be less than 10
const replaceEffectiveAlphabet = (str) => {
    const chars = new Set();
    for (let i = 0; i < str.length; i++)
        chars.add(str[i]);
    const arr = Array.from(chars.values());
    arr.sort();
    const rep = new Map();
    arr.map((c, i) => rep.set(c, i.toString()));
    const reps = [];
    for (let i = 0; i < str.length; i++)
        reps.push(rep.get(str[i]));
    return reps;
};
exports.replaceEffectiveAlphabet = replaceEffectiveAlphabet;
const suffixArray = (str) => {
    const suffixes = [...Array(str.length).keys()].map((i) => str.slice(i));
    suffixes.sort();
    return suffixes.map((s) => str.length - s.length);
};
exports.suffixArray = suffixArray;
const rankArray = (str, sa) => {
    if (sa === undefined)
        sa = (0, exports.suffixArray)(str);
    const rank = Array(str.length);
    sa.forEach((pos, r) => (rank[pos] = r));
    return rank;
};
exports.rankArray = rankArray;
/**
 * Scan for, at each index `i`, the nearest index in `direction` whose rank
 * is smaller than `rank[i]`. Used by both `nssArray` (direction 1, "next
 * smaller suffix") and `prevArray` (direction -1, "previous smaller
 * suffix"), which are otherwise mirror images of each other.
 */
const scanSmallerRank = (rank, direction) => {
    const n = rank.length;
    const notFound = direction === 1 ? n : -1;
    const res = new Array(n);
    for (let i = 0; i < n; i++) {
        res[i] = notFound;
        for (let j = i + direction; j >= 0 && j < n; j += direction) {
            if (rank[i] > rank[j]) {
                res[i] = j;
                break;
            }
        }
    }
    return res;
};
// next smaller suffixes
const nssArray = (str, rank) => {
    if (rank === undefined)
        rank = (0, exports.rankArray)(str);
    return scanSmallerRank(rank, 1);
};
exports.nssArray = nssArray;
// previous smaller suffixes
const prevArray = (str, rank) => {
    if (rank === undefined)
        rank = (0, exports.rankArray)(str);
    return scanSmallerRank(rank, -1);
};
exports.prevArray = prevArray;
const nextSmallerSuffixes = (str) => {
    const nssa = (0, exports.nssArray)(str);
    const res = [];
    for (let i = 0; i < str.length; i++) {
        const group = [[i, nssa[i] + 1]];
        if (group.length > 0)
            res.push(group);
    }
    return res;
};
exports.nextSmallerSuffixes = nextSmallerSuffixes;
const prevSmallerSuffixes = (str) => {
    const pssa = (0, exports.prevArray)(str);
    const res = [];
    for (let i = 0; i < str.length; i++) {
        const group = [[pssa[i], i + 1]];
        if (group.length > 0)
            res.push(group);
    }
    return res;
};
exports.prevSmallerSuffixes = prevSmallerSuffixes;
//# sourceMappingURL=suffixArray.js.map