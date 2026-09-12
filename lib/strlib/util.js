"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumIfGroup = exports.enumIf = exports.reverse = exports.lcp = exports.findAll = exports.substrings = exports.flat = void 0;
const flat = (arr) => {
    return arr.reduce((acm, x) => acm.concat(x), []);
};
exports.flat = flat;
const substrings = (str) => {
    const n = str.length;
    const res = new Set();
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j <= n; j++)
            res.add(str.substring(i, j));
    }
    return [...res.keys()];
};
exports.substrings = substrings;
const findAll = (str, pat) => {
    const m = pat.length;
    const res = [];
    let pos = str.indexOf(pat);
    while (pos !== -1) {
        res.push([pos, pos + m - 1]);
        pos = str.indexOf(pat, pos + 1);
    }
    return res;
};
exports.findAll = findAll;
const lcp = (str, i, j) => {
    const n = str.length;
    let matchLen = 0;
    while (i + matchLen < n && j + matchLen < n) {
        if (str[i + matchLen] == str[j + matchLen])
            matchLen++;
        else
            break;
    }
    return matchLen;
};
exports.lcp = lcp;
const reverse = (str) => {
    return str.split("").reverse().join("");
};
exports.reverse = reverse;
const enumIf = (str, check) => {
    return (0, exports.flat)((0, exports.enumIfGroup)(str, check));
};
exports.enumIf = enumIf;
const enumIfGroup = (str, check) => {
    return (0, exports.substrings)(str)
        .filter((p) => check(str, p))
        .map((p) => (0, exports.findAll)(str, p));
};
exports.enumIfGroup = enumIfGroup;
//# sourceMappingURL=util.js.map