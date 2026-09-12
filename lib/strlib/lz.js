"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lz78 = exports.lz77 = exports.enumPrevOccLPF = exports.prevOccLPF = void 0;
const util_1 = require("./util");
const prevOccLPF = (str) => {
    const prevOcc = [];
    const lpf = [];
    const n = str.length;
    for (let i = 0; i < n; i++) {
        let poccx = -1;
        let lpfx = 0;
        for (let j = 0; j < i; j++) {
            const l = (0, util_1.lcp)(str, i, j);
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
exports.prevOccLPF = prevOccLPF;
const enumPrevOccLPF = (str) => {
    const n = str.length;
    const [prevOcc, lpf] = (0, exports.prevOccLPF)(str);
    const res = [
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
exports.enumPrevOccLPF = enumPrevOccLPF;
const lz77 = (str, showFactorId = 1) => {
    const n = str.length;
    const [occs, lens] = (0, exports.prevOccLPF)(str);
    const res = [];
    for (let i = 0; i < n;) {
        let ranges = [];
        if (occs[i] === -1) {
            ranges = [[i, i, [str[i]]]];
            i += 1;
        }
        else {
            ranges = [
                [occs[i], occs[i] + lens[i] - 1],
                [i, i + lens[i] - 1],
            ];
            i += lens[i];
        }
        if (showFactorId >= 0) {
            const lastEnd = ranges[ranges.length - 1][1];
            ranges.push([lastEnd + 1, lastEnd + 1, ["f" + showFactorId]]);
            showFactorId++;
        }
        res.push(ranges);
    }
    return res;
};
exports.lz77 = lz77;
const lz78 = (str, showFactorId = 1) => {
    const d = new Map();
    const res = [];
    for (let i = 0; i < str.length;) {
        let j = i + 1;
        while (j <= str.length && d.has(str.substring(i, j))) {
            j++;
        }
        const row = [];
        if (j - i > 1) {
            const prev = d.get(str.substring(i, j - 1));
            row.push([prev, prev + (j - i - 2)]);
            row.push([i, j - 2]);
        }
        if (j < str.length) {
            row.push([j - 1, j, [str[j - 1], "f" + showFactorId]]);
        }
        else {
            row.push([j - 1, j - 1, ["f" + showFactorId]]);
        }
        showFactorId++;
        res.push(row);
        d.set(str.substring(i, j), i);
        i = j;
    }
    return res;
};
exports.lz78 = lz78;
//# sourceMappingURL=lz.js.map