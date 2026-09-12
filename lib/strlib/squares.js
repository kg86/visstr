"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumLeftmostSquares = exports.enumRightmostSquares = exports.enumSquares = exports.isLeftmostSquare = exports.isRightmostSquare = exports.isSquare = void 0;
const isSquare = (s, beg, p) => {
    for (let i = 0; i < p; i++) {
        if (s[beg + i] != s[beg + p + i])
            return false;
    }
    return true;
};
exports.isSquare = isSquare;
const isRightmostSquare = (s, beg, p) => {
    if (!(0, exports.isSquare)(s, beg, p))
        return false;
    return !s.includes(s.slice(beg, beg + 2 * p), beg + 1);
};
exports.isRightmostSquare = isRightmostSquare;
const isLeftmostSquare = (s, beg, p) => {
    if (!(0, exports.isSquare)(s, beg, p))
        return false;
    return !s.slice(0, beg + 2 * p - 1).includes(s.slice(beg, beg + 2 * p));
};
exports.isLeftmostSquare = isLeftmostSquare;
/** Enumerate squares (beg, period p) of `s` matching `predicate`. */
const enumSquareLike = (s, predicate) => {
    const n = s.length;
    const res = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if (predicate(s, beg, p)) {
                    res.push([beg, beg + 2 * p, p]);
                }
            }
        }
    }
    return res;
};
const enumSquares = (s) => enumSquareLike(s, exports.isSquare);
exports.enumSquares = enumSquares;
const enumRightmostSquares = (s) => enumSquareLike(s, exports.isRightmostSquare);
exports.enumRightmostSquares = enumRightmostSquares;
const enumLeftmostSquares = (s) => enumSquareLike(s, exports.isLeftmostSquare);
exports.enumLeftmostSquares = enumLeftmostSquares;
//# sourceMappingURL=squares.js.map