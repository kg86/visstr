"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lyndonArray = exports.lyndonFactorization = exports.findLongestLyndonFactor = exports.enumLyndon = exports.isLyndon = void 0;
const isLyndon = (str) => {
    for (let i = 1; i < str.length; i++) {
        let lessthan = false;
        for (let j = 0; j < str.length; j++) {
            const j2 = (i + j) % str.length;
            if (str[j] > str[j2])
                return false;
            else if (str[j] < str[j2]) {
                lessthan = true;
                break;
            }
        }
        if (!lessthan)
            return false;
    }
    return true;
};
exports.isLyndon = isLyndon;
const enumLyndon = (str) => {
    const res = [];
    for (let len = 1; len <= str.length; len++) {
        const group = [];
        for (let i = 0; i + len <= str.length; i++) {
            const sub = str.slice(i, i + len);
            if ((0, exports.isLyndon)(sub))
                group.push([i, i + len]);
        }
        if (group.length > 0)
            res.push(group);
    }
    return res;
};
exports.enumLyndon = enumLyndon;
// Duval's algorithm
// find longest lyndon factor which starts at beg in str.
// return [len, repeat], where
// len is the length of the factor,
// repeat is the maximum repeat of the factor.
const findLongestLyndonFactor = (str, beg) => {
    let i = beg;
    let end = beg + 1;
    while (end < str.length && str[i] <= str[end]) {
        if (str[i] === str[end]) {
            i++;
            end++;
        }
        else if (str[i] < str[end]) {
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
exports.findLongestLyndonFactor = findLongestLyndonFactor;
const lyndonFactorization = (str) => {
    const res = [];
    let beg = 0;
    while (beg < str.length) {
        const factor = (0, exports.findLongestLyndonFactor)(str, beg);
        const lenFactor = factor[0] * factor[1];
        res.push([[beg, beg + lenFactor, factor[0]]]);
        beg += lenFactor;
    }
    return res;
};
exports.lyndonFactorization = lyndonFactorization;
const lyndonArray = (str) => {
    const res = [];
    for (let i = 0; i < str.length; i++) {
        const factor = (0, exports.findLongestLyndonFactor)(str, i);
        res.push([[i, i + factor[0]]]);
    }
    return res;
};
exports.lyndonArray = lyndonArray;
//# sourceMappingURL=lyndon.js.map