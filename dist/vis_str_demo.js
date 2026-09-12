/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/strlib/index.ts"
/*!*****************************!*\
  !*** ./src/strlib/index.ts ***!
  \*****************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./util */ "./src/strlib/util.ts"), exports);
__exportStar(__webpack_require__(/*! ./palindromes */ "./src/strlib/palindromes.ts"), exports);
__exportStar(__webpack_require__(/*! ./squares */ "./src/strlib/squares.ts"), exports);
__exportStar(__webpack_require__(/*! ./runs */ "./src/strlib/runs.ts"), exports);
__exportStar(__webpack_require__(/*! ./repeats */ "./src/strlib/repeats.ts"), exports);
__exportStar(__webpack_require__(/*! ./lz */ "./src/strlib/lz.ts"), exports);
__exportStar(__webpack_require__(/*! ./lyndon */ "./src/strlib/lyndon.ts"), exports);
__exportStar(__webpack_require__(/*! ./suffixArray */ "./src/strlib/suffixArray.ts"), exports);


/***/ },

/***/ "./src/strlib/lyndon.ts"
/*!******************************!*\
  !*** ./src/strlib/lyndon.ts ***!
  \******************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
                group.push([i, i + len - 1]);
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
        res.push([[beg, beg + lenFactor - 1, factor[0]]]);
        beg += lenFactor;
    }
    return res;
};
exports.lyndonFactorization = lyndonFactorization;
const lyndonArray = (str) => {
    const res = [];
    for (let i = 0; i < str.length; i++) {
        const factor = (0, exports.findLongestLyndonFactor)(str, i);
        res.push([[i, i + factor[0] - 1]]);
    }
    return res;
};
exports.lyndonArray = lyndonArray;


/***/ },

/***/ "./src/strlib/lz.ts"
/*!**************************!*\
  !*** ./src/strlib/lz.ts ***!
  \**************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lz78 = exports.lz77 = exports.enumPrevOccLPF = exports.prevOccLPF = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./src/strlib/util.ts");
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


/***/ },

/***/ "./src/strlib/palindromes.ts"
/*!***********************************!*\
  !*** ./src/strlib/palindromes.ts ***!
  \***********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enumPalindromes = exports.isPalindrome = void 0;
const isPalindrome = (str) => {
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] != str[str.length - i - 1])
            return false;
    }
    return true;
};
exports.isPalindrome = isPalindrome;
const enumPalindromes = (str) => {
    const n = str.length;
    const res = [];
    for (let len = 1; len <= n; len++) {
        for (let beg = 0; beg + len <= n; beg++) {
            if ((0, exports.isPalindrome)(str.substring(beg, beg + len)))
                res.push([beg, beg + len - 1]);
        }
    }
    return res;
};
exports.enumPalindromes = enumPalindromes;


/***/ },

/***/ "./src/strlib/repeats.ts"
/*!*******************************!*\
  !*** ./src/strlib/repeats.ts ***!
  \*******************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMaxRepeat = exports.isRightMaximal = exports.isLeftMaximal = exports.rightExtensions = exports.leftExtensions = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./src/strlib/util.ts");
const leftExtensions = (str, pat) => {
    const res = new Set();
    const fromIdx = 1;
    let pos = str.indexOf(pat, fromIdx);
    while (pos !== -1) {
        res.add(str[pos - 1]);
        pos = str.indexOf(pat, pos + 1);
    }
    return [...res.keys()];
};
exports.leftExtensions = leftExtensions;
const rightExtensions = (str, pat) => {
    const rstr = (0, util_1.reverse)(str);
    const rpat = (0, util_1.reverse)(pat);
    return (0, exports.leftExtensions)(rstr, rpat);
};
exports.rightExtensions = rightExtensions;
const isLeftMaximal = (str, pat) => {
    return (0, exports.leftExtensions)(str, pat).length > 1;
};
exports.isLeftMaximal = isLeftMaximal;
const isRightMaximal = (str, pat) => {
    return (0, exports.rightExtensions)(str, pat).length > 1;
};
exports.isRightMaximal = isRightMaximal;
const isMaxRepeat = (str, pat) => {
    return (0, exports.isLeftMaximal)(str, pat) && (0, exports.isRightMaximal)(str, pat);
};
exports.isMaxRepeat = isMaxRepeat;


/***/ },

/***/ "./src/strlib/runs.ts"
/*!****************************!*\
  !*** ./src/strlib/runs.ts ***!
  \****************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enumRuns = exports.isRun = void 0;
const isRun = (s, beg, p) => {
    if (beg > 0 && s[beg - 1] == s[beg + p - 1])
        return false;
    for (let i = 0; i < p; i++) {
        if (s[beg + i] != s[beg + p + i])
            return false;
    }
    return true;
};
exports.isRun = isRun;
const enumRuns = (s) => {
    const n = s.length;
    const res = [];
    const rmap = new Set();
    for (let p = 1; p < n; p++) {
        for (let beg = 0; beg + 2 * p <= n; beg++) {
            if ((0, exports.isRun)(s, beg, p)) {
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
exports.enumRuns = enumRuns;


/***/ },

/***/ "./src/strlib/squares.ts"
/*!*******************************!*\
  !*** ./src/strlib/squares.ts ***!
  \*******************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
                    res.push([beg, beg + 2 * p - 1, p]);
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


/***/ },

/***/ "./src/strlib/suffixArray.ts"
/*!***********************************!*\
  !*** ./src/strlib/suffixArray.ts ***!
  \***********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
        const group = [[i, nssa[i]]];
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
        const group = [[pssa[i], i]];
        if (group.length > 0)
            res.push(group);
    }
    return res;
};
exports.prevSmallerSuffixes = prevSmallerSuffixes;


/***/ },

/***/ "./src/strlib/util.ts"
/*!****************************!*\
  !*** ./src/strlib/util.ts ***!
  \****************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ },

/***/ "./src/vis_str.ts"
/*!************************!*\
  !*** ./src/vis_str.ts ***!
  \************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VisStr = void 0;
const color_convert_1 = __importDefault(__webpack_require__(/*! color-convert */ "./node_modules/color-convert/index.js"));
class VisStr {
    /**
     *
     * @param canvas HTMLCanvasElement
     * @param fontSize font size
     * @param fontType font name
     */
    constructor(canvas, fontSize = 32, fontType = "Courier") {
        this.canvas = canvas;
        this.fontSize = fontSize;
        this.fontSizeHalf = this.fontSize / 2;
        this.fontType = fontType;
        this.ctx = canvas.getContext("2d");
        this.strX = this.fontSize;
        this.strY = this.fontSize * 2 + this.fontSizeHalf;
        this.rangeBegOffset = -this.fontSize / 4;
        this.rangeEndOffset = this.fontSize / 4;
    }
    /** Clear the canvas. */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Returns the x-coordinate which is a beginning of a range.
     *
     * @param idx index of a range
     * @return The x-coordinate of a range beginning at `idx`
     */
    rangeBeg(idx) {
        return this.strX + this.fontSize * idx + this.rangeBegOffset;
    }
    /**
     * Returns the x-coordinate which is a ending of a range.
     *
     * @param idx index of a range
     * @return The x-coordinate of a range ending at `idx`
     */
    rangeEnd(idx) {
        return this.strX + this.fontSize * idx + this.rangeEndOffset;
    }
    /**
     * Return the height of a given range.
     * @param r A range.
     */
    rangeHeight(r) {
        return r.style === "str" ? this.fontSize : Math.round(this.fontSize * 0.5);
    }
    /**
     * For a range not to draw strings, split it to three parts left, center, and right.
     * @param rpx Given range to split.
     */
    splitRangePx(rpx) {
        const styles = rpx.style.split(",");
        const rl = Object.assign({}, rpx);
        const rc = Object.assign({}, rpx);
        const rr = Object.assign({}, rpx);
        rl.x_end = rpx.x_beg + this.curve_d();
        rl.style = styles[0];
        rr.x_beg = rpx.x_end;
        rr.x_end = rpx.x_end - this.curve_d();
        rr.style = styles.length > 1 ? styles[1] : styles[0];
        rc.x_beg = rl.x_end;
        rc.x_end = rr.x_end;
        rc.style = "line";
        return [rl, rc, rr];
    }
    /**
     * Draw curve as a part of a range.
     * @param rpx A part of a range.
     */
    drawCurvePart(rpx) {
        this.ctx.beginPath();
        this.ctx.moveTo(rpx.x_beg, rpx.y - this.curve_d());
        this.ctx.quadraticCurveTo(rpx.x_beg, rpx.y, rpx.x_end, rpx.y);
        this.ctx.stroke();
    }
    /**
     * Return the length of a beginning (or ending) part of a range.
     */
    curve_d() {
        return this.fontSizeHalf / 2;
    }
    /**
     * Draw line as a part of a range.
     * @param rpx A part of a range.
     */
    drawLinePxPart(rpx) {
        this.ctx.beginPath();
        this.ctx.moveTo(rpx.x_beg, rpx.y);
        this.ctx.lineTo(rpx.x_end, rpx.y);
        this.ctx.stroke();
    }
    /**
     * Draw arrow as a part of a range.
     * @param rpx A part of a range.
     */
    drawArrowPxPart(rpx) {
        const dx = this.curve_d() * (rpx.x_beg < rpx.x_end ? -1 : +1);
        this.drawLinePxPart(rpx);
        this.ctx.beginPath();
        this.ctx.moveTo(rpx.x_end + dx / 2, rpx.y + dx / 2);
        this.ctx.lineTo(rpx.x_end + dx, rpx.y);
        this.ctx.lineTo(rpx.x_end + dx / 2, rpx.y - dx / 2);
        this.ctx.stroke();
    }
    /**
     * Draw range as a part of a range.
     * @param rpx A part of a range.
     */
    drawRangePxPart(rpx) {
        if (rpx.style == "line") {
            this.drawLinePxPart(rpx);
        }
        else if (rpx.style == "curve") {
            this.drawCurvePart(rpx);
        }
        else if (rpx.style == "arrow") {
            this.drawArrowPxPart(rpx);
        }
    }
    /**
     * Draw range.
     * @param rpx A range to draw.
     */
    drawRangePx(rpx) {
        if (rpx.style == "line") {
            this.drawLinePxPart(rpx);
        }
        else {
            const [rl, rc, rr] = this.splitRangePx(rpx);
            this.drawRangePxPart(rl);
            this.drawRangePxPart(rc);
            this.drawRangePxPart(rr);
        }
    }
    /**
     * Draw strings.
     * @param r A range to draw strings.
     * @param y The y-coorinate to draw range `r`.
     */
    drawStr(r, y) {
        const rstr = r.str;
        for (let i = 0; i < rstr.length; i++) {
            const c = rstr[i];
            const cx = this.strX + (r.beg + i) * this.fontSize;
            this.ctx.fillText(c, cx, y + this.fontSize * 0.3, this.fontSize);
            this.ctx.beginPath();
            this.ctx.rect(cx - this.fontSizeHalf, y - this.fontSizeHalf, this.fontSize, this.fontSize);
            this.ctx.stroke();
        }
    }
    /**
     * Draw range.
     * @param r A range to draw.
     * @param y A y-coordinate to draw `r`.
     */
    drawRange(r, y) {
        this.ctx.strokeStyle = r.color;
        const rpx = {
            x_beg: this.rangeBeg(r.beg),
            x_end: this.rangeEnd(r.end),
            y: y,
            style: r.style,
            color: r.color,
            str: r.str,
        };
        if (r.style == "str") {
            this.drawStr(r, y);
        }
        else if (r.step === undefined) {
            this.drawRangePx(rpx);
        }
        else {
            for (let cur = r.beg + r.step - 1; cur < r.end; cur += r.step) {
                rpx.x_end = this.strX + this.fontSize * cur + this.fontSizeHalf;
                this.drawRangePx(rpx);
                rpx.x_beg = rpx.x_end;
            }
            if ((r.end - r.beg + 1) % r.step === 0) {
                rpx.x_end = this.rangeEnd(r.end);
                this.drawRangePx(rpx);
            }
            else {
                // There is an uncomplete range.
                rpx.x_end = this.strX + this.fontSize * r.end + this.fontSizeHalf;
                rpx.style = r.style.split(",")[0] + ",line";
                this.drawRangePx(rpx);
            }
        }
    }
    /**
     * Draw ranges.
     * @param rangeRows Ranges to draw.
     */
    drawRanges(rangeRows) {
        let ypx = this.strY;
        for (const ranges of rangeRows) {
            const height = Math.max(...ranges.map((r) => this.rangeHeight(r)));
            for (const range of ranges) {
                this.drawRange(range, ypx + height / 2);
            }
            ypx += height;
        }
    }
    /**
     * Draw an input string.
     */
    drawInputStr(inputStr) {
        const index = ["i"];
        for (let i = 0; i < inputStr.length; i++)
            index.push("" + i);
        const r = {
            style: "str",
            color: "#000000",
            beg: -1,
            end: inputStr.length - 1,
            str: index,
        };
        this.drawRange(r, this.strY - this.fontSize - this.fontSizeHalf);
        const chars = ["Str"];
        for (let i = 0; i < inputStr.length; i++)
            chars.push(inputStr.substring(i, i + 1));
        r.str = chars;
        this.drawRange(r, this.strY - this.fontSizeHalf);
    }
    /**
     * Draw a given string and ranges.
     * @param inputStr Input string to draw.
     * @param rss The ranges to draw which are related to a given string `inputStr`
     */
    draw(inputStr, rss) {
        let rangeBound = [-1, inputStr.length - 1];
        rss.forEach((rs) => rs.forEach((r) => (rangeBound = [
            Math.min(rangeBound[0], r.beg),
            Math.max(rangeBound[1], r.end),
        ])));
        this.strX = this.fontSize + Math.abs(rangeBound[0]) * this.fontSize;
        this.canvas.width = (rangeBound[1] - rangeBound[0] + 2) * this.fontSize;
        this.canvas.height =
            this.strY +
                this.fontSizeHalf +
                rss.reduce((acm, rs) => acm + Math.max(...rs.map((r) => this.rangeHeight(r))), 0);
        // DPI settings
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width *= dpr;
        this.canvas.height *= dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = this.canvas.width / dpr + "px";
        this.canvas.style.height = this.canvas.height / dpr + "px";
        this.ctx.textAlign = "center";
        this.ctx.lineWidth = 3;
        this.ctx.font = this.fontSize + "px " + this.fontType;
        this.drawInputStr(inputStr);
        this.drawRanges(rss);
    }
    /**
     * Make group that each contains a single range.
     * @param ranges The range list.
     */
    makeSingleGroups(ranges) {
        return ranges.map((range) => [range]);
    }
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param Ts The range list.
     * @param rangef The function to return the tuple beginning index and ending index of a given range `Ts[i]`.
     */
    nonOverlapObjs(Ts, rangef) {
        if (Ts.length <= 0)
            return [];
        const ends = Ts.map((t) => rangef(t)[1]);
        const n = Math.max(...ends) + 1;
        const used = new Array(n);
        used.fill(false);
        const res = [];
        let rows = [];
        for (const t of Ts) {
            // check whether or not a range can be inserted to the current row.
            let usedAny = false;
            for (let i = rangef(t)[0]; i <= rangef(t)[1]; i++) {
                usedAny = usedAny || used[i];
            }
            if (usedAny) {
                res.push(rows);
                rows = [t];
                used.fill(false);
            }
            else {
                rows.push(t);
            }
            for (let i = rangef(t)[0]; i <= rangef(t)[1]; i++) {
                used[i] = true;
            }
        }
        if (rows.length > 0)
            res.push(rows);
        return res;
    }
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param rs The range list.
     */
    nonOverlapRanges(rs) {
        return this.nonOverlapObjs(rs, (r) => [r.beg, r.end]);
    }
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param rs The range list.
     */
    nonOverlapRangesSimple(rs) {
        return this.nonOverlapObjs(rs, (x) => [x[0], x[1]]);
    }
    /**
     * Return the range list `rs` specified with the style `style`.
     * @param rs The range list.
     * @param style The style of the ranges `rs` to draw.
     */
    makeGroupRangesAutoColor(rs, style) {
        const res = [];
        for (let i = 0; i < rs.length; i++) {
            const color = "#" + color_convert_1.default.hsv.hex([(i * 360) / rs.length, 80, 80]);
            res.push(this.makeRanges(rs[i], style, color));
        }
        return res;
    }
    /**
     * Return the range list `rs` specified with style `style` and `color`.
     * @param ranges The range list.
     * @param style The style of the ranges `rs` to draw.
     * @param color The color of the ranges `rs` to draw.
     */
    makeRanges(ranges, style, color) {
        return ranges.map((range) => {
            const isStr = typeof range[2] !== "undefined" && typeof range[2] !== "number";
            const step = typeof range[2] === "number" ? range[2] : undefined;
            const str = typeof range[2] !== "number" ? range[2] : undefined;
            return {
                style: isStr ? "str" : style,
                color,
                beg: range[0],
                end: range[1],
                step,
                str,
            };
        });
    }
    /**
     * Return the range list `rs` specified with the style `style`.
     * @param rs The range list.
     * @param style The style of the ranges `rs` to draw.
     */
    makeRangesAutoColor(rs, style) {
        return rs.map((range, i) => ({
            style,
            color: "#" + color_convert_1.default.hsv.hex([(i * 360) / rs.length, 80, 80]),
            beg: range[0],
            end: range[1],
        }));
    }
}
exports.VisStr = VisStr;


/***/ },

/***/ "./src/vis_str_demo.ts"
/*!*****************************!*\
  !*** ./src/vis_str_demo.ts ***!
  \*****************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vis_str_1 = __webpack_require__(/*! ./vis_str */ "./src/vis_str.ts");
const strlib = __importStar(__webpack_require__(/*! ./strlib */ "./src/strlib/index.ts"));
/** Visualizations producing a flat, non-overlapping list of ranges. */
const SIMPLE_VISUALIZERS = {
    runs: strlib.enumRuns,
    palindromes: strlib.enumPalindromes,
    squares: strlib.enumSquares,
    rmostsquares: strlib.enumRightmostSquares,
    lmostsquares: strlib.enumLeftmostSquares,
};
/** Visualizations already producing pre-grouped ranges. */
const GROUP_VISUALIZERS = {
    lpf: strlib.enumPrevOccLPF,
    left_maximal: (str) => strlib.enumIfGroup(str, strlib.isLeftMaximal),
    right_maximal: (str) => strlib.enumIfGroup(str, strlib.isRightMaximal),
    max_repeat: (str) => strlib.enumIfGroup(str, strlib.isMaxRepeat),
    lz77: strlib.lz77,
    lz78: strlib.lz78,
    lyndon_factorization: strlib.lyndonFactorization,
    lyndon_array: strlib.lyndonArray,
    enum_lyndon: strlib.enumLyndon,
    prev_smaller_suffix: strlib.prevSmallerSuffixes,
    next_smaller_suffix: strlib.nextSmallerSuffixes,
};
const radioValue = (selector) => {
    let res = "";
    const elms = document.querySelectorAll(selector);
    for (let i = 0; i < elms.length; i++) {
        if (elms[i].checked)
            res = elms[i].value;
    }
    return res;
};
const draw = (_e) => {
    // get font size
    const fontSize = parseInt(radioValue("[name=font_size]"));
    // get line style
    let rangeStyle = radioValue("[name=line_style]");
    const lineStyleRight = radioValue("[name=line_style_right]");
    rangeStyle += lineStyleRight.length === 0 ? "" : "," + lineStyleRight;
    const visualize = radioValue("[name=visualize]");
    // get input string
    const elm = document.querySelector("#input_str");
    const inputStr = elm.value;
    // get canvas
    const canvas = document.querySelector("#canvas");
    // canvas.width = window.innerWidth - 50
    const visStr = new vis_str_1.VisStr(canvas, fontSize);
    // compute ranges
    let rangesGroup = [];
    let ranges = [];
    const showEffectiveAlphabet = document.getElementById("effective_alphabet").checked;
    const showRankArray = document.getElementById("rank_array").checked;
    if (showEffectiveAlphabet) {
        rangesGroup.push([
            [
                -1,
                inputStr.length - 1,
                ["eStr", ...strlib.replaceEffectiveAlphabet(inputStr)],
            ],
        ]);
    }
    if (showRankArray) {
        rangesGroup.push([
            [-1, inputStr.length - 1, ["rank", ...strlib.rankArray(inputStr)]],
        ]);
    }
    if (visualize in SIMPLE_VISUALIZERS) {
        const rangesp = SIMPLE_VISUALIZERS[visualize](inputStr);
        rangesGroup = rangesGroup.concat(visStr.nonOverlapRangesSimple(rangesp));
        ranges = visStr.makeGroupRangesAutoColor(rangesGroup, rangeStyle);
    }
    else if (visualize in GROUP_VISUALIZERS) {
        rangesGroup = rangesGroup.concat(GROUP_VISUALIZERS[visualize](inputStr));
        ranges = visStr.makeGroupRangesAutoColor(rangesGroup, rangeStyle);
        ranges = strlib.flat(ranges.map((x) => visStr.nonOverlapRanges(x)));
    }
    visStr.draw(inputStr, ranges);
};
const selectorAddEvent = (selector, event, func) => {
    const elms = document.querySelectorAll(selector);
    for (let i = 0; i < elms.length; i++) {
        elms[i].addEventListener(event, func);
    }
};
const main = () => {
    const inputStr = document.getElementById("input_str");
    inputStr.addEventListener("input", draw);
    inputStr.addEventListener("propertychange", draw);
    // add event for radio buttons
    selectorAddEvent("[name=font_size]", "click", draw);
    selectorAddEvent("[name=line_style]", "click", draw);
    selectorAddEvent("[name=line_style_right]", "click", draw);
    selectorAddEvent("[name=visualize]", "click", draw);
    selectorAddEvent("[type=checkbox]", "click", draw);
    // draw initially.
    inputStr.dispatchEvent(new CustomEvent("propertychange", { detail: "init event" }));
};
main();


/***/ },

/***/ "./node_modules/color-convert/conversions.js"
/*!***************************************************!*\
  !*** ./node_modules/color-convert/conversions.js ***!
  \***************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var color_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! color-name */ "./node_modules/color-name/index.js");
/* MIT license */
/* eslint-disable no-mixed-operators */


// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(color_name__WEBPACK_IMPORTED_MODULE_0__["default"])) {
	reverseKeywords[color_name__WEBPACK_IMPORTED_MODULE_0__["default"][key]] = key;
}

const convert = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	oklab: {channels: 3, labels: ['okl', 'oka', 'okb']},
	lch: {channels: 3, labels: 'lch'},
	oklch: {channels: 3, labels: ['okl', 'okc', 'okh']},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']},
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (convert);

// LAB f(t) constant
const LAB_FT = (6 / 29) ** 3;

// SRGB non-linear transform functions
function srgbNonlinearTransform(c) {
	const cc = c > 0.003_130_8
		? ((1.055 * (c ** (1 / 2.4))) - 0.055)
		: c * 12.92;
	return Math.min(Math.max(0, cc), 1);
}

function srgbNonlinearTransformInv(c) {
	return c > 0.040_45 ? (((c + 0.055) / 1.055) ** 2.4) : (c / 12.92);
}

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	switch (max) {
		case min: {
			h = 0;

			break;
		}

		case r: {
			h = (g - b) / delta;

			break;
		}

		case g: {
			h = 2 + (b - r) / delta;

			break;
		}

		case b: {
			h = 4 + (r - g) / delta;

			break;
		}
	// No default
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		switch (v) {
			case r: {
				h = bdif - gdif;

				break;
			}

			case g: {
				h = (1 / 3) + rdif - bdif;

				break;
			}

			case b: {
				h = (2 / 3) + gdif - rdif;

				break;
			}
		// No default
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100,
	];
};

convert.rgb.hwb = function (rgb) {
	const r = rgb[0];
	const g = rgb[1];
	let b = rgb[2];
	const h = convert.rgb.hsl(rgb)[0];
	const w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.oklab = function (rgb) {
	// Assume sRGB
	const r = srgbNonlinearTransformInv(rgb[0] / 255);
	const g = srgbNonlinearTransformInv(rgb[1] / 255);
	const b = srgbNonlinearTransformInv(rgb[2] / 255);

	const lp = Math.cbrt(0.412_221_470_8 * r + 0.536_332_536_3 * g + 0.051_445_992_9 * b);
	const mp = Math.cbrt(0.211_903_498_2 * r + 0.680_699_545_1 * g + 0.107_396_956_6 * b);
	const sp = Math.cbrt(0.088_302_461_9 * r + 0.281_718_837_6 * g + 0.629_978_700_5 * b);

	const l = 0.210_454_255_3 * lp + 0.793_617_785 * mp - 0.004_072_046_8 * sp;
	const aa = 1.977_998_495_1 * lp - 2.428_592_205 * mp + 0.450_593_709_9 * sp;
	const bb = 0.025_904_037_1 * lp + 0.782_771_766_2 * mp - 0.808_675_766 * sp;

	return [l * 100, aa * 100, bb * 100];
};

convert.rgb.cmyk = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const k = Math.min(1 - r, 1 - g, 1 - b);
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Number.POSITIVE_INFINITY;
	let currentClosestKeyword;

	for (const keyword of Object.keys(color_name__WEBPACK_IMPORTED_MODULE_0__["default"])) {
		const value = color_name__WEBPACK_IMPORTED_MODULE_0__["default"][keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return [...color_name__WEBPACK_IMPORTED_MODULE_0__["default"][keyword]];
};

convert.rgb.xyz = function (rgb) {
	// Assume sRGB
	const r = srgbNonlinearTransformInv(rgb[0] / 255);
	const g = srgbNonlinearTransformInv(rgb[1] / 255);
	const b = srgbNonlinearTransformInv(rgb[2] / 255);

	const x = (r * 0.412_456_4) + (g * 0.357_576_1) + (b * 0.180_437_5);
	const y = (r * 0.212_672_9) + (g * 0.715_152_2) + (b * 0.072_175);
	const z = (r * 0.019_333_9) + (g * 0.119_192) + (b * 0.950_304_1);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	const xyz = convert.rgb.xyz(rgb);
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > LAB_FT ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > LAB_FT ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > LAB_FT ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t3;
	let value;

	if (s === 0) {
		value = l * 255;
		return [value, value, value];
	}

	const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			value = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			value = t2;
		} else if (3 * t3 < 2) {
			value = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			value = t1;
		}

		rgb[i] = value * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	const h = hsl[0];
	let s = hsl[1] / 100;
	let l = hsl[2] / 100;
	let smin = s;
	const lmin = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0: {
			return [v, t, p];
		}

		case 1: {
			return [q, v, p];
		}

		case 2: {
			return [p, v, t];
		}

		case 3: {
			return [p, q, v];
		}

		case 4: {
			return [t, p, v];
		}

		case 5: {
			return [v, p, q];
		}
	}
};

convert.hsv.hsl = function (hsv) {
	const h = hsv[0];
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;
	const vmin = Math.max(v, 0.01);
	let sl;
	let l;

	l = (2 - s) * v;
	const lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	// eslint-disable-next-line no-bitwise
	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh); // Linear interpolation

	let r;
	let g;
	let b;
	/* eslint-disable max-statements-per-line,no-multi-spaces, default-case-last */
	switch (i) {
		default:
		case 6:
		case 0: { r = v;  g = n;  b = wh; break;
		}

		case 1: { r = n;  g = v;  b = wh; break;
		}

		case 2: { r = wh; g = v;  b = n; break;
		}

		case 3: { r = wh; g = n;  b = v; break;
		}

		case 4: { r = n;  g = wh; b = v; break;
		}

		case 5: { r = v;  g = wh; b = n; break;
		}
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces, default-case-last */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	const c = cmyk[0] / 100;
	const m = cmyk[1] / 100;
	const y = cmyk[2] / 100;
	const k = cmyk[3] / 100;

	const r = 1 - Math.min(1, c * (1 - k) + k);
	const g = 1 - Math.min(1, m * (1 - k) + k);
	const b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;
	let r;
	let g;
	let b;

	r = (x * 3.240_454_2) + (y * -1.537_138_5) + (z * -0.498_531_4);
	g = (x * -0.969_266) + (y * 1.876_010_8) + (z * 0.041_556);
	b = (x * 0.055_643_4) + (y * -0.204_025_9) + (z * 1.057_225_2);

	// Assume sRGB
	r = srgbNonlinearTransform(r);
	g = srgbNonlinearTransform(g);
	b = srgbNonlinearTransform(b);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > LAB_FT ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > LAB_FT ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > LAB_FT ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.xyz.oklab = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;

	const lp = Math.cbrt(0.818_933_010_1 * x + 0.361_866_742_4 * y - 0.128_859_713_7 * z);
	const mp = Math.cbrt(0.032_984_543_6 * x + 0.929_311_871_5 * y + 0.036_145_638_7 * z);
	const sp = Math.cbrt(0.048_200_301_8 * x + 0.264_366_269_1 * y + 0.633_851_707 * z);

	const l = 0.210_454_255_3 * lp + 0.793_617_785 * mp - 0.004_072_046_8 * sp;
	const a = 1.977_998_495_1 * lp - 2.428_592_205 * mp + 0.450_593_709_9 * sp;
	const b = 0.025_904_037_1 * lp + 0.782_771_766_2 * mp - 0.808_675_766 * sp;

	return [l * 100, a * 100, b * 100];
};

convert.oklab.oklch = function (oklab) {
	return convert.lab.lch(oklab);
};

convert.oklab.xyz = function (oklab) {
	const ll = oklab[0] / 100;
	const a = oklab[1] / 100;
	const b = oklab[2] / 100;

	const l = (0.999_999_998 * ll + 0.396_337_792 * a + 0.215_803_758 * b) ** 3;
	const m = (1.000_000_008 * ll - 0.105_561_342 * a - 0.063_854_175 * b) ** 3;
	const s = (1.000_000_055 * ll - 0.089_484_182 * a - 1.291_485_538 * b) ** 3;

	const x = 1.227_013_851 * l - 0.557_799_98 * m + 0.281_256_149 * s;
	const y = -0.040_580_178 * l + 1.112_256_87 * m - 0.071_676_679 * s;
	const z = -0.076_381_285 * l - 0.421_481_978 * m + 1.586_163_22 * s;

	return [x * 100, y * 100, z * 100];
};

convert.oklab.rgb = function (oklab) {
	const ll = oklab[0] / 100;
	const aa = oklab[1] / 100;
	const bb = oklab[2] / 100;

	const l = (ll + 0.396_337_777_4 * aa + 0.215_803_757_3 * bb) ** 3;
	const m = (ll - 0.105_561_345_8 * aa - 0.063_854_172_8 * bb) ** 3;
	const s = (ll - 0.089_484_177_5 * aa - 1.291_485_548 * bb) ** 3;

	// Assume sRGB
	const r = srgbNonlinearTransform(4.076_741_662_1 * l - 3.307_711_591_3 * m + 0.230_969_929_2 * s);
	const g = srgbNonlinearTransform(-1.268_438_004_6 * l + 2.609_757_401_1 * m - 0.341_319_396_5 * s);
	const b = srgbNonlinearTransform(-0.004_196_086_3 * l - 0.703_418_614_7 * m + 1.707_614_701 * s);

	return [r * 255, g * 255, b * 255];
};

convert.oklch.oklab = function (oklch) {
	return convert.lch.lab(oklch);
};

convert.lab.xyz = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let x;
	let y;
	let z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2 = y ** 3;
	const x2 = x ** 3;
	const z2 = z ** 3;
	y = y2 > LAB_FT ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > LAB_FT ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > LAB_FT ? z2 : (z - 16 / 116) / 7.787;

	// Illuminant D65 XYZ Tristrimulus Values
	// https://en.wikipedia.org/wiki/CIE_1931_color_space
	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let h;

	const hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	const l = lch[0];
	const c = lch[1];
	const h = lch[2];

	const hr = h / 360 * 2 * Math.PI;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args, saturation = null) {
	const [r, g, b] = args;
	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi = 30
		/* eslint-disable no-bitwise */
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));
		/* eslint-enable no-bitwise */

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	// eslint-disable-next-line no-bitwise
	if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	args = args[0];

	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (Math.trunc(args > 50) + 1) * 0.5;
	/* eslint-disable no-bitwise */
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;
	/* eslint-enable no-bitwise */

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	args = args[0];

	// Handle greyscale
	if (args >= 232) {
		const c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem;
	const r = Math.floor(args / 36) / 5 * 255;
	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	/* eslint-disable no-bitwise */
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);
	/* eslint-enable no-bitwise */

	const string = integer.toString(16).toUpperCase();
	return '000000'.slice(string.length) + string;
};

convert.hex.rgb = function (args) {
	const match = args.toString(16).match(/[a-f\d]{6}|[a-f\d]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = [...colorString].map(char => char + char).join('');
	}

	const integer = Number.parseInt(colorString, 16);
	/* eslint-disable no-bitwise */
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;
	/* eslint-enable no-bitwise */

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let hue;

	const grayscale = chroma < 1 ? min / (1 - chroma) : 0;

	if (chroma <= 0) {
		hue = 0;
	} else if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	const c = l < 0.5 ? (2 * s * l) : (2 * s * (1 - l));

	let f = 0;
	if (c < 1) {
		f = (l - 0.5 * c) / (1 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;

	const c = s * v;
	let f = 0;

	if (c < 1) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	const h = hcg[0] / 360;
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	if (c === 0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure = [0, 0, 0];
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0: {
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		}

		case 1: {
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		}

		case 2: {
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		}

		case 3: {
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		}

		case 4: {
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		}

		default: {
			pure[0] = 1; pure[1] = 0; pure[2] = w;
		}
	}
	/* eslint-enable max-statements-per-line */

	mg = (1 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255,
	];
};

convert.hcg.hsv = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const v = c + g * (1 - c);
	let f = 0;

	if (v > 0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const l = g * (1 - c) + 0.5 * c;
	let s = 0;

	if (l > 0 && l < 0.5) {
		s = c / (2 * l);
	} else if (l >= 0.5 && l < 1) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;
	const v = c + g * (1 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	const w = hwb[1] / 100;
	const b = hwb[2] / 100;
	const v = 1 - b;
	const c = v - w;
	let g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65_535) * 255, (apple[1] / 65_535) * 255, (apple[2] / 65_535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65_535, (rgb[1] / 255) * 65_535, (rgb[2] / 255) * 65_535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	/* eslint-disable no-bitwise */
	const value = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer = (value << 16) + (value << 8) + value;
	/* eslint-enable no-bitwise */

	const string = integer.toString(16).toUpperCase();
	return '000000'.slice(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	const value = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [value / 255 * 100];
};


/***/ },

/***/ "./node_modules/color-convert/index.js"
/*!*********************************************!*\
  !*** ./node_modules/color-convert/index.js ***!
  \*********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _conversions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversions.js */ "./node_modules/color-convert/conversions.js");
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route.js */ "./node_modules/color-convert/route.js");



const convert = {};

const models = Object.keys(_conversions_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

function wrapRaw(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];
		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		return fn(args);
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];

		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let {length} = result, i = 0; i < length; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

for (const fromModel of models) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: _conversions_js__WEBPACK_IMPORTED_MODULE_0__["default"][fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: _conversions_js__WEBPACK_IMPORTED_MODULE_0__["default"][fromModel].labels});

	const routes = (0,_route_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fromModel);
	const routeModels = Object.keys(routes);

	for (const toModel of routeModels) {
		const fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (convert);


/***/ },

/***/ "./node_modules/color-convert/route.js"
/*!*********************************************!*\
  !*** ./node_modules/color-convert/route.js ***!
  \*********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _conversions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversions.js */ "./node_modules/color-convert/conversions.js");


/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models = Object.keys(_conversions_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

	for (let {length} = models, i = 0; i < length; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null,
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	const graph = buildGraph();
	const queue = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length > 0) {
		const current = queue.pop();
		const adjacents = Object.keys(_conversions_js__WEBPACK_IMPORTED_MODULE_0__["default"][current]);

		for (let {length} = adjacents, i = 0; i < length; i++) {
			const adjacent = adjacents[i];
			const node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	const path = [graph[toModel].parent, toModel];
	let fn = _conversions_js__WEBPACK_IMPORTED_MODULE_0__["default"][graph[toModel].parent][toModel];

	let cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(_conversions_js__WEBPACK_IMPORTED_MODULE_0__["default"][graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

function route(fromModel) {
	const graph = deriveBFS(fromModel);
	const conversion = {};

	const models = Object.keys(graph);
	for (let {length} = models, i = 0; i < length; i++) {
		const toModel = models[i];
		const node = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (route);


/***/ },

/***/ "./node_modules/color-name/index.js"
/*!******************************************!*\
  !*** ./node_modules/color-name/index.js ***!
  \******************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const colors = {
	aliceblue: [240, 248, 255],
	antiquewhite: [250, 235, 215],
	aqua: [0, 255, 255],
	aquamarine: [127, 255, 212],
	azure: [240, 255, 255],
	beige: [245, 245, 220],
	bisque: [255, 228, 196],
	black: [0, 0, 0],
	blanchedalmond: [255, 235, 205],
	blue: [0, 0, 255],
	blueviolet: [138, 43, 226],
	brown: [165, 42, 42],
	burlywood: [222, 184, 135],
	cadetblue: [95, 158, 160],
	chartreuse: [127, 255, 0],
	chocolate: [210, 105, 30],
	coral: [255, 127, 80],
	cornflowerblue: [100, 149, 237],
	cornsilk: [255, 248, 220],
	crimson: [220, 20, 60],
	cyan: [0, 255, 255],
	darkblue: [0, 0, 139],
	darkcyan: [0, 139, 139],
	darkgoldenrod: [184, 134, 11],
	darkgray: [169, 169, 169],
	darkgreen: [0, 100, 0],
	darkgrey: [169, 169, 169],
	darkkhaki: [189, 183, 107],
	darkmagenta: [139, 0, 139],
	darkolivegreen: [85, 107, 47],
	darkorange: [255, 140, 0],
	darkorchid: [153, 50, 204],
	darkred: [139, 0, 0],
	darksalmon: [233, 150, 122],
	darkseagreen: [143, 188, 143],
	darkslateblue: [72, 61, 139],
	darkslategray: [47, 79, 79],
	darkslategrey: [47, 79, 79],
	darkturquoise: [0, 206, 209],
	darkviolet: [148, 0, 211],
	deeppink: [255, 20, 147],
	deepskyblue: [0, 191, 255],
	dimgray: [105, 105, 105],
	dimgrey: [105, 105, 105],
	dodgerblue: [30, 144, 255],
	firebrick: [178, 34, 34],
	floralwhite: [255, 250, 240],
	forestgreen: [34, 139, 34],
	fuchsia: [255, 0, 255],
	gainsboro: [220, 220, 220],
	ghostwhite: [248, 248, 255],
	gold: [255, 215, 0],
	goldenrod: [218, 165, 32],
	gray: [128, 128, 128],
	green: [0, 128, 0],
	greenyellow: [173, 255, 47],
	grey: [128, 128, 128],
	honeydew: [240, 255, 240],
	hotpink: [255, 105, 180],
	indianred: [205, 92, 92],
	indigo: [75, 0, 130],
	ivory: [255, 255, 240],
	khaki: [240, 230, 140],
	lavender: [230, 230, 250],
	lavenderblush: [255, 240, 245],
	lawngreen: [124, 252, 0],
	lemonchiffon: [255, 250, 205],
	lightblue: [173, 216, 230],
	lightcoral: [240, 128, 128],
	lightcyan: [224, 255, 255],
	lightgoldenrodyellow: [250, 250, 210],
	lightgray: [211, 211, 211],
	lightgreen: [144, 238, 144],
	lightgrey: [211, 211, 211],
	lightpink: [255, 182, 193],
	lightsalmon: [255, 160, 122],
	lightseagreen: [32, 178, 170],
	lightskyblue: [135, 206, 250],
	lightslategray: [119, 136, 153],
	lightslategrey: [119, 136, 153],
	lightsteelblue: [176, 196, 222],
	lightyellow: [255, 255, 224],
	lime: [0, 255, 0],
	limegreen: [50, 205, 50],
	linen: [250, 240, 230],
	magenta: [255, 0, 255],
	maroon: [128, 0, 0],
	mediumaquamarine: [102, 205, 170],
	mediumblue: [0, 0, 205],
	mediumorchid: [186, 85, 211],
	mediumpurple: [147, 112, 219],
	mediumseagreen: [60, 179, 113],
	mediumslateblue: [123, 104, 238],
	mediumspringgreen: [0, 250, 154],
	mediumturquoise: [72, 209, 204],
	mediumvioletred: [199, 21, 133],
	midnightblue: [25, 25, 112],
	mintcream: [245, 255, 250],
	mistyrose: [255, 228, 225],
	moccasin: [255, 228, 181],
	navajowhite: [255, 222, 173],
	navy: [0, 0, 128],
	oldlace: [253, 245, 230],
	olive: [128, 128, 0],
	olivedrab: [107, 142, 35],
	orange: [255, 165, 0],
	orangered: [255, 69, 0],
	orchid: [218, 112, 214],
	palegoldenrod: [238, 232, 170],
	palegreen: [152, 251, 152],
	paleturquoise: [175, 238, 238],
	palevioletred: [219, 112, 147],
	papayawhip: [255, 239, 213],
	peachpuff: [255, 218, 185],
	peru: [205, 133, 63],
	pink: [255, 192, 203],
	plum: [221, 160, 221],
	powderblue: [176, 224, 230],
	purple: [128, 0, 128],
	rebeccapurple: [102, 51, 153],
	red: [255, 0, 0],
	rosybrown: [188, 143, 143],
	royalblue: [65, 105, 225],
	saddlebrown: [139, 69, 19],
	salmon: [250, 128, 114],
	sandybrown: [244, 164, 96],
	seagreen: [46, 139, 87],
	seashell: [255, 245, 238],
	sienna: [160, 82, 45],
	silver: [192, 192, 192],
	skyblue: [135, 206, 235],
	slateblue: [106, 90, 205],
	slategray: [112, 128, 144],
	slategrey: [112, 128, 144],
	snow: [255, 250, 250],
	springgreen: [0, 255, 127],
	steelblue: [70, 130, 180],
	tan: [210, 180, 140],
	teal: [0, 128, 128],
	thistle: [216, 191, 216],
	tomato: [255, 99, 71],
	turquoise: [64, 224, 208],
	violet: [238, 130, 238],
	wheat: [245, 222, 179],
	white: [255, 255, 255],
	whitesmoke: [245, 245, 245],
	yellow: [255, 255, 0],
	yellowgreen: [154, 205, 50],
}

for (const key in colors) Object.freeze(colors[key]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.freeze(colors));

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__("./src/vis_str_demo.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVEsUUFBUSxRQUFRO0FBQ3BDOztBQUVBLFlBQVksUUFBUSxRQUFRLFFBQVE7QUFDcEM7O0FBRUEsWUFBWSxRQUFRLFFBQVEsT0FBTztBQUNuQzs7QUFFQSxZQUFZLFFBQVEsUUFBUSxPQUFPO0FBQ25DOztBQUVBLFlBQVksUUFBUSxRQUFRLE9BQU87QUFDbkM7O0FBRUEsWUFBWSxRQUFRLFFBQVEsT0FBTztBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEVBQTBFOztBQUUxRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsRUFBRSxTQUFTLEVBQUU7QUFDN0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWEsYUFBYTtBQUMxQzs7QUFFQTtBQUNBLGdCQUFnQixhQUFhLGFBQWE7QUFDMUM7O0FBRUE7QUFDQSxnQkFBZ0IsYUFBYSxhQUFhO0FBQzFDOztBQUVBO0FBQ0EsZ0JBQWdCLGFBQWEsYUFBYTtBQUMxQzs7QUFFQTtBQUNBLGdCQUFnQixhQUFhLGFBQWE7QUFDMUM7O0FBRUE7QUFDQSxnQkFBZ0IsYUFBYTtBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ245QjJDO0FBQ1o7O0FBRS9COztBQUVBLDJCQUEyQix1REFBVzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLGFBQWEsUUFBUSxpQkFBaUIsWUFBWTtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0RBQXdELE9BQU8sdURBQVcscUJBQXFCO0FBQy9GLHNEQUFzRCxPQUFPLHVEQUFXLG1CQUFtQjs7QUFFM0YsZ0JBQWdCLHFEQUFLO0FBQ3JCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEZvQjs7QUFFM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1REFBVzs7QUFFdkMsV0FBVyxRQUFRLGlCQUFpQixZQUFZO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCOztBQUU1Qjs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLHVEQUFXOztBQUUzQyxZQUFZLFFBQVEsb0JBQW9CLFlBQVk7QUFDcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsdURBQVc7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBLFlBQVksdURBQVc7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxRQUFRLGlCQUFpQixZQUFZO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDakdyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBZSxxQkFBcUIsRTs7Ozs7O1VDeEpwQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VDNUJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0EsRTs7O1VDUEEseUY7OztVQ0FBO1VBQ0E7VUFDQSxzREFBc0QsaUJBQWlCO1VBQ3ZFLGdEQUFnRCxhQUFhO1VBQzdELEU7Ozs7VUVKQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Zpc3N0ci8uL3NyYy9zdHJsaWIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdmlzc3RyLy4vc3JjL3N0cmxpYi9seW5kb24udHMiLCJ3ZWJwYWNrOi8vdmlzc3RyLy4vc3JjL3N0cmxpYi9sei50cyIsIndlYnBhY2s6Ly92aXNzdHIvLi9zcmMvc3RybGliL3BhbGluZHJvbWVzLnRzIiwid2VicGFjazovL3Zpc3N0ci8uL3NyYy9zdHJsaWIvcmVwZWF0cy50cyIsIndlYnBhY2s6Ly92aXNzdHIvLi9zcmMvc3RybGliL3J1bnMudHMiLCJ3ZWJwYWNrOi8vdmlzc3RyLy4vc3JjL3N0cmxpYi9zcXVhcmVzLnRzIiwid2VicGFjazovL3Zpc3N0ci8uL3NyYy9zdHJsaWIvc3VmZml4QXJyYXkudHMiLCJ3ZWJwYWNrOi8vdmlzc3RyLy4vc3JjL3N0cmxpYi91dGlsLnRzIiwid2VicGFjazovL3Zpc3N0ci8uL3NyYy92aXNfc3RyLnRzIiwid2VicGFjazovL3Zpc3N0ci8uL3NyYy92aXNfc3RyX2RlbW8udHMiLCJ3ZWJwYWNrOi8vdmlzc3RyLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvY29udmVyc2lvbnMuanMiLCJ3ZWJwYWNrOi8vdmlzc3RyLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmlzc3RyLy4vbm9kZV9tb2R1bGVzL2NvbG9yLWNvbnZlcnQvcm91dGUuanMiLCJ3ZWJwYWNrOi8vdmlzc3RyLy4vbm9kZV9tb2R1bGVzL2NvbG9yLW5hbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdmlzc3RyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmlzc3RyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmlzc3RyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmlzc3RyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmlzc3RyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly92aXNzdHIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gXCIuL3V0aWxcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3BhbGluZHJvbWVzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zcXVhcmVzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9ydW5zXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9yZXBlYXRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9selwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbHluZG9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zdWZmaXhBcnJheVwiO1xuIiwiaW1wb3J0IHsgUmFuZ2VTaW1wbGUgfSBmcm9tIFwiLi4vdmlzX3N0clwiO1xuXG5leHBvcnQgY29uc3QgaXNMeW5kb24gPSAoc3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgbGVzc3RoYW4gPSBmYWxzZTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHN0ci5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgajIgPSAoaSArIGopICUgc3RyLmxlbmd0aDtcbiAgICAgIGlmIChzdHJbal0gPiBzdHJbajJdKSByZXR1cm4gZmFsc2U7XG4gICAgICBlbHNlIGlmIChzdHJbal0gPCBzdHJbajJdKSB7XG4gICAgICAgIGxlc3N0aGFuID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghbGVzc3RoYW4pIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtTHluZG9uID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXTtcbiAgZm9yIChsZXQgbGVuID0gMTsgbGVuIDw9IHN0ci5sZW5ndGg7IGxlbisrKSB7XG4gICAgY29uc3QgZ3JvdXA6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSArIGxlbiA8PSBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHN1YiA9IHN0ci5zbGljZShpLCBpICsgbGVuKTtcbiAgICAgIGlmIChpc0x5bmRvbihzdWIpKSBncm91cC5wdXNoKFtpLCBpICsgbGVuIC0gMV0pO1xuICAgIH1cbiAgICBpZiAoZ3JvdXAubGVuZ3RoID4gMCkgcmVzLnB1c2goZ3JvdXApO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG4vLyBEdXZhbCdzIGFsZ29yaXRobVxuLy8gZmluZCBsb25nZXN0IGx5bmRvbiBmYWN0b3Igd2hpY2ggc3RhcnRzIGF0IGJlZyBpbiBzdHIuXG4vLyByZXR1cm4gW2xlbiwgcmVwZWF0XSwgd2hlcmVcbi8vIGxlbiBpcyB0aGUgbGVuZ3RoIG9mIHRoZSBmYWN0b3IsXG4vLyByZXBlYXQgaXMgdGhlIG1heGltdW0gcmVwZWF0IG9mIHRoZSBmYWN0b3IuXG5leHBvcnQgY29uc3QgZmluZExvbmdlc3RMeW5kb25GYWN0b3IgPSAoXG4gIHN0cjogc3RyaW5nLFxuICBiZWc6IG51bWJlcixcbik6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICBsZXQgaSA9IGJlZztcbiAgbGV0IGVuZCA9IGJlZyArIDE7XG4gIHdoaWxlIChlbmQgPCBzdHIubGVuZ3RoICYmIHN0cltpXSA8PSBzdHJbZW5kXSkge1xuICAgIGlmIChzdHJbaV0gPT09IHN0cltlbmRdKSB7XG4gICAgICBpKys7XG4gICAgICBlbmQrKztcbiAgICB9IGVsc2UgaWYgKHN0cltpXSA8IHN0cltlbmRdKSB7XG4gICAgICAvLyBzdHJbYmVnLi4uZW5kXSBpcyBMeW5kb24gc3RyaW5nXG4gICAgICBpID0gYmVnO1xuICAgICAgZW5kKys7XG4gICAgfVxuICB9XG4gIC8vIHN0cltiZWcuLi5lbmQtMV0gaXMgdGhlIGxvbmdlc3QgTHluZG9uIHByZWZpeCBvZiBzdHJbYmVnLi4uXS5cbiAgY29uc3QgbGVuID0gZW5kIC0gaTtcbiAgY29uc3QgcmVwZWF0ID0gTWF0aC5mbG9vcigoZW5kIC0gYmVnKSAvIChlbmQgLSBpKSk7XG4gIHJldHVybiBbbGVuLCByZXBlYXRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGx5bmRvbkZhY3Rvcml6YXRpb24gPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICBsZXQgYmVnID0gMDtcblxuICB3aGlsZSAoYmVnIDwgc3RyLmxlbmd0aCkge1xuICAgIGNvbnN0IGZhY3RvciA9IGZpbmRMb25nZXN0THluZG9uRmFjdG9yKHN0ciwgYmVnKTtcbiAgICBjb25zdCBsZW5GYWN0b3IgPSBmYWN0b3JbMF0gKiBmYWN0b3JbMV07XG4gICAgcmVzLnB1c2goW1tiZWcsIGJlZyArIGxlbkZhY3RvciAtIDEsIGZhY3RvclswXV1dIGFzIFJhbmdlU2ltcGxlW10pO1xuICAgIGJlZyArPSBsZW5GYWN0b3I7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBseW5kb25BcnJheSA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZmFjdG9yID0gZmluZExvbmdlc3RMeW5kb25GYWN0b3Ioc3RyLCBpKTtcbiAgICByZXMucHVzaChbW2ksIGkgKyBmYWN0b3JbMF0gLSAxXV0gYXMgUmFuZ2VTaW1wbGVbXSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCJpbXBvcnQgeyBSYW5nZVNpbXBsZSB9IGZyb20gXCIuLi92aXNfc3RyXCI7XG5pbXBvcnQgeyBsY3AgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBjb25zdCBwcmV2T2NjTFBGID0gKHN0cjogc3RyaW5nKTogW251bWJlcltdLCBudW1iZXJbXV0gPT4ge1xuICBjb25zdCBwcmV2T2NjID0gW107XG4gIGNvbnN0IGxwZiA9IFtdO1xuICBjb25zdCBuID0gc3RyLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICBsZXQgcG9jY3ggPSAtMTtcbiAgICBsZXQgbHBmeCA9IDA7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBpOyBqKyspIHtcbiAgICAgIGNvbnN0IGwgPSBsY3Aoc3RyLCBpLCBqKTtcbiAgICAgIGlmIChscGZ4IDwgbCkge1xuICAgICAgICBscGZ4ID0gbDtcbiAgICAgICAgcG9jY3ggPSBqO1xuICAgICAgfVxuICAgIH1cbiAgICBwcmV2T2NjLnB1c2gocG9jY3gpO1xuICAgIGxwZi5wdXNoKGxwZngpO1xuICB9XG4gIHJldHVybiBbcHJldk9jYywgbHBmXTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtUHJldk9jY0xQRiA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBjb25zdCBbcHJldk9jYywgbHBmXSA9IHByZXZPY2NMUEYoc3RyKTtcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXG4gICAgW1stMSwgbiAtIDEsIFtcIm9jY1wiXS5jb25jYXQocHJldk9jYy5tYXAoKHgpID0+IHgudG9TdHJpbmcoKSkpXV0sXG4gICAgW1stMSwgbiAtIDEsIFtcImxlblwiXS5jb25jYXQobHBmLm1hcCgoeCkgPT4geC50b1N0cmluZygpKSldXSxcbiAgXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2T2NjLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGxwZltpXSA+IDApIHtcbiAgICAgIHJlcy5wdXNoKFtcbiAgICAgICAgW2ksIGkgKyBscGZbaV0gLSAxXSxcbiAgICAgICAgW3ByZXZPY2NbaV0sIHByZXZPY2NbaV0gKyBscGZbaV0gLSAxXSxcbiAgICAgIF0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGx6NzcgPSAoXG4gIHN0cjogc3RyaW5nLFxuICBzaG93RmFjdG9ySWQ6IG51bWJlciA9IDEsXG4pOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICBjb25zdCBuID0gc3RyLmxlbmd0aDtcbiAgY29uc3QgW29jY3MsIGxlbnNdID0gcHJldk9jY0xQRihzdHIpO1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjspIHtcbiAgICBsZXQgcmFuZ2VzOiBSYW5nZVNpbXBsZVtdID0gW107XG4gICAgaWYgKG9jY3NbaV0gPT09IC0xKSB7XG4gICAgICByYW5nZXMgPSBbW2ksIGksIFtzdHJbaV1dXV07XG4gICAgICBpICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlcyA9IFtcbiAgICAgICAgW29jY3NbaV0sIG9jY3NbaV0gKyBsZW5zW2ldIC0gMV0sXG4gICAgICAgIFtpLCBpICsgbGVuc1tpXSAtIDFdLFxuICAgICAgXTtcbiAgICAgIGkgKz0gbGVuc1tpXTtcbiAgICB9XG4gICAgaWYgKHNob3dGYWN0b3JJZCA+PSAwKSB7XG4gICAgICBjb25zdCBsYXN0RW5kID0gcmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXVsxXTtcbiAgICAgIHJhbmdlcy5wdXNoKFtsYXN0RW5kICsgMSwgbGFzdEVuZCArIDEsIFtcImZcIiArIHNob3dGYWN0b3JJZF1dKTtcbiAgICAgIHNob3dGYWN0b3JJZCsrO1xuICAgIH1cbiAgICByZXMucHVzaChyYW5nZXMpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgbHo3OCA9IChzdHI6IHN0cmluZywgc2hvd0ZhY3RvcklkID0gMSk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIGNvbnN0IGQgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7KSB7XG4gICAgbGV0IGogPSBpICsgMTtcbiAgICB3aGlsZSAoaiA8PSBzdHIubGVuZ3RoICYmIGQuaGFzKHN0ci5zdWJzdHJpbmcoaSwgaikpKSB7XG4gICAgICBqKys7XG4gICAgfVxuICAgIGNvbnN0IHJvdzogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICAgIGlmIChqIC0gaSA+IDEpIHtcbiAgICAgIGNvbnN0IHByZXYgPSBkLmdldChzdHIuc3Vic3RyaW5nKGksIGogLSAxKSkgYXMgbnVtYmVyO1xuICAgICAgcm93LnB1c2goW3ByZXYsIHByZXYgKyAoaiAtIGkgLSAyKV0pO1xuICAgICAgcm93LnB1c2goW2ksIGogLSAyXSk7XG4gICAgfVxuICAgIGlmIChqIDwgc3RyLmxlbmd0aCkge1xuICAgICAgcm93LnB1c2goW2ogLSAxLCBqLCBbc3RyW2ogLSAxXSwgXCJmXCIgKyBzaG93RmFjdG9ySWRdXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvdy5wdXNoKFtqIC0gMSwgaiAtIDEsIFtcImZcIiArIHNob3dGYWN0b3JJZF1dKTtcbiAgICB9XG4gICAgc2hvd0ZhY3RvcklkKys7XG4gICAgcmVzLnB1c2gocm93KTtcbiAgICBkLnNldChzdHIuc3Vic3RyaW5nKGksIGopLCBpKTtcbiAgICBpID0gajtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbiIsImltcG9ydCB7IFJhbmdlTGluZSB9IGZyb20gXCIuLi92aXNfc3RyXCI7XG5cbmV4cG9ydCBjb25zdCBpc1BhbGluZHJvbWUgPSAoc3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoIC8gMjsgaSsrKSB7XG4gICAgaWYgKHN0cltpXSAhPSBzdHJbc3RyLmxlbmd0aCAtIGkgLSAxXSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGVudW1QYWxpbmRyb21lcyA9IChzdHI6IHN0cmluZyk6IFJhbmdlTGluZVtdID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gIGNvbnN0IHJlczogUmFuZ2VMaW5lW10gPSBbXTtcbiAgZm9yIChsZXQgbGVuID0gMTsgbGVuIDw9IG47IGxlbisrKSB7XG4gICAgZm9yIChsZXQgYmVnID0gMDsgYmVnICsgbGVuIDw9IG47IGJlZysrKSB7XG4gICAgICBpZiAoaXNQYWxpbmRyb21lKHN0ci5zdWJzdHJpbmcoYmVnLCBiZWcgKyBsZW4pKSlcbiAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgbGVuIC0gMV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbiIsImltcG9ydCB7IHJldmVyc2UgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBjb25zdCBsZWZ0RXh0ZW5zaW9ucyA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IHJlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCBmcm9tSWR4ID0gMTtcbiAgbGV0IHBvcyA9IHN0ci5pbmRleE9mKHBhdCwgZnJvbUlkeCk7XG4gIHdoaWxlIChwb3MgIT09IC0xKSB7XG4gICAgcmVzLmFkZChzdHJbcG9zIC0gMV0pO1xuICAgIHBvcyA9IHN0ci5pbmRleE9mKHBhdCwgcG9zICsgMSk7XG4gIH1cbiAgcmV0dXJuIFsuLi5yZXMua2V5cygpXTtcbn07XG5cbmV4cG9ydCBjb25zdCByaWdodEV4dGVuc2lvbnMgPSAoc3RyOiBzdHJpbmcsIHBhdDogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCByc3RyID0gcmV2ZXJzZShzdHIpO1xuICBjb25zdCBycGF0ID0gcmV2ZXJzZShwYXQpO1xuICByZXR1cm4gbGVmdEV4dGVuc2lvbnMocnN0ciwgcnBhdCk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNMZWZ0TWF4aW1hbCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGxlZnRFeHRlbnNpb25zKHN0ciwgcGF0KS5sZW5ndGggPiAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzUmlnaHRNYXhpbWFsID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gcmlnaHRFeHRlbnNpb25zKHN0ciwgcGF0KS5sZW5ndGggPiAxO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTWF4UmVwZWF0ID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gaXNMZWZ0TWF4aW1hbChzdHIsIHBhdCkgJiYgaXNSaWdodE1heGltYWwoc3RyLCBwYXQpO1xufTtcbiIsImltcG9ydCB7IFJhbmdlU2ltcGxlIH0gZnJvbSBcIi4uL3Zpc19zdHJcIjtcblxuZXhwb3J0IGNvbnN0IGlzUnVuID0gKHM6IHN0cmluZywgYmVnOiBudW1iZXIsIHA6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICBpZiAoYmVnID4gMCAmJiBzW2JlZyAtIDFdID09IHNbYmVnICsgcCAtIDFdKSByZXR1cm4gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcDsgaSsrKSB7XG4gICAgaWYgKHNbYmVnICsgaV0gIT0gc1tiZWcgKyBwICsgaV0pIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtUnVucyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgY29uc3QgbiA9IHMubGVuZ3RoO1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgY29uc3Qgcm1hcCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGxldCBwID0gMTsgcCA8IG47IHArKykge1xuICAgIGZvciAobGV0IGJlZyA9IDA7IGJlZyArIDIgKiBwIDw9IG47IGJlZysrKSB7XG4gICAgICBpZiAoaXNSdW4ocywgYmVnLCBwKSkge1xuICAgICAgICBsZXQgbWF0Y2ggPSAyICogcDtcbiAgICAgICAgd2hpbGUgKG1hdGNoIDwgbiAmJiBzW2JlZyArIChtYXRjaCAlIHApXSA9PSBzW2JlZyArIG1hdGNoXSkge1xuICAgICAgICAgIG1hdGNoKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5ID0gYmVnICsgXCIsXCIgKyAoYmVnICsgbWF0Y2ggLSAxKTtcbiAgICAgICAgaWYgKCFybWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgbWF0Y2ggLSAxLCBwXSk7XG4gICAgICAgICAgcm1hcC5hZGQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbiIsImltcG9ydCB7IFJhbmdlU2ltcGxlIH0gZnJvbSBcIi4uL3Zpc19zdHJcIjtcblxuZXhwb3J0IGNvbnN0IGlzU3F1YXJlID0gKHM6IHN0cmluZywgYmVnOiBudW1iZXIsIHA6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHA7IGkrKykge1xuICAgIGlmIChzW2JlZyArIGldICE9IHNbYmVnICsgcCArIGldKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgaXNSaWdodG1vc3RTcXVhcmUgPSAoXG4gIHM6IHN0cmluZyxcbiAgYmVnOiBudW1iZXIsXG4gIHA6IG51bWJlcixcbik6IGJvb2xlYW4gPT4ge1xuICBpZiAoIWlzU3F1YXJlKHMsIGJlZywgcCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICFzLmluY2x1ZGVzKHMuc2xpY2UoYmVnLCBiZWcgKyAyICogcCksIGJlZyArIDEpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTGVmdG1vc3RTcXVhcmUgPSAoXG4gIHM6IHN0cmluZyxcbiAgYmVnOiBudW1iZXIsXG4gIHA6IG51bWJlcixcbik6IGJvb2xlYW4gPT4ge1xuICBpZiAoIWlzU3F1YXJlKHMsIGJlZywgcCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICFzLnNsaWNlKDAsIGJlZyArIDIgKiBwIC0gMSkuaW5jbHVkZXMocy5zbGljZShiZWcsIGJlZyArIDIgKiBwKSk7XG59O1xuXG4vKiogRW51bWVyYXRlIHNxdWFyZXMgKGJlZywgcGVyaW9kIHApIG9mIGBzYCBtYXRjaGluZyBgcHJlZGljYXRlYC4gKi9cbmNvbnN0IGVudW1TcXVhcmVMaWtlID0gKFxuICBzOiBzdHJpbmcsXG4gIHByZWRpY2F0ZTogKHM6IHN0cmluZywgYmVnOiBudW1iZXIsIHA6IG51bWJlcikgPT4gYm9vbGVhbixcbik6IFJhbmdlU2ltcGxlW10gPT4ge1xuICBjb25zdCBuID0gcy5sZW5ndGg7XG4gIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICBmb3IgKGxldCBwID0gMTsgcCA8IG47IHArKykge1xuICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IDIgKiBwOyBvZmZzZXQrKykge1xuICAgICAgZm9yIChsZXQgYmVnID0gb2Zmc2V0OyBiZWcgPCBuIC0gMiAqIHAgKyAxOyBiZWcgKz0gMiAqIHApIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShzLCBiZWcsIHApKSB7XG4gICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgMiAqIHAgLSAxLCBwXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtU3F1YXJlcyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+XG4gIGVudW1TcXVhcmVMaWtlKHMsIGlzU3F1YXJlKTtcblxuZXhwb3J0IGNvbnN0IGVudW1SaWdodG1vc3RTcXVhcmVzID0gKHM6IHN0cmluZyk6IFJhbmdlU2ltcGxlW10gPT5cbiAgZW51bVNxdWFyZUxpa2UocywgaXNSaWdodG1vc3RTcXVhcmUpO1xuXG5leHBvcnQgY29uc3QgZW51bUxlZnRtb3N0U3F1YXJlcyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+XG4gIGVudW1TcXVhcmVMaWtlKHMsIGlzTGVmdG1vc3RTcXVhcmUpO1xuIiwiaW1wb3J0IHsgUmFuZ2VTaW1wbGUgfSBmcm9tIFwiLi4vdmlzX3N0clwiO1xuXG4vLyByZXBsYWNlIHRoZSBjaGFyYWN0ZXJzIHRvIGVmZmVjdGl2ZSBhbHBoYWJldCBbMCwgc2lnbWEtMV1cbi8vIHNpZ21hIGlzIHRoZSBudW1iZXIgb2YgZGlzdGluY3QgY2hhcmFjdGVycyBvZiBnaXZlbiBzdHJpbmdcbi8vIHNpZ21hIG11c3QgYmUgbGVzcyB0aGFuIDEwXG5leHBvcnQgY29uc3QgcmVwbGFjZUVmZmVjdGl2ZUFscGhhYmV0ID0gKHN0cjogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBjaGFycyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykgY2hhcnMuYWRkKHN0cltpXSk7XG4gIGNvbnN0IGFyciA9IEFycmF5LmZyb20oY2hhcnMudmFsdWVzKCkpO1xuICBhcnIuc29ydCgpO1xuICBjb25zdCByZXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBhcnIubWFwKChjLCBpKSA9PiByZXAuc2V0KGMsIGkudG9TdHJpbmcoKSkpO1xuICBjb25zdCByZXBzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSByZXBzLnB1c2gocmVwLmdldChzdHJbaV0pIGFzIHN0cmluZyk7XG4gIHJldHVybiByZXBzO1xufTtcblxuZXhwb3J0IGNvbnN0IHN1ZmZpeEFycmF5ID0gKHN0cjogc3RyaW5nKTogbnVtYmVyW10gPT4ge1xuICBjb25zdCBzdWZmaXhlcyA9IFsuLi5BcnJheShzdHIubGVuZ3RoKS5rZXlzKCldLm1hcCgoaSkgPT4gc3RyLnNsaWNlKGkpKTtcbiAgc3VmZml4ZXMuc29ydCgpO1xuICByZXR1cm4gc3VmZml4ZXMubWFwKChzKSA9PiBzdHIubGVuZ3RoIC0gcy5sZW5ndGgpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJhbmtBcnJheSA9IChzdHI6IHN0cmluZywgc2E/OiBudW1iZXJbXSk6IG51bWJlcltdID0+IHtcbiAgaWYgKHNhID09PSB1bmRlZmluZWQpIHNhID0gc3VmZml4QXJyYXkoc3RyKTtcbiAgY29uc3QgcmFuayA9IEFycmF5KHN0ci5sZW5ndGgpO1xuICBzYS5mb3JFYWNoKChwb3MsIHIpID0+IChyYW5rW3Bvc10gPSByKSk7XG4gIHJldHVybiByYW5rO1xufTtcblxuLyoqXG4gKiBTY2FuIGZvciwgYXQgZWFjaCBpbmRleCBgaWAsIHRoZSBuZWFyZXN0IGluZGV4IGluIGBkaXJlY3Rpb25gIHdob3NlIHJhbmtcbiAqIGlzIHNtYWxsZXIgdGhhbiBgcmFua1tpXWAuIFVzZWQgYnkgYm90aCBgbnNzQXJyYXlgIChkaXJlY3Rpb24gMSwgXCJuZXh0XG4gKiBzbWFsbGVyIHN1ZmZpeFwiKSBhbmQgYHByZXZBcnJheWAgKGRpcmVjdGlvbiAtMSwgXCJwcmV2aW91cyBzbWFsbGVyXG4gKiBzdWZmaXhcIiksIHdoaWNoIGFyZSBvdGhlcndpc2UgbWlycm9yIGltYWdlcyBvZiBlYWNoIG90aGVyLlxuICovXG5jb25zdCBzY2FuU21hbGxlclJhbmsgPSAocmFuazogbnVtYmVyW10sIGRpcmVjdGlvbjogMSB8IC0xKTogbnVtYmVyW10gPT4ge1xuICBjb25zdCBuID0gcmFuay5sZW5ndGg7XG4gIGNvbnN0IG5vdEZvdW5kID0gZGlyZWN0aW9uID09PSAxID8gbiA6IC0xO1xuICBjb25zdCByZXMgPSBuZXcgQXJyYXk8bnVtYmVyPihuKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICByZXNbaV0gPSBub3RGb3VuZDtcbiAgICBmb3IgKGxldCBqID0gaSArIGRpcmVjdGlvbjsgaiA+PSAwICYmIGogPCBuOyBqICs9IGRpcmVjdGlvbikge1xuICAgICAgaWYgKHJhbmtbaV0gPiByYW5rW2pdKSB7XG4gICAgICAgIHJlc1tpXSA9IGo7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuLy8gbmV4dCBzbWFsbGVyIHN1ZmZpeGVzXG5leHBvcnQgY29uc3QgbnNzQXJyYXkgPSAoc3RyOiBzdHJpbmcsIHJhbms/OiBudW1iZXJbXSk6IG51bWJlcltdID0+IHtcbiAgaWYgKHJhbmsgPT09IHVuZGVmaW5lZCkgcmFuayA9IHJhbmtBcnJheShzdHIpO1xuICByZXR1cm4gc2NhblNtYWxsZXJSYW5rKHJhbmssIDEpO1xufTtcblxuLy8gcHJldmlvdXMgc21hbGxlciBzdWZmaXhlc1xuZXhwb3J0IGNvbnN0IHByZXZBcnJheSA9IChzdHI6IHN0cmluZywgcmFuaz86IG51bWJlcltdKTogbnVtYmVyW10gPT4ge1xuICBpZiAocmFuayA9PT0gdW5kZWZpbmVkKSByYW5rID0gcmFua0FycmF5KHN0cik7XG4gIHJldHVybiBzY2FuU21hbGxlclJhbmsocmFuaywgLTEpO1xufTtcblxuZXhwb3J0IGNvbnN0IG5leHRTbWFsbGVyU3VmZml4ZXMgPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICBjb25zdCBuc3NhID0gbnNzQXJyYXkoc3RyKTtcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBncm91cDogUmFuZ2VTaW1wbGVbXSA9IFtbaSwgbnNzYVtpXV1dO1xuICAgIGlmIChncm91cC5sZW5ndGggPiAwKSByZXMucHVzaChncm91cCk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBwcmV2U21hbGxlclN1ZmZpeGVzID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgY29uc3QgcHNzYSA9IHByZXZBcnJheShzdHIpO1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGdyb3VwOiBSYW5nZVNpbXBsZVtdID0gW1twc3NhW2ldLCBpXV07XG4gICAgaWYgKGdyb3VwLmxlbmd0aCA+IDApIHJlcy5wdXNoKGdyb3VwKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbiIsImltcG9ydCB7IFJhbmdlU2ltcGxlIH0gZnJvbSBcIi4uL3Zpc19zdHJcIjtcblxuZXhwb3J0IGNvbnN0IGZsYXQgPSA8VD4oYXJyOiBUW11bXSk6IFRbXSA9PiB7XG4gIHJldHVybiBhcnIucmVkdWNlKChhY20sIHgpID0+IGFjbS5jb25jYXQoeCksIFtdIGFzIFRbXSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3Vic3RyaW5ncyA9IChzdHI6IHN0cmluZyk6IHN0cmluZ1tdID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gIGNvbnN0IHJlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8PSBuOyBqKyspIHJlcy5hZGQoc3RyLnN1YnN0cmluZyhpLCBqKSk7XG4gIH1cbiAgcmV0dXJuIFsuLi5yZXMua2V5cygpXTtcbn07XG5cbmV4cG9ydCBjb25zdCBmaW5kQWxsID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IFJhbmdlU2ltcGxlW10gPT4ge1xuICBjb25zdCBtID0gcGF0Lmxlbmd0aDtcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdID0gW107XG4gIGxldCBwb3MgPSBzdHIuaW5kZXhPZihwYXQpO1xuICB3aGlsZSAocG9zICE9PSAtMSkge1xuICAgIHJlcy5wdXNoKFtwb3MsIHBvcyArIG0gLSAxXSk7XG4gICAgcG9zID0gc3RyLmluZGV4T2YocGF0LCBwb3MgKyAxKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGxjcCA9IChzdHI6IHN0cmluZywgaTogbnVtYmVyLCBqOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBjb25zdCBuID0gc3RyLmxlbmd0aDtcbiAgbGV0IG1hdGNoTGVuID0gMDtcbiAgd2hpbGUgKGkgKyBtYXRjaExlbiA8IG4gJiYgaiArIG1hdGNoTGVuIDwgbikge1xuICAgIGlmIChzdHJbaSArIG1hdGNoTGVuXSA9PSBzdHJbaiArIG1hdGNoTGVuXSkgbWF0Y2hMZW4rKztcbiAgICBlbHNlIGJyZWFrO1xuICB9XG4gIHJldHVybiBtYXRjaExlbjtcbn07XG5cbmV4cG9ydCBjb25zdCByZXZlcnNlID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHN0ci5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtSWYgPSAoXG4gIHN0cjogc3RyaW5nLFxuICBjaGVjazogKHM6IHN0cmluZywgcDogc3RyaW5nKSA9PiBib29sZWFuLFxuKTogUmFuZ2VTaW1wbGVbXSA9PiB7XG4gIHJldHVybiBmbGF0KGVudW1JZkdyb3VwKHN0ciwgY2hlY2spKTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtSWZHcm91cCA9IChcbiAgc3RyOiBzdHJpbmcsXG4gIGNoZWNrOiAoczogc3RyaW5nLCBwOiBzdHJpbmcpID0+IGJvb2xlYW4sXG4pOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICByZXR1cm4gc3Vic3RyaW5ncyhzdHIpXG4gICAgLmZpbHRlcigocCkgPT4gY2hlY2soc3RyLCBwKSlcbiAgICAubWFwKChwKSA9PiBmaW5kQWxsKHN0ciwgcCkpO1xufTtcbiIsImltcG9ydCBjb252ZXJ0IGZyb20gXCJjb2xvci1jb252ZXJ0XCI7XG5cbi8qKiBUaGUgc2ltcGxlIHJhbmdlIHJlcHJlc2VudGF0aW9uIGZvciBzdHJpbmdzICovXG5leHBvcnQgdHlwZSBSYW5nZVN0ciA9IFtudW1iZXIsIG51bWJlciwgc3RyaW5nW11dO1xuLyoqIFRoZSBzaW1wbGUgcmFuZ2UgcmVwcmVzZW50YXRpb24gZm9yIGxpbmUgKi9cbmV4cG9ydCB0eXBlIFJhbmdlTGluZSA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyP107XG4vKiogVGhlIHNpbXBsZSByYW5nZSByZXByZXNlbnRhdGlvbiAqL1xuZXhwb3J0IHR5cGUgUmFuZ2VTaW1wbGUgPSBSYW5nZVN0ciB8IFJhbmdlTGluZTtcblxuZXhwb3J0IGludGVyZmFjZSBSYW5nZSB7XG4gIC8qKiBUaGUgc3R5bGUgdG8gZHJhdyByYW5nZS4gSXQgaXMgZWl0aGVyIG9mIFtcImxpbmVcIiwgXCJjdXJ2ZVwiLCBcImFycm93XCIsIFwic3RyXCJdLiBJZiBcInN0clwiIGlzIGNob3NlbiwgdGhlIG9wdGluYWwgcGFyYW1ldGVyIGBzdHJgIG11c3QgYmUgZ2l2ZW4uIEZvciBvdGhlciBzdHlsZXMsIHlvdSBjYW4gc2V0IGxlZnQgc3R5bGUgYW5kIHJpZ2h0IHN0eWxlIGxpZSBcImxpbmUsYXJyb3dcIi4gKi9cbiAgc3R5bGU6IHN0cmluZztcbiAgLyoqIFRoZSBjb2xvciB0byBkcmF3IHJhbmdlLCBlLmcuIFwiIzAwMDAwMFwiIGZvciBibGFjay4gKi9cbiAgY29sb3I6IHN0cmluZztcbiAgLyoqIFRoZSBiZWdpbm5pbmcgaW5kZXggb2YgdGhlIHJhbmdlLiAqL1xuICBiZWc6IG51bWJlcjtcbiAgLyoqIFRoZSBlbmRpbmcgaW5kZXggb2YgdGhlIHJhbmdlLiBOb3RlIHRoYXQgaW5kZXhlcyBhcmUgaW5jbHVzaXZlLiAqL1xuICBlbmQ6IG51bWJlcjtcbiAgLyoqIFRoZSBzdGVwIG9mIHRoZSByYW5nZSBbYGJlZ2AsIGBlbmRgXS4gRm9yIGV4YW1wbGUsIGEgcmFuZ2UgW2BiZWdgLCBgZW5kYCwgYHN0ZXBgXSA9IFsxLCA4LCAzXSByZXByZXNlbnRzIGNvbnRpbnVvdXMgcmFuZ2VzIFtbYGJlZ2AsIGBlbmRgXV09W1sxLCAzXSwgWzQsIDZdLCBbNywgOF1dICovXG4gIHN0ZXA/OiBudW1iZXI7XG4gIC8qKiBUaGUgc3RyaW5ncyBvZiB0aGUgcmFuZ2UuIEl0cyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSByYW5nZSBgZW5kYCAtIGBiZWdgICsgMSAqL1xuICBzdHI/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYW5nZVB4IHtcbiAgLyoqIFRoZSBzdHlsZSB0byBkcmF3IHJhbmdlLiBJdCBpcyBlaXRoZXIgb2YgW1wibGluZVwiLCBcImN1cnZlXCIsIFwiYXJyb3dcIiwgXCJzdHJcIl0uIElmIFwic3RyXCIgaXMgY2hvc2VuLCB0aGUgb3B0aW5hbCBwYXJhbWV0ZXIgYHN0cmAgbXVzdCBiZSBnaXZlbi4gRm9yIG90aGVyIHN0eWxlcywgeW91IGNhbiBzZXQgbGVmdCBzdHlsZSBhbmQgcmlnaHQgc3R5bGUgbGllIFwibGluZSxhcnJvd1wiLiAqL1xuICBzdHlsZTogc3RyaW5nO1xuICAvKiogVGhlIGNvbG9yIHRvIGRyYXcgcmFuZ2UsIGUuZy4gXCIjMDAwMDAwXCIgZm9yIGJsYWNrLiAqL1xuICBjb2xvcjogc3RyaW5nO1xuICAvKiogVGhlIHgtY29vcmRpbmF0ZSB3aGljaCBiZWdpbnMgdGhlIHJhbmdlLiAqL1xuICB4X2JlZzogbnVtYmVyO1xuICAvKiogVGhlIHgtY29vcmRpbmF0ZSB3aGljaCBlbmRzIHRoZSByYW5nZS4gKi9cbiAgeF9lbmQ6IG51bWJlcjtcbiAgLyoqIFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHJhbmdlLiAqL1xuICB5OiBudW1iZXI7XG4gIC8qKiBUaGUgc3RyaW5ncyBvZiB0aGUgcmFuZ2UuIEl0cyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSByYW5nZSBgZW5kYCAtIGBiZWdgICsgMSAqL1xuICBzdHI/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFZpc1N0ciB7XG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHJpdmF0ZSBzdHJYOiBudW1iZXI7XG4gIHByaXZhdGUgc3RyWTogbnVtYmVyO1xuICBwcml2YXRlIGZvbnRTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgZm9udFNpemVIYWxmOiBudW1iZXI7XG4gIHByaXZhdGUgZm9udFR5cGU6IHN0cmluZztcbiAgLyoqIFRoZSBvZmZzZXQgdG8gc3RhcnQgZHJhd2luZyBhIHJhbmdlIGZyb20gYSBjZW50ZXIgcG9zaXRpb24gb2YgYW4gaW5kZXguICovXG4gIHByaXZhdGUgcmFuZ2VCZWdPZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSByYW5nZUVuZE9mZnNldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gY2FudmFzIEhUTUxDYW52YXNFbGVtZW50XG4gICAqIEBwYXJhbSBmb250U2l6ZSBmb250IHNpemVcbiAgICogQHBhcmFtIGZvbnRUeXBlIGZvbnQgbmFtZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgZm9udFNpemUgPSAzMiwgZm9udFR5cGUgPSBcIkNvdXJpZXJcIikge1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuZm9udFNpemUgPSBmb250U2l6ZTtcbiAgICB0aGlzLmZvbnRTaXplSGFsZiA9IHRoaXMuZm9udFNpemUgLyAyO1xuICAgIHRoaXMuZm9udFR5cGUgPSBmb250VHlwZTtcbiAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHRoaXMuc3RyWCA9IHRoaXMuZm9udFNpemU7XG4gICAgdGhpcy5zdHJZID0gdGhpcy5mb250U2l6ZSAqIDIgKyB0aGlzLmZvbnRTaXplSGFsZjtcbiAgICB0aGlzLnJhbmdlQmVnT2Zmc2V0ID0gLXRoaXMuZm9udFNpemUgLyA0O1xuICAgIHRoaXMucmFuZ2VFbmRPZmZzZXQgPSB0aGlzLmZvbnRTaXplIC8gNDtcbiAgfVxuXG4gIC8qKiBDbGVhciB0aGUgY2FudmFzLiAqL1xuICBjbGVhcigpIHtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeC1jb29yZGluYXRlIHdoaWNoIGlzIGEgYmVnaW5uaW5nIG9mIGEgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBpZHggaW5kZXggb2YgYSByYW5nZVxuICAgKiBAcmV0dXJuIFRoZSB4LWNvb3JkaW5hdGUgb2YgYSByYW5nZSBiZWdpbm5pbmcgYXQgYGlkeGBcbiAgICovXG4gIHJhbmdlQmVnKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdHJYICsgdGhpcy5mb250U2l6ZSAqIGlkeCArIHRoaXMucmFuZ2VCZWdPZmZzZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeC1jb29yZGluYXRlIHdoaWNoIGlzIGEgZW5kaW5nIG9mIGEgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBpZHggaW5kZXggb2YgYSByYW5nZVxuICAgKiBAcmV0dXJuIFRoZSB4LWNvb3JkaW5hdGUgb2YgYSByYW5nZSBlbmRpbmcgYXQgYGlkeGBcbiAgICovXG4gIHJhbmdlRW5kKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdHJYICsgdGhpcy5mb250U2l6ZSAqIGlkeCArIHRoaXMucmFuZ2VFbmRPZmZzZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBoZWlnaHQgb2YgYSBnaXZlbiByYW5nZS5cbiAgICogQHBhcmFtIHIgQSByYW5nZS5cbiAgICovXG4gIHJhbmdlSGVpZ2h0KHI6IFJhbmdlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gci5zdHlsZSA9PT0gXCJzdHJcIiA/IHRoaXMuZm9udFNpemUgOiBNYXRoLnJvdW5kKHRoaXMuZm9udFNpemUgKiAwLjUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBhIHJhbmdlIG5vdCB0byBkcmF3IHN0cmluZ3MsIHNwbGl0IGl0IHRvIHRocmVlIHBhcnRzIGxlZnQsIGNlbnRlciwgYW5kIHJpZ2h0LlxuICAgKiBAcGFyYW0gcnB4IEdpdmVuIHJhbmdlIHRvIHNwbGl0LlxuICAgKi9cbiAgc3BsaXRSYW5nZVB4KHJweDogUmFuZ2VQeCk6IFJhbmdlUHhbXSB7XG4gICAgY29uc3Qgc3R5bGVzID0gcnB4LnN0eWxlLnNwbGl0KFwiLFwiKTtcblxuICAgIGNvbnN0IHJsID0gT2JqZWN0LmFzc2lnbih7fSwgcnB4KTtcbiAgICBjb25zdCByYyA9IE9iamVjdC5hc3NpZ24oe30sIHJweCk7XG4gICAgY29uc3QgcnIgPSBPYmplY3QuYXNzaWduKHt9LCBycHgpO1xuICAgIHJsLnhfZW5kID0gcnB4LnhfYmVnICsgdGhpcy5jdXJ2ZV9kKCk7XG4gICAgcmwuc3R5bGUgPSBzdHlsZXNbMF07XG5cbiAgICByci54X2JlZyA9IHJweC54X2VuZDtcbiAgICByci54X2VuZCA9IHJweC54X2VuZCAtIHRoaXMuY3VydmVfZCgpO1xuICAgIHJyLnN0eWxlID0gc3R5bGVzLmxlbmd0aCA+IDEgPyBzdHlsZXNbMV0gOiBzdHlsZXNbMF07XG5cbiAgICByYy54X2JlZyA9IHJsLnhfZW5kO1xuICAgIHJjLnhfZW5kID0gcnIueF9lbmQ7XG4gICAgcmMuc3R5bGUgPSBcImxpbmVcIjtcbiAgICByZXR1cm4gW3JsLCByYywgcnJdO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgY3VydmUgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3Q3VydmVQYXJ0KHJweDogUmFuZ2VQeCkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyhycHgueF9iZWcsIHJweC55IC0gdGhpcy5jdXJ2ZV9kKCkpO1xuICAgIHRoaXMuY3R4LnF1YWRyYXRpY0N1cnZlVG8ocnB4LnhfYmVnLCBycHgueSwgcnB4LnhfZW5kLCBycHgueSk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBsZW5ndGggb2YgYSBiZWdpbm5pbmcgKG9yIGVuZGluZykgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgY3VydmVfZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZvbnRTaXplSGFsZiAvIDI7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBsaW5lIGFzIGEgcGFydCBvZiBhIHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgZHJhd0xpbmVQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHJweC54X2JlZywgcnB4LnkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyhycHgueF9lbmQsIHJweC55KTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGFycm93IGFzIGEgcGFydCBvZiBhIHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgZHJhd0Fycm93UHhQYXJ0KHJweDogUmFuZ2VQeCkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy5jdXJ2ZV9kKCkgKiAocnB4LnhfYmVnIDwgcnB4LnhfZW5kID8gLTEgOiArMSk7XG4gICAgdGhpcy5kcmF3TGluZVB4UGFydChycHgpO1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyhycHgueF9lbmQgKyBkeCAvIDIsIHJweC55ICsgZHggLyAyKTtcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kICsgZHgsIHJweC55KTtcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kICsgZHggLyAyLCBycHgueSAtIGR4IC8gMik7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyByYW5nZSBhcyBhIHBhcnQgb2YgYSByYW5nZS5cbiAgICogQHBhcmFtIHJweCBBIHBhcnQgb2YgYSByYW5nZS5cbiAgICovXG4gIGRyYXdSYW5nZVB4UGFydChycHg6IFJhbmdlUHgpIHtcbiAgICBpZiAocnB4LnN0eWxlID09IFwibGluZVwiKSB7XG4gICAgICB0aGlzLmRyYXdMaW5lUHhQYXJ0KHJweCk7XG4gICAgfSBlbHNlIGlmIChycHguc3R5bGUgPT0gXCJjdXJ2ZVwiKSB7XG4gICAgICB0aGlzLmRyYXdDdXJ2ZVBhcnQocnB4KTtcbiAgICB9IGVsc2UgaWYgKHJweC5zdHlsZSA9PSBcImFycm93XCIpIHtcbiAgICAgIHRoaXMuZHJhd0Fycm93UHhQYXJ0KHJweCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSByYW5nZSB0byBkcmF3LlxuICAgKi9cbiAgZHJhd1JhbmdlUHgocnB4OiBSYW5nZVB4KSB7XG4gICAgaWYgKHJweC5zdHlsZSA9PSBcImxpbmVcIikge1xuICAgICAgdGhpcy5kcmF3TGluZVB4UGFydChycHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBbcmwsIHJjLCBycl0gPSB0aGlzLnNwbGl0UmFuZ2VQeChycHgpO1xuICAgICAgdGhpcy5kcmF3UmFuZ2VQeFBhcnQocmwpO1xuICAgICAgdGhpcy5kcmF3UmFuZ2VQeFBhcnQocmMpO1xuICAgICAgdGhpcy5kcmF3UmFuZ2VQeFBhcnQocnIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHN0cmluZ3MuXG4gICAqIEBwYXJhbSByIEEgcmFuZ2UgdG8gZHJhdyBzdHJpbmdzLlxuICAgKiBAcGFyYW0geSBUaGUgeS1jb29yaW5hdGUgdG8gZHJhdyByYW5nZSBgcmAuXG4gICAqL1xuICBkcmF3U3RyKHI6IFJhbmdlLCB5OiBudW1iZXIpIHtcbiAgICBjb25zdCByc3RyID0gci5zdHIgYXMgc3RyaW5nW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gcnN0cltpXTtcbiAgICAgIGNvbnN0IGN4ID0gdGhpcy5zdHJYICsgKHIuYmVnICsgaSkgKiB0aGlzLmZvbnRTaXplO1xuICAgICAgdGhpcy5jdHguZmlsbFRleHQoYywgY3gsIHkgKyB0aGlzLmZvbnRTaXplICogMC4zLCB0aGlzLmZvbnRTaXplKTtcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jdHgucmVjdChcbiAgICAgICAgY3ggLSB0aGlzLmZvbnRTaXplSGFsZixcbiAgICAgICAgeSAtIHRoaXMuZm9udFNpemVIYWxmLFxuICAgICAgICB0aGlzLmZvbnRTaXplLFxuICAgICAgICB0aGlzLmZvbnRTaXplLFxuICAgICAgKTtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlLlxuICAgKiBAcGFyYW0gciBBIHJhbmdlIHRvIGRyYXcuXG4gICAqIEBwYXJhbSB5IEEgeS1jb29yZGluYXRlIHRvIGRyYXcgYHJgLlxuICAgKi9cbiAgZHJhd1JhbmdlKHI6IFJhbmdlLCB5OiBudW1iZXIpIHtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHIuY29sb3I7XG4gICAgY29uc3QgcnB4ID0ge1xuICAgICAgeF9iZWc6IHRoaXMucmFuZ2VCZWcoci5iZWcpLFxuICAgICAgeF9lbmQ6IHRoaXMucmFuZ2VFbmQoci5lbmQpLFxuICAgICAgeTogeSxcbiAgICAgIHN0eWxlOiByLnN0eWxlLFxuICAgICAgY29sb3I6IHIuY29sb3IsXG4gICAgICBzdHI6IHIuc3RyLFxuICAgIH07XG4gICAgaWYgKHIuc3R5bGUgPT0gXCJzdHJcIikge1xuICAgICAgdGhpcy5kcmF3U3RyKHIsIHkpO1xuICAgIH0gZWxzZSBpZiAoci5zdGVwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgY3VyID0gci5iZWcgKyByLnN0ZXAgLSAxOyBjdXIgPCByLmVuZDsgY3VyICs9IHIuc3RlcCkge1xuICAgICAgICBycHgueF9lbmQgPSB0aGlzLnN0clggKyB0aGlzLmZvbnRTaXplICogY3VyICsgdGhpcy5mb250U2l6ZUhhbGY7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KTtcbiAgICAgICAgcnB4LnhfYmVnID0gcnB4LnhfZW5kO1xuICAgICAgfVxuICAgICAgaWYgKChyLmVuZCAtIHIuYmVnICsgMSkgJSByLnN0ZXAgPT09IDApIHtcbiAgICAgICAgcnB4LnhfZW5kID0gdGhpcy5yYW5nZUVuZChyLmVuZCk7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoZXJlIGlzIGFuIHVuY29tcGxldGUgcmFuZ2UuXG4gICAgICAgIHJweC54X2VuZCA9IHRoaXMuc3RyWCArIHRoaXMuZm9udFNpemUgKiByLmVuZCArIHRoaXMuZm9udFNpemVIYWxmO1xuICAgICAgICBycHguc3R5bGUgPSByLnN0eWxlLnNwbGl0KFwiLFwiKVswXSArIFwiLGxpbmVcIjtcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlcy5cbiAgICogQHBhcmFtIHJhbmdlUm93cyBSYW5nZXMgdG8gZHJhdy5cbiAgICovXG4gIGRyYXdSYW5nZXMocmFuZ2VSb3dzOiBSYW5nZVtdW10pIHtcbiAgICBsZXQgeXB4ID0gdGhpcy5zdHJZO1xuICAgIGZvciAoY29uc3QgcmFuZ2VzIG9mIHJhbmdlUm93cykge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgoLi4ucmFuZ2VzLm1hcCgocikgPT4gdGhpcy5yYW5nZUhlaWdodChyKSkpO1xuICAgICAgZm9yIChjb25zdCByYW5nZSBvZiByYW5nZXMpIHtcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2UocmFuZ2UsIHlweCArIGhlaWdodCAvIDIpO1xuICAgICAgfVxuICAgICAgeXB4ICs9IGhlaWdodDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBhbiBpbnB1dCBzdHJpbmcuXG4gICAqL1xuICBkcmF3SW5wdXRTdHIoaW5wdXRTdHI6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gW1wiaVwiXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0U3RyLmxlbmd0aDsgaSsrKSBpbmRleC5wdXNoKFwiXCIgKyBpKTtcbiAgICBjb25zdCByID0ge1xuICAgICAgc3R5bGU6IFwic3RyXCIsXG4gICAgICBjb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICBiZWc6IC0xLFxuICAgICAgZW5kOiBpbnB1dFN0ci5sZW5ndGggLSAxLFxuICAgICAgc3RyOiBpbmRleCxcbiAgICB9O1xuICAgIHRoaXMuZHJhd1JhbmdlKHIsIHRoaXMuc3RyWSAtIHRoaXMuZm9udFNpemUgLSB0aGlzLmZvbnRTaXplSGFsZik7XG4gICAgY29uc3QgY2hhcnMgPSBbXCJTdHJcIl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dFN0ci5sZW5ndGg7IGkrKylcbiAgICAgIGNoYXJzLnB1c2goaW5wdXRTdHIuc3Vic3RyaW5nKGksIGkgKyAxKSk7XG4gICAgci5zdHIgPSBjaGFycztcbiAgICB0aGlzLmRyYXdSYW5nZShyLCB0aGlzLnN0clkgLSB0aGlzLmZvbnRTaXplSGFsZik7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBhIGdpdmVuIHN0cmluZyBhbmQgcmFuZ2VzLlxuICAgKiBAcGFyYW0gaW5wdXRTdHIgSW5wdXQgc3RyaW5nIHRvIGRyYXcuXG4gICAqIEBwYXJhbSByc3MgVGhlIHJhbmdlcyB0byBkcmF3IHdoaWNoIGFyZSByZWxhdGVkIHRvIGEgZ2l2ZW4gc3RyaW5nIGBpbnB1dFN0cmBcbiAgICovXG4gIGRyYXcoaW5wdXRTdHI6IHN0cmluZywgcnNzOiBSYW5nZVtdW10pIHtcbiAgICBsZXQgcmFuZ2VCb3VuZCA9IFstMSwgaW5wdXRTdHIubGVuZ3RoIC0gMV07XG4gICAgcnNzLmZvckVhY2goKHJzKSA9PlxuICAgICAgcnMuZm9yRWFjaChcbiAgICAgICAgKHIpID0+XG4gICAgICAgICAgKHJhbmdlQm91bmQgPSBbXG4gICAgICAgICAgICBNYXRoLm1pbihyYW5nZUJvdW5kWzBdLCByLmJlZyksXG4gICAgICAgICAgICBNYXRoLm1heChyYW5nZUJvdW5kWzFdLCByLmVuZCksXG4gICAgICAgICAgXSksXG4gICAgICApLFxuICAgICk7XG4gICAgdGhpcy5zdHJYID0gdGhpcy5mb250U2l6ZSArIE1hdGguYWJzKHJhbmdlQm91bmRbMF0pICogdGhpcy5mb250U2l6ZTtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IChyYW5nZUJvdW5kWzFdIC0gcmFuZ2VCb3VuZFswXSArIDIpICogdGhpcy5mb250U2l6ZTtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPVxuICAgICAgdGhpcy5zdHJZICtcbiAgICAgIHRoaXMuZm9udFNpemVIYWxmICtcbiAgICAgIHJzcy5yZWR1Y2UoXG4gICAgICAgIChhY20sIHJzKSA9PiBhY20gKyBNYXRoLm1heCguLi5ycy5tYXAoKHIpID0+IHRoaXMucmFuZ2VIZWlnaHQocikpKSxcbiAgICAgICAgMCxcbiAgICAgICk7XG5cbiAgICAvLyBEUEkgc2V0dGluZ3NcbiAgICBjb25zdCBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIHRoaXMuY2FudmFzLndpZHRoICo9IGRwcjtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgKj0gZHByO1xuICAgIHRoaXMuY3R4LnNjYWxlKGRwciwgZHByKTtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoIC8gZHByICsgXCJweFwiO1xuXG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gZHByICsgXCJweFwiO1xuICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gMztcbiAgICB0aGlzLmN0eC5mb250ID0gdGhpcy5mb250U2l6ZSArIFwicHggXCIgKyB0aGlzLmZvbnRUeXBlO1xuICAgIHRoaXMuZHJhd0lucHV0U3RyKGlucHV0U3RyKTtcbiAgICB0aGlzLmRyYXdSYW5nZXMocnNzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGdyb3VwIHRoYXQgZWFjaCBjb250YWlucyBhIHNpbmdsZSByYW5nZS5cbiAgICogQHBhcmFtIHJhbmdlcyBUaGUgcmFuZ2UgbGlzdC5cbiAgICovXG4gIG1ha2VTaW5nbGVHcm91cHMocmFuZ2VzOiBSYW5nZVtdKTogUmFuZ2VbXVtdIHtcbiAgICByZXR1cm4gcmFuZ2VzLm1hcCgocmFuZ2UpID0+IFtyYW5nZV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZ3JvdXBlZCByYW5nZXMgdGhhdCBlYWNoIGNvbnRhaW5zIG5vbiBvdmVybGFwcGluZyByYW5nZXMuXG4gICAqIEBwYXJhbSBUcyBUaGUgcmFuZ2UgbGlzdC5cbiAgICogQHBhcmFtIHJhbmdlZiBUaGUgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSB0dXBsZSBiZWdpbm5pbmcgaW5kZXggYW5kIGVuZGluZyBpbmRleCBvZiBhIGdpdmVuIHJhbmdlIGBUc1tpXWAuXG4gICAqL1xuICBub25PdmVybGFwT2JqczxUPihUczogVFtdLCByYW5nZWY6IChhcmcwOiBUKSA9PiBudW1iZXJbXSk6IFRbXVtdIHtcbiAgICBpZiAoVHMubGVuZ3RoIDw9IDApIHJldHVybiBbXTtcbiAgICBjb25zdCBlbmRzID0gVHMubWFwKCh0KSA9PiByYW5nZWYodClbMV0pO1xuICAgIGNvbnN0IG4gPSBNYXRoLm1heCguLi5lbmRzKSArIDE7XG4gICAgY29uc3QgdXNlZCA9IG5ldyBBcnJheTxib29sZWFuPihuKTtcbiAgICB1c2VkLmZpbGwoZmFsc2UpO1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGxldCByb3dzOiBUW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHQgb2YgVHMpIHtcbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgb3Igbm90IGEgcmFuZ2UgY2FuIGJlIGluc2VydGVkIHRvIHRoZSBjdXJyZW50IHJvdy5cbiAgICAgIGxldCB1c2VkQW55ID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gcmFuZ2VmKHQpWzBdOyBpIDw9IHJhbmdlZih0KVsxXTsgaSsrKSB7XG4gICAgICAgIHVzZWRBbnkgPSB1c2VkQW55IHx8IHVzZWRbaV07XG4gICAgICB9XG4gICAgICBpZiAodXNlZEFueSkge1xuICAgICAgICByZXMucHVzaChyb3dzKTtcbiAgICAgICAgcm93cyA9IFt0XTtcbiAgICAgICAgdXNlZC5maWxsKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd3MucHVzaCh0KTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSByYW5nZWYodClbMF07IGkgPD0gcmFuZ2VmKHQpWzFdOyBpKyspIHtcbiAgICAgICAgdXNlZFtpXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyb3dzLmxlbmd0aCA+IDApIHJlcy5wdXNoKHJvd3MpO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGdyb3VwZWQgcmFuZ2VzIHRoYXQgZWFjaCBjb250YWlucyBub24gb3ZlcmxhcHBpbmcgcmFuZ2VzLlxuICAgKiBAcGFyYW0gcnMgVGhlIHJhbmdlIGxpc3QuXG4gICAqL1xuICBub25PdmVybGFwUmFuZ2VzKHJzOiBSYW5nZVtdKTogUmFuZ2VbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5ub25PdmVybGFwT2JqczxSYW5nZT4ocnMsIChyKSA9PiBbci5iZWcsIHIuZW5kXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBncm91cGVkIHJhbmdlcyB0aGF0IGVhY2ggY29udGFpbnMgbm9uIG92ZXJsYXBwaW5nIHJhbmdlcy5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKi9cbiAgbm9uT3ZlcmxhcFJhbmdlc1NpbXBsZShyczogUmFuZ2VTaW1wbGVbXSk6IFJhbmdlU2ltcGxlW11bXSB7XG4gICAgcmV0dXJuIHRoaXMubm9uT3ZlcmxhcE9ianM8UmFuZ2VTaW1wbGU+KHJzLCAoeCkgPT4gW3hbMF0sIHhbMV1dKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCB0aGUgc3R5bGUgYHN0eWxlYC5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZUdyb3VwUmFuZ2VzQXV0b0NvbG9yKHJzOiBSYW5nZVNpbXBsZVtdW10sIHN0eWxlOiBzdHJpbmcpOiBSYW5nZVtdW10ge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gXCIjXCIgKyBjb252ZXJ0Lmhzdi5oZXgoWyhpICogMzYwKSAvIHJzLmxlbmd0aCwgODAsIDgwXSk7XG4gICAgICByZXMucHVzaCh0aGlzLm1ha2VSYW5nZXMocnNbaV0sIHN0eWxlLCBjb2xvcikpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmFuZ2UgbGlzdCBgcnNgIHNwZWNpZmllZCB3aXRoIHN0eWxlIGBzdHlsZWAgYW5kIGBjb2xvcmAuXG4gICAqIEBwYXJhbSByYW5nZXMgVGhlIHJhbmdlIGxpc3QuXG4gICAqIEBwYXJhbSBzdHlsZSBUaGUgc3R5bGUgb2YgdGhlIHJhbmdlcyBgcnNgIHRvIGRyYXcuXG4gICAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3Igb2YgdGhlIHJhbmdlcyBgcnNgIHRvIGRyYXcuXG4gICAqL1xuICBtYWtlUmFuZ2VzKHJhbmdlczogUmFuZ2VTaW1wbGVbXSwgc3R5bGU6IHN0cmluZywgY29sb3I6IHN0cmluZyk6IFJhbmdlW10ge1xuICAgIHJldHVybiByYW5nZXMubWFwKChyYW5nZSkgPT4ge1xuICAgICAgY29uc3QgaXNTdHIgPVxuICAgICAgICB0eXBlb2YgcmFuZ2VbMl0gIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHJhbmdlWzJdICE9PSBcIm51bWJlclwiO1xuICAgICAgY29uc3Qgc3RlcCA9IHR5cGVvZiByYW5nZVsyXSA9PT0gXCJudW1iZXJcIiA/IHJhbmdlWzJdIDogdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgc3RyID0gdHlwZW9mIHJhbmdlWzJdICE9PSBcIm51bWJlclwiID8gcmFuZ2VbMl0gOiB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdHlsZTogaXNTdHIgPyBcInN0clwiIDogc3R5bGUsXG4gICAgICAgIGNvbG9yLFxuICAgICAgICBiZWc6IHJhbmdlWzBdLFxuICAgICAgICBlbmQ6IHJhbmdlWzFdLFxuICAgICAgICBzdGVwLFxuICAgICAgICBzdHIsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmFuZ2UgbGlzdCBgcnNgIHNwZWNpZmllZCB3aXRoIHRoZSBzdHlsZSBgc3R5bGVgLlxuICAgKiBAcGFyYW0gcnMgVGhlIHJhbmdlIGxpc3QuXG4gICAqIEBwYXJhbSBzdHlsZSBUaGUgc3R5bGUgb2YgdGhlIHJhbmdlcyBgcnNgIHRvIGRyYXcuXG4gICAqL1xuICBtYWtlUmFuZ2VzQXV0b0NvbG9yKHJzOiBSYW5nZVNpbXBsZVtdLCBzdHlsZTogc3RyaW5nKTogUmFuZ2VbXSB7XG4gICAgcmV0dXJuIHJzLm1hcCgocmFuZ2UsIGkpID0+ICh7XG4gICAgICBzdHlsZSxcbiAgICAgIGNvbG9yOiBcIiNcIiArIGNvbnZlcnQuaHN2LmhleChbKGkgKiAzNjApIC8gcnMubGVuZ3RoLCA4MCwgODBdKSxcbiAgICAgIGJlZzogcmFuZ2VbMF0sXG4gICAgICBlbmQ6IHJhbmdlWzFdLFxuICAgIH0pKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmFuZ2UsIFJhbmdlU2ltcGxlLCBWaXNTdHIgfSBmcm9tIFwiLi92aXNfc3RyXCI7XG5pbXBvcnQgKiBhcyBzdHJsaWIgZnJvbSBcIi4vc3RybGliXCI7XG5cbi8qKiBWaXN1YWxpemF0aW9ucyBwcm9kdWNpbmcgYSBmbGF0LCBub24tb3ZlcmxhcHBpbmcgbGlzdCBvZiByYW5nZXMuICovXG5jb25zdCBTSU1QTEVfVklTVUFMSVpFUlM6IFJlY29yZDxzdHJpbmcsIChzdHI6IHN0cmluZykgPT4gUmFuZ2VTaW1wbGVbXT4gPSB7XG4gIHJ1bnM6IHN0cmxpYi5lbnVtUnVucyxcbiAgcGFsaW5kcm9tZXM6IHN0cmxpYi5lbnVtUGFsaW5kcm9tZXMsXG4gIHNxdWFyZXM6IHN0cmxpYi5lbnVtU3F1YXJlcyxcbiAgcm1vc3RzcXVhcmVzOiBzdHJsaWIuZW51bVJpZ2h0bW9zdFNxdWFyZXMsXG4gIGxtb3N0c3F1YXJlczogc3RybGliLmVudW1MZWZ0bW9zdFNxdWFyZXMsXG59O1xuXG4vKiogVmlzdWFsaXphdGlvbnMgYWxyZWFkeSBwcm9kdWNpbmcgcHJlLWdyb3VwZWQgcmFuZ2VzLiAqL1xuY29uc3QgR1JPVVBfVklTVUFMSVpFUlM6IFJlY29yZDxzdHJpbmcsIChzdHI6IHN0cmluZykgPT4gUmFuZ2VTaW1wbGVbXVtdPiA9IHtcbiAgbHBmOiBzdHJsaWIuZW51bVByZXZPY2NMUEYsXG4gIGxlZnRfbWF4aW1hbDogKHN0cikgPT4gc3RybGliLmVudW1JZkdyb3VwKHN0ciwgc3RybGliLmlzTGVmdE1heGltYWwpLFxuICByaWdodF9tYXhpbWFsOiAoc3RyKSA9PiBzdHJsaWIuZW51bUlmR3JvdXAoc3RyLCBzdHJsaWIuaXNSaWdodE1heGltYWwpLFxuICBtYXhfcmVwZWF0OiAoc3RyKSA9PiBzdHJsaWIuZW51bUlmR3JvdXAoc3RyLCBzdHJsaWIuaXNNYXhSZXBlYXQpLFxuICBsejc3OiBzdHJsaWIubHo3NyxcbiAgbHo3ODogc3RybGliLmx6NzgsXG4gIGx5bmRvbl9mYWN0b3JpemF0aW9uOiBzdHJsaWIubHluZG9uRmFjdG9yaXphdGlvbixcbiAgbHluZG9uX2FycmF5OiBzdHJsaWIubHluZG9uQXJyYXksXG4gIGVudW1fbHluZG9uOiBzdHJsaWIuZW51bUx5bmRvbixcbiAgcHJldl9zbWFsbGVyX3N1ZmZpeDogc3RybGliLnByZXZTbWFsbGVyU3VmZml4ZXMsXG4gIG5leHRfc21hbGxlcl9zdWZmaXg6IHN0cmxpYi5uZXh0U21hbGxlclN1ZmZpeGVzLFxufTtcblxuY29uc3QgcmFkaW9WYWx1ZSA9IChzZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IHJlcyA9IFwiXCI7XG4gIGNvbnN0IGVsbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KHNlbGVjdG9yKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbG1zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVsbXNbaV0uY2hlY2tlZCkgcmVzID0gZWxtc1tpXS52YWx1ZTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuY29uc3QgZHJhdyA9IChfZTogRXZlbnQpID0+IHtcbiAgLy8gZ2V0IGZvbnQgc2l6ZVxuICBjb25zdCBmb250U2l6ZSA9IHBhcnNlSW50KHJhZGlvVmFsdWUoXCJbbmFtZT1mb250X3NpemVdXCIpKTtcbiAgLy8gZ2V0IGxpbmUgc3R5bGVcbiAgbGV0IHJhbmdlU3R5bGUgPSByYWRpb1ZhbHVlKFwiW25hbWU9bGluZV9zdHlsZV1cIik7XG4gIGNvbnN0IGxpbmVTdHlsZVJpZ2h0ID0gcmFkaW9WYWx1ZShcIltuYW1lPWxpbmVfc3R5bGVfcmlnaHRdXCIpO1xuXG4gIHJhbmdlU3R5bGUgKz0gbGluZVN0eWxlUmlnaHQubGVuZ3RoID09PSAwID8gXCJcIiA6IFwiLFwiICsgbGluZVN0eWxlUmlnaHQ7XG4gIGNvbnN0IHZpc3VhbGl6ZSA9IHJhZGlvVmFsdWUoXCJbbmFtZT12aXN1YWxpemVdXCIpO1xuXG4gIC8vIGdldCBpbnB1dCBzdHJpbmdcbiAgY29uc3QgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dF9zdHJcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3QgaW5wdXRTdHIgPSBlbG0udmFsdWU7XG5cbiAgLy8gZ2V0IGNhbnZhc1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgLy8gY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSA1MFxuICBjb25zdCB2aXNTdHIgPSBuZXcgVmlzU3RyKGNhbnZhcywgZm9udFNpemUpO1xuXG4gIC8vIGNvbXB1dGUgcmFuZ2VzXG4gIGxldCByYW5nZXNHcm91cDogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gIGxldCByYW5nZXM6IFJhbmdlW11bXSA9IFtdO1xuXG4gIGNvbnN0IHNob3dFZmZlY3RpdmVBbHBoYWJldCA9IChcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVmZmVjdGl2ZV9hbHBoYWJldFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICkuY2hlY2tlZDtcbiAgY29uc3Qgc2hvd1JhbmtBcnJheSA9IChcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmtfYXJyYXlcIikgYXMgSFRNTElucHV0RWxlbWVudFxuICApLmNoZWNrZWQ7XG5cbiAgaWYgKHNob3dFZmZlY3RpdmVBbHBoYWJldCkge1xuICAgIHJhbmdlc0dyb3VwLnB1c2goW1xuICAgICAgW1xuICAgICAgICAtMSxcbiAgICAgICAgaW5wdXRTdHIubGVuZ3RoIC0gMSxcbiAgICAgICAgW1wiZVN0clwiLCAuLi5zdHJsaWIucmVwbGFjZUVmZmVjdGl2ZUFscGhhYmV0KGlucHV0U3RyKV0sXG4gICAgICBdLFxuICAgIF0gYXMgUmFuZ2VTaW1wbGVbXSk7XG4gIH1cbiAgaWYgKHNob3dSYW5rQXJyYXkpIHtcbiAgICByYW5nZXNHcm91cC5wdXNoKFtcbiAgICAgIFstMSwgaW5wdXRTdHIubGVuZ3RoIC0gMSwgW1wicmFua1wiLCAuLi5zdHJsaWIucmFua0FycmF5KGlucHV0U3RyKV1dLFxuICAgIF0gYXMgUmFuZ2VTaW1wbGVbXSk7XG4gIH1cblxuICBpZiAodmlzdWFsaXplIGluIFNJTVBMRV9WSVNVQUxJWkVSUykge1xuICAgIGNvbnN0IHJhbmdlc3AgPSBTSU1QTEVfVklTVUFMSVpFUlNbdmlzdWFsaXplXShpbnB1dFN0cik7XG4gICAgcmFuZ2VzR3JvdXAgPSByYW5nZXNHcm91cC5jb25jYXQodmlzU3RyLm5vbk92ZXJsYXBSYW5nZXNTaW1wbGUocmFuZ2VzcCkpO1xuICAgIHJhbmdlcyA9IHZpc1N0ci5tYWtlR3JvdXBSYW5nZXNBdXRvQ29sb3IocmFuZ2VzR3JvdXAsIHJhbmdlU3R5bGUpO1xuICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSBpbiBHUk9VUF9WSVNVQUxJWkVSUykge1xuICAgIHJhbmdlc0dyb3VwID0gcmFuZ2VzR3JvdXAuY29uY2F0KEdST1VQX1ZJU1VBTElaRVJTW3Zpc3VhbGl6ZV0oaW5wdXRTdHIpKTtcbiAgICByYW5nZXMgPSB2aXNTdHIubWFrZUdyb3VwUmFuZ2VzQXV0b0NvbG9yKHJhbmdlc0dyb3VwLCByYW5nZVN0eWxlKTtcbiAgICByYW5nZXMgPSBzdHJsaWIuZmxhdChyYW5nZXMubWFwKCh4KSA9PiB2aXNTdHIubm9uT3ZlcmxhcFJhbmdlcyh4KSkpO1xuICB9XG5cbiAgdmlzU3RyLmRyYXcoaW5wdXRTdHIsIHJhbmdlcyk7XG59O1xuXG5jb25zdCBzZWxlY3RvckFkZEV2ZW50ID0gKFxuICBzZWxlY3Rvcjogc3RyaW5nLFxuICBldmVudDogc3RyaW5nLFxuICBmdW5jOiBFdmVudExpc3RlbmVyLFxuKSA9PiB7XG4gIGNvbnN0IGVsbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KHNlbGVjdG9yKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbG1zLmxlbmd0aDsgaSsrKSB7XG4gICAgZWxtc1tpXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jKTtcbiAgfVxufTtcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgY29uc3QgaW5wdXRTdHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0X3N0clwiKSBhcyBIVE1MRWxlbWVudDtcbiAgaW5wdXRTdHIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGRyYXcpO1xuICBpbnB1dFN0ci5hZGRFdmVudExpc3RlbmVyKFwicHJvcGVydHljaGFuZ2VcIiwgZHJhdyk7XG5cbiAgLy8gYWRkIGV2ZW50IGZvciByYWRpbyBidXR0b25zXG4gIHNlbGVjdG9yQWRkRXZlbnQoXCJbbmFtZT1mb250X3NpemVdXCIsIFwiY2xpY2tcIiwgZHJhdyk7XG4gIHNlbGVjdG9yQWRkRXZlbnQoXCJbbmFtZT1saW5lX3N0eWxlXVwiLCBcImNsaWNrXCIsIGRyYXcpO1xuICBzZWxlY3RvckFkZEV2ZW50KFwiW25hbWU9bGluZV9zdHlsZV9yaWdodF1cIiwgXCJjbGlja1wiLCBkcmF3KTtcbiAgc2VsZWN0b3JBZGRFdmVudChcIltuYW1lPXZpc3VhbGl6ZV1cIiwgXCJjbGlja1wiLCBkcmF3KTtcbiAgc2VsZWN0b3JBZGRFdmVudChcIlt0eXBlPWNoZWNrYm94XVwiLCBcImNsaWNrXCIsIGRyYXcpO1xuXG4gIC8vIGRyYXcgaW5pdGlhbGx5LlxuICBpbnB1dFN0ci5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudChcInByb3BlcnR5Y2hhbmdlXCIsIHsgZGV0YWlsOiBcImluaXQgZXZlbnRcIiB9KSxcbiAgKTtcbn07XG5cbm1haW4oKTtcbiIsIi8qIE1JVCBsaWNlbnNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1taXhlZC1vcGVyYXRvcnMgKi9cbmltcG9ydCBjc3NLZXl3b3JkcyBmcm9tICdjb2xvci1uYW1lJztcblxuLy8gTk9URTogY29udmVyc2lvbnMgc2hvdWxkIG9ubHkgcmV0dXJuIHByaW1pdGl2ZSB2YWx1ZXMgKGkuZS4gYXJyYXlzLCBvclxuLy8gICAgICAgdmFsdWVzIHRoYXQgZ2l2ZSBjb3JyZWN0IGB0eXBlb2ZgIHJlc3VsdHMpLlxuLy8gICAgICAgZG8gbm90IHVzZSBib3ggdmFsdWVzIHR5cGVzIChpLmUuIE51bWJlcigpLCBTdHJpbmcoKSwgZXRjLilcblxuY29uc3QgcmV2ZXJzZUtleXdvcmRzID0ge307XG5mb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjc3NLZXl3b3JkcykpIHtcblx0cmV2ZXJzZUtleXdvcmRzW2Nzc0tleXdvcmRzW2tleV1dID0ga2V5O1xufVxuXG5jb25zdCBjb252ZXJ0ID0ge1xuXHRyZ2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAncmdiJ30sXG5cdGhzbDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdoc2wnfSxcblx0aHN2OiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzdid9LFxuXHRod2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHdiJ30sXG5cdGNteWs6IHtjaGFubmVsczogNCwgbGFiZWxzOiAnY215ayd9LFxuXHR4eXo6IHtjaGFubmVsczogMywgbGFiZWxzOiAneHl6J30sXG5cdGxhYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsYWInfSxcblx0b2tsYWI6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ29rbCcsICdva2EnLCAnb2tiJ119LFxuXHRsY2g6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGNoJ30sXG5cdG9rbGNoOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydva2wnLCAnb2tjJywgJ29raCddfSxcblx0aGV4OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydoZXgnXX0sXG5cdGtleXdvcmQ6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2tleXdvcmQnXX0sXG5cdGFuc2kxNjoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTE2J119LFxuXHRhbnNpMjU2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMjU2J119LFxuXHRoY2c6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ2gnLCAnYycsICdnJ119LFxuXHRhcHBsZToge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsncjE2JywgJ2cxNicsICdiMTYnXX0sXG5cdGdyYXk6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2dyYXknXX0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0O1xuXG4vLyBMQUIgZih0KSBjb25zdGFudFxuY29uc3QgTEFCX0ZUID0gKDYgLyAyOSkgKiogMztcblxuLy8gU1JHQiBub24tbGluZWFyIHRyYW5zZm9ybSBmdW5jdGlvbnNcbmZ1bmN0aW9uIHNyZ2JOb25saW5lYXJUcmFuc2Zvcm0oYykge1xuXHRjb25zdCBjYyA9IGMgPiAwLjAwM18xMzBfOFxuXHRcdD8gKCgxLjA1NSAqIChjICoqICgxIC8gMi40KSkpIC0gMC4wNTUpXG5cdFx0OiBjICogMTIuOTI7XG5cdHJldHVybiBNYXRoLm1pbihNYXRoLm1heCgwLCBjYyksIDEpO1xufVxuXG5mdW5jdGlvbiBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KGMpIHtcblx0cmV0dXJuIGMgPiAwLjA0MF80NSA/ICgoKGMgKyAwLjA1NSkgLyAxLjA1NSkgKiogMi40KSA6IChjIC8gMTIuOTIpO1xufVxuXG4vLyBIaWRlIC5jaGFubmVscyBhbmQgLmxhYmVscyBwcm9wZXJ0aWVzXG5mb3IgKGNvbnN0IG1vZGVsIG9mIE9iamVjdC5rZXlzKGNvbnZlcnQpKSB7XG5cdGlmICghKCdjaGFubmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHR9XG5cblx0aWYgKCEoJ2xhYmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWwgbGFiZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHR9XG5cblx0aWYgKGNvbnZlcnRbbW9kZWxdLmxhYmVscy5sZW5ndGggIT09IGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjaGFubmVsIGFuZCBsYWJlbCBjb3VudHMgbWlzbWF0Y2g6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHRjb25zdCB7Y2hhbm5lbHMsIGxhYmVsc30gPSBjb252ZXJ0W21vZGVsXTtcblx0ZGVsZXRlIGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzO1xuXHRkZWxldGUgY29udmVydFttb2RlbF0ubGFiZWxzO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY2hhbm5lbHN9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbbW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBsYWJlbHN9KTtcbn1cblxuY29udmVydC5yZ2IuaHNsID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXHRjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcblx0Y29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG5cdGNvbnN0IGRlbHRhID0gbWF4IC0gbWluO1xuXHRsZXQgaDtcblx0bGV0IHM7XG5cblx0c3dpdGNoIChtYXgpIHtcblx0XHRjYXNlIG1pbjoge1xuXHRcdFx0aCA9IDA7XG5cblx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGNhc2Ugcjoge1xuXHRcdFx0aCA9IChnIC0gYikgLyBkZWx0YTtcblxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSBnOiB7XG5cdFx0XHRoID0gMiArIChiIC0gcikgLyBkZWx0YTtcblxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSBiOiB7XG5cdFx0XHRoID0gNCArIChyIC0gZykgLyBkZWx0YTtcblxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHQvLyBObyBkZWZhdWx0XG5cdH1cblxuXHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0Y29uc3QgbCA9IChtaW4gKyBtYXgpIC8gMjtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRzID0gMDtcblx0fSBlbHNlIGlmIChsIDw9IDAuNSkge1xuXHRcdHMgPSBkZWx0YSAvIChtYXggKyBtaW4pO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBkZWx0YSAvICgyIC0gbWF4IC0gbWluKTtcblx0fVxuXG5cdHJldHVybiBbaCwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5oc3YgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGxldCByZGlmO1xuXHRsZXQgZ2RpZjtcblx0bGV0IGJkaWY7XG5cdGxldCBoO1xuXHRsZXQgcztcblxuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXHRjb25zdCB2ID0gTWF0aC5tYXgociwgZywgYik7XG5cdGNvbnN0IGRpZmYgPSB2IC0gTWF0aC5taW4ociwgZywgYik7XG5cdGNvbnN0IGRpZmZjID0gZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gKHYgLSBjKSAvIDYgLyBkaWZmICsgMSAvIDI7XG5cdH07XG5cblx0aWYgKGRpZmYgPT09IDApIHtcblx0XHRoID0gMDtcblx0XHRzID0gMDtcblx0fSBlbHNlIHtcblx0XHRzID0gZGlmZiAvIHY7XG5cdFx0cmRpZiA9IGRpZmZjKHIpO1xuXHRcdGdkaWYgPSBkaWZmYyhnKTtcblx0XHRiZGlmID0gZGlmZmMoYik7XG5cblx0XHRzd2l0Y2ggKHYpIHtcblx0XHRcdGNhc2Ugcjoge1xuXHRcdFx0XHRoID0gYmRpZiAtIGdkaWY7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGNhc2UgZzoge1xuXHRcdFx0XHRoID0gKDEgLyAzKSArIHJkaWYgLSBiZGlmO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRjYXNlIGI6IHtcblx0XHRcdFx0aCA9ICgyIC8gMykgKyBnZGlmIC0gcmRpZjtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHQvLyBObyBkZWZhdWx0XG5cdFx0fVxuXG5cdFx0aWYgKGggPCAwKSB7XG5cdFx0XHRoICs9IDE7XG5cdFx0fSBlbHNlIGlmIChoID4gMSkge1xuXHRcdFx0aCAtPSAxO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBbXG5cdFx0aCAqIDM2MCxcblx0XHRzICogMTAwLFxuXHRcdHYgKiAxMDAsXG5cdF07XG59O1xuXG5jb252ZXJ0LnJnYi5od2IgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF07XG5cdGNvbnN0IGcgPSByZ2JbMV07XG5cdGxldCBiID0gcmdiWzJdO1xuXHRjb25zdCBoID0gY29udmVydC5yZ2IuaHNsKHJnYilbMF07XG5cdGNvbnN0IHcgPSAxIC8gMjU1ICogTWF0aC5taW4ociwgTWF0aC5taW4oZywgYikpO1xuXG5cdGIgPSAxIC0gMSAvIDI1NSAqIE1hdGgubWF4KHIsIE1hdGgubWF4KGcsIGIpKTtcblxuXHRyZXR1cm4gW2gsIHcgKiAxMDAsIGIgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2Iub2tsYWIgPSBmdW5jdGlvbiAocmdiKSB7XG5cdC8vIEFzc3VtZSBzUkdCXG5cdGNvbnN0IHIgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KHJnYlswXSAvIDI1NSk7XG5cdGNvbnN0IGcgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KHJnYlsxXSAvIDI1NSk7XG5cdGNvbnN0IGIgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KHJnYlsyXSAvIDI1NSk7XG5cblx0Y29uc3QgbHAgPSBNYXRoLmNicnQoMC40MTJfMjIxXzQ3MF84ICogciArIDAuNTM2XzMzMl81MzZfMyAqIGcgKyAwLjA1MV80NDVfOTkyXzkgKiBiKTtcblx0Y29uc3QgbXAgPSBNYXRoLmNicnQoMC4yMTFfOTAzXzQ5OF8yICogciArIDAuNjgwXzY5OV81NDVfMSAqIGcgKyAwLjEwN18zOTZfOTU2XzYgKiBiKTtcblx0Y29uc3Qgc3AgPSBNYXRoLmNicnQoMC4wODhfMzAyXzQ2MV85ICogciArIDAuMjgxXzcxOF84MzdfNiAqIGcgKyAwLjYyOV85NzhfNzAwXzUgKiBiKTtcblxuXHRjb25zdCBsID0gMC4yMTBfNDU0XzI1NV8zICogbHAgKyAwLjc5M182MTdfNzg1ICogbXAgLSAwLjAwNF8wNzJfMDQ2XzggKiBzcDtcblx0Y29uc3QgYWEgPSAxLjk3N185OThfNDk1XzEgKiBscCAtIDIuNDI4XzU5Ml8yMDUgKiBtcCArIDAuNDUwXzU5M183MDlfOSAqIHNwO1xuXHRjb25zdCBiYiA9IDAuMDI1XzkwNF8wMzdfMSAqIGxwICsgMC43ODJfNzcxXzc2Nl8yICogbXAgLSAwLjgwOF82NzVfNzY2ICogc3A7XG5cblx0cmV0dXJuIFtsICogMTAwLCBhYSAqIDEwMCwgYmIgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuY215ayA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblxuXHRjb25zdCBrID0gTWF0aC5taW4oMSAtIHIsIDEgLSBnLCAxIC0gYik7XG5cdGNvbnN0IGMgPSAoMSAtIHIgLSBrKSAvICgxIC0gaykgfHwgMDtcblx0Y29uc3QgbSA9ICgxIC0gZyAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHRjb25zdCB5ID0gKDEgLSBiIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cblx0cmV0dXJuIFtjICogMTAwLCBtICogMTAwLCB5ICogMTAwLCBrICogMTAwXTtcbn07XG5cbmZ1bmN0aW9uIGNvbXBhcmF0aXZlRGlzdGFuY2UoeCwgeSkge1xuXHQvKlxuXHRcdFNlZSBodHRwczovL2VuLm0ud2lraXBlZGlhLm9yZy93aWtpL0V1Y2xpZGVhbl9kaXN0YW5jZSNTcXVhcmVkX0V1Y2xpZGVhbl9kaXN0YW5jZVxuXHQqL1xuXHRyZXR1cm4gKFxuXHRcdCgoeFswXSAtIHlbMF0pICoqIDIpICtcblx0XHQoKHhbMV0gLSB5WzFdKSAqKiAyKSArXG5cdFx0KCh4WzJdIC0geVsyXSkgKiogMilcblx0KTtcbn1cblxuY29udmVydC5yZ2Iua2V5d29yZCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgcmV2ZXJzZWQgPSByZXZlcnNlS2V5d29yZHNbcmdiXTtcblx0aWYgKHJldmVyc2VkKSB7XG5cdFx0cmV0dXJuIHJldmVyc2VkO1xuXHR9XG5cblx0bGV0IGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cdGxldCBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG5cblx0Zm9yIChjb25zdCBrZXl3b3JkIG9mIE9iamVjdC5rZXlzKGNzc0tleXdvcmRzKSkge1xuXHRcdGNvbnN0IHZhbHVlID0gY3NzS2V5d29yZHNba2V5d29yZF07XG5cblx0XHQvLyBDb21wdXRlIGNvbXBhcmF0aXZlIGRpc3RhbmNlXG5cdFx0Y29uc3QgZGlzdGFuY2UgPSBjb21wYXJhdGl2ZURpc3RhbmNlKHJnYiwgdmFsdWUpO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgaXRzIGxlc3MsIGlmIHNvIHNldCBhcyBjbG9zZXN0XG5cdFx0aWYgKGRpc3RhbmNlIDwgY3VycmVudENsb3Nlc3REaXN0YW5jZSkge1xuXHRcdFx0Y3VycmVudENsb3Nlc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuXHRcdFx0Y3VycmVudENsb3Nlc3RLZXl3b3JkID0ga2V5d29yZDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3VycmVudENsb3Nlc3RLZXl3b3JkO1xufTtcblxuY29udmVydC5rZXl3b3JkLnJnYiA9IGZ1bmN0aW9uIChrZXl3b3JkKSB7XG5cdHJldHVybiBbLi4uY3NzS2V5d29yZHNba2V5d29yZF1dO1xufTtcblxuY29udmVydC5yZ2IueHl6ID0gZnVuY3Rpb24gKHJnYikge1xuXHQvLyBBc3N1bWUgc1JHQlxuXHRjb25zdCByID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybUludihyZ2JbMF0gLyAyNTUpO1xuXHRjb25zdCBnID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybUludihyZ2JbMV0gLyAyNTUpO1xuXHRjb25zdCBiID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybUludihyZ2JbMl0gLyAyNTUpO1xuXG5cdGNvbnN0IHggPSAociAqIDAuNDEyXzQ1Nl80KSArIChnICogMC4zNTdfNTc2XzEpICsgKGIgKiAwLjE4MF80MzdfNSk7XG5cdGNvbnN0IHkgPSAociAqIDAuMjEyXzY3Ml85KSArIChnICogMC43MTVfMTUyXzIpICsgKGIgKiAwLjA3Ml8xNzUpO1xuXHRjb25zdCB6ID0gKHIgKiAwLjAxOV8zMzNfOSkgKyAoZyAqIDAuMTE5XzE5MikgKyAoYiAqIDAuOTUwXzMwNF8xKTtcblxuXHRyZXR1cm4gW3ggKiAxMDAsIHkgKiAxMDAsIHogKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IubGFiID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCB4eXogPSBjb252ZXJ0LnJnYi54eXoocmdiKTtcblx0bGV0IHggPSB4eXpbMF07XG5cdGxldCB5ID0geHl6WzFdO1xuXHRsZXQgeiA9IHh5elsyXTtcblxuXHR4IC89IDk1LjA0Nztcblx0eSAvPSAxMDA7XG5cdHogLz0gMTA4Ljg4MztcblxuXHR4ID0geCA+IExBQl9GVCA/ICh4ICoqICgxIC8gMykpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuXHR5ID0geSA+IExBQl9GVCA/ICh5ICoqICgxIC8gMykpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IExBQl9GVCA/ICh6ICoqICgxIC8gMykpIDogKDcuNzg3ICogeikgKyAoMTYgLyAxMTYpO1xuXG5cdGNvbnN0IGwgPSAoMTE2ICogeSkgLSAxNjtcblx0Y29uc3QgYSA9IDUwMCAqICh4IC0geSk7XG5cdGNvbnN0IGIgPSAyMDAgKiAoeSAtIHopO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LmhzbC5yZ2IgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IGggPSBoc2xbMF0gLyAzNjA7XG5cdGNvbnN0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGNvbnN0IGwgPSBoc2xbMl0gLyAxMDA7XG5cdGxldCB0Mztcblx0bGV0IHZhbHVlO1xuXG5cdGlmIChzID09PSAwKSB7XG5cdFx0dmFsdWUgPSBsICogMjU1O1xuXHRcdHJldHVybiBbdmFsdWUsIHZhbHVlLCB2YWx1ZV07XG5cdH1cblxuXHRjb25zdCB0MiA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG5cblx0Y29uc3QgdDEgPSAyICogbCAtIHQyO1xuXG5cdGNvbnN0IHJnYiA9IFswLCAwLCAwXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHR0MyA9IGggKyAxIC8gMyAqIC0oaSAtIDEpO1xuXHRcdGlmICh0MyA8IDApIHtcblx0XHRcdHQzKys7XG5cdFx0fVxuXG5cdFx0aWYgKHQzID4gMSkge1xuXHRcdFx0dDMtLTtcblx0XHR9XG5cblx0XHRpZiAoNiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsdWUgPSB0MSArICh0MiAtIHQxKSAqIDYgKiB0Mztcblx0XHR9IGVsc2UgaWYgKDIgKiB0MyA8IDEpIHtcblx0XHRcdHZhbHVlID0gdDI7XG5cdFx0fSBlbHNlIGlmICgzICogdDMgPCAyKSB7XG5cdFx0XHR2YWx1ZSA9IHQxICsgKHQyIC0gdDEpICogKDIgLyAzIC0gdDMpICogNjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWUgPSB0MTtcblx0XHR9XG5cblx0XHRyZ2JbaV0gPSB2YWx1ZSAqIDI1NTtcblx0fVxuXG5cdHJldHVybiByZ2I7XG59O1xuXG5jb252ZXJ0LmhzbC5oc3YgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IGggPSBoc2xbMF07XG5cdGxldCBzID0gaHNsWzFdIC8gMTAwO1xuXHRsZXQgbCA9IGhzbFsyXSAvIDEwMDtcblx0bGV0IHNtaW4gPSBzO1xuXHRjb25zdCBsbWluID0gTWF0aC5tYXgobCwgMC4wMSk7XG5cblx0bCAqPSAyO1xuXHRzICo9IChsIDw9IDEpID8gbCA6IDIgLSBsO1xuXHRzbWluICo9IGxtaW4gPD0gMSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0Y29uc3QgdiA9IChsICsgcykgLyAyO1xuXHRjb25zdCBzdiA9IGwgPT09IDAgPyAoMiAqIHNtaW4pIC8gKGxtaW4gKyBzbWluKSA6ICgyICogcykgLyAobCArIHMpO1xuXG5cdHJldHVybiBbaCwgc3YgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YucmdiID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBoID0gaHN2WzBdIC8gNjA7XG5cdGNvbnN0IHMgPSBoc3ZbMV0gLyAxMDA7XG5cdGxldCB2ID0gaHN2WzJdIC8gMTAwO1xuXHRjb25zdCBoaSA9IE1hdGguZmxvb3IoaCkgJSA2O1xuXG5cdGNvbnN0IGYgPSBoIC0gTWF0aC5mbG9vcihoKTtcblx0Y29uc3QgcCA9IDI1NSAqIHYgKiAoMSAtIHMpO1xuXHRjb25zdCBxID0gMjU1ICogdiAqICgxIC0gKHMgKiBmKSk7XG5cdGNvbnN0IHQgPSAyNTUgKiB2ICogKDEgLSAocyAqICgxIC0gZikpKTtcblx0diAqPSAyNTU7XG5cblx0c3dpdGNoIChoaSkge1xuXHRcdGNhc2UgMDoge1xuXHRcdFx0cmV0dXJuIFt2LCB0LCBwXTtcblx0XHR9XG5cblx0XHRjYXNlIDE6IHtcblx0XHRcdHJldHVybiBbcSwgdiwgcF07XG5cdFx0fVxuXG5cdFx0Y2FzZSAyOiB7XG5cdFx0XHRyZXR1cm4gW3AsIHYsIHRdO1xuXHRcdH1cblxuXHRcdGNhc2UgMzoge1xuXHRcdFx0cmV0dXJuIFtwLCBxLCB2XTtcblx0XHR9XG5cblx0XHRjYXNlIDQ6IHtcblx0XHRcdHJldHVybiBbdCwgcCwgdl07XG5cdFx0fVxuXG5cdFx0Y2FzZSA1OiB7XG5cdFx0XHRyZXR1cm4gW3YsIHAsIHFdO1xuXHRcdH1cblx0fVxufTtcblxuY29udmVydC5oc3YuaHNsID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBoID0gaHN2WzBdO1xuXHRjb25zdCBzID0gaHN2WzFdIC8gMTAwO1xuXHRjb25zdCB2ID0gaHN2WzJdIC8gMTAwO1xuXHRjb25zdCB2bWluID0gTWF0aC5tYXgodiwgMC4wMSk7XG5cdGxldCBzbDtcblx0bGV0IGw7XG5cblx0bCA9ICgyIC0gcykgKiB2O1xuXHRjb25zdCBsbWluID0gKDIgLSBzKSAqIHZtaW47XG5cdHNsID0gcyAqIHZtaW47XG5cdHNsIC89IChsbWluIDw9IDEpID8gbG1pbiA6IDIgLSBsbWluO1xuXHRzbCA9IHNsIHx8IDA7XG5cdGwgLz0gMjtcblxuXHRyZXR1cm4gW2gsIHNsICogMTAwLCBsICogMTAwXTtcbn07XG5cbi8vIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy1jb2xvci8jaHdiLXRvLXJnYlxuY29udmVydC5od2IucmdiID0gZnVuY3Rpb24gKGh3Yikge1xuXHRjb25zdCBoID0gaHdiWzBdIC8gMzYwO1xuXHRsZXQgd2ggPSBod2JbMV0gLyAxMDA7XG5cdGxldCBibCA9IGh3YlsyXSAvIDEwMDtcblx0Y29uc3QgcmF0aW8gPSB3aCArIGJsO1xuXHRsZXQgZjtcblxuXHQvLyBXaCArIGJsIGNhbnQgYmUgPiAxXG5cdGlmIChyYXRpbyA+IDEpIHtcblx0XHR3aCAvPSByYXRpbztcblx0XHRibCAvPSByYXRpbztcblx0fVxuXG5cdGNvbnN0IGkgPSBNYXRoLmZsb29yKDYgKiBoKTtcblx0Y29uc3QgdiA9IDEgLSBibDtcblx0ZiA9IDYgKiBoIC0gaTtcblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRpZiAoKGkgJiAweDAxKSAhPT0gMCkge1xuXHRcdGYgPSAxIC0gZjtcblx0fVxuXG5cdGNvbnN0IG4gPSB3aCArIGYgKiAodiAtIHdoKTsgLy8gTGluZWFyIGludGVycG9sYXRpb25cblxuXHRsZXQgcjtcblx0bGV0IGc7XG5cdGxldCBiO1xuXHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSxuby1tdWx0aS1zcGFjZXMsIGRlZmF1bHQtY2FzZS1sYXN0ICovXG5cdHN3aXRjaCAoaSkge1xuXHRcdGRlZmF1bHQ6XG5cdFx0Y2FzZSA2OlxuXHRcdGNhc2UgMDogeyByID0gdjsgIGcgPSBuOyAgYiA9IHdoOyBicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIDE6IHsgciA9IG47ICBnID0gdjsgIGIgPSB3aDsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSAyOiB7IHIgPSB3aDsgZyA9IHY7ICBiID0gbjsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSAzOiB7IHIgPSB3aDsgZyA9IG47ICBiID0gdjsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSA0OiB7IHIgPSBuOyAgZyA9IHdoOyBiID0gdjsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSA1OiB7IHIgPSB2OyAgZyA9IHdoOyBiID0gbjsgYnJlYWs7XG5cdFx0fVxuXHR9XG5cdC8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMtcGVyLWxpbmUsbm8tbXVsdGktc3BhY2VzLCBkZWZhdWx0LWNhc2UtbGFzdCAqL1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0LmNteWsucmdiID0gZnVuY3Rpb24gKGNteWspIHtcblx0Y29uc3QgYyA9IGNteWtbMF0gLyAxMDA7XG5cdGNvbnN0IG0gPSBjbXlrWzFdIC8gMTAwO1xuXHRjb25zdCB5ID0gY215a1syXSAvIDEwMDtcblx0Y29uc3QgayA9IGNteWtbM10gLyAxMDA7XG5cblx0Y29uc3QgciA9IDEgLSBNYXRoLm1pbigxLCBjICogKDEgLSBrKSArIGspO1xuXHRjb25zdCBnID0gMSAtIE1hdGgubWluKDEsIG0gKiAoMSAtIGspICsgayk7XG5cdGNvbnN0IGIgPSAxIC0gTWF0aC5taW4oMSwgeSAqICgxIC0gaykgKyBrKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoucmdiID0gZnVuY3Rpb24gKHh5eikge1xuXHRjb25zdCB4ID0geHl6WzBdIC8gMTAwO1xuXHRjb25zdCB5ID0geHl6WzFdIC8gMTAwO1xuXHRjb25zdCB6ID0geHl6WzJdIC8gMTAwO1xuXHRsZXQgcjtcblx0bGV0IGc7XG5cdGxldCBiO1xuXG5cdHIgPSAoeCAqIDMuMjQwXzQ1NF8yKSArICh5ICogLTEuNTM3XzEzOF81KSArICh6ICogLTAuNDk4XzUzMV80KTtcblx0ZyA9ICh4ICogLTAuOTY5XzI2NikgKyAoeSAqIDEuODc2XzAxMF84KSArICh6ICogMC4wNDFfNTU2KTtcblx0YiA9ICh4ICogMC4wNTVfNjQzXzQpICsgKHkgKiAtMC4yMDRfMDI1XzkpICsgKHogKiAxLjA1N18yMjVfMik7XG5cblx0Ly8gQXNzdW1lIHNSR0Jcblx0ciA9IHNyZ2JOb25saW5lYXJUcmFuc2Zvcm0ocik7XG5cdGcgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtKGcpO1xuXHRiID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybShiKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoubGFiID0gZnVuY3Rpb24gKHh5eikge1xuXHRsZXQgeCA9IHh5elswXTtcblx0bGV0IHkgPSB4eXpbMV07XG5cdGxldCB6ID0geHl6WzJdO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gTEFCX0ZUID8gKHggKiogKDEgLyAzKSkgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gTEFCX0ZUID8gKHkgKiogKDEgLyAzKSkgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gTEFCX0ZUID8gKHogKiogKDEgLyAzKSkgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0Y29uc3QgbCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRjb25zdCBhID0gNTAwICogKHggLSB5KTtcblx0Y29uc3QgYiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQueHl6Lm9rbGFiID0gZnVuY3Rpb24gKHh5eikge1xuXHRjb25zdCB4ID0geHl6WzBdIC8gMTAwO1xuXHRjb25zdCB5ID0geHl6WzFdIC8gMTAwO1xuXHRjb25zdCB6ID0geHl6WzJdIC8gMTAwO1xuXG5cdGNvbnN0IGxwID0gTWF0aC5jYnJ0KDAuODE4XzkzM18wMTBfMSAqIHggKyAwLjM2MV84NjZfNzQyXzQgKiB5IC0gMC4xMjhfODU5XzcxM183ICogeik7XG5cdGNvbnN0IG1wID0gTWF0aC5jYnJ0KDAuMDMyXzk4NF81NDNfNiAqIHggKyAwLjkyOV8zMTFfODcxXzUgKiB5ICsgMC4wMzZfMTQ1XzYzOF83ICogeik7XG5cdGNvbnN0IHNwID0gTWF0aC5jYnJ0KDAuMDQ4XzIwMF8zMDFfOCAqIHggKyAwLjI2NF8zNjZfMjY5XzEgKiB5ICsgMC42MzNfODUxXzcwNyAqIHopO1xuXG5cdGNvbnN0IGwgPSAwLjIxMF80NTRfMjU1XzMgKiBscCArIDAuNzkzXzYxN183ODUgKiBtcCAtIDAuMDA0XzA3Ml8wNDZfOCAqIHNwO1xuXHRjb25zdCBhID0gMS45NzdfOTk4XzQ5NV8xICogbHAgLSAyLjQyOF81OTJfMjA1ICogbXAgKyAwLjQ1MF81OTNfNzA5XzkgKiBzcDtcblx0Y29uc3QgYiA9IDAuMDI1XzkwNF8wMzdfMSAqIGxwICsgMC43ODJfNzcxXzc2Nl8yICogbXAgLSAwLjgwOF82NzVfNzY2ICogc3A7XG5cblx0cmV0dXJuIFtsICogMTAwLCBhICogMTAwLCBiICogMTAwXTtcbn07XG5cbmNvbnZlcnQub2tsYWIub2tsY2ggPSBmdW5jdGlvbiAob2tsYWIpIHtcblx0cmV0dXJuIGNvbnZlcnQubGFiLmxjaChva2xhYik7XG59O1xuXG5jb252ZXJ0Lm9rbGFiLnh5eiA9IGZ1bmN0aW9uIChva2xhYikge1xuXHRjb25zdCBsbCA9IG9rbGFiWzBdIC8gMTAwO1xuXHRjb25zdCBhID0gb2tsYWJbMV0gLyAxMDA7XG5cdGNvbnN0IGIgPSBva2xhYlsyXSAvIDEwMDtcblxuXHRjb25zdCBsID0gKDAuOTk5Xzk5OV85OTggKiBsbCArIDAuMzk2XzMzN183OTIgKiBhICsgMC4yMTVfODAzXzc1OCAqIGIpICoqIDM7XG5cdGNvbnN0IG0gPSAoMS4wMDBfMDAwXzAwOCAqIGxsIC0gMC4xMDVfNTYxXzM0MiAqIGEgLSAwLjA2M184NTRfMTc1ICogYikgKiogMztcblx0Y29uc3QgcyA9ICgxLjAwMF8wMDBfMDU1ICogbGwgLSAwLjA4OV80ODRfMTgyICogYSAtIDEuMjkxXzQ4NV81MzggKiBiKSAqKiAzO1xuXG5cdGNvbnN0IHggPSAxLjIyN18wMTNfODUxICogbCAtIDAuNTU3Xzc5OV85OCAqIG0gKyAwLjI4MV8yNTZfMTQ5ICogcztcblx0Y29uc3QgeSA9IC0wLjA0MF81ODBfMTc4ICogbCArIDEuMTEyXzI1Nl84NyAqIG0gLSAwLjA3MV82NzZfNjc5ICogcztcblx0Y29uc3QgeiA9IC0wLjA3Nl8zODFfMjg1ICogbCAtIDAuNDIxXzQ4MV85NzggKiBtICsgMS41ODZfMTYzXzIyICogcztcblxuXHRyZXR1cm4gW3ggKiAxMDAsIHkgKiAxMDAsIHogKiAxMDBdO1xufTtcblxuY29udmVydC5va2xhYi5yZ2IgPSBmdW5jdGlvbiAob2tsYWIpIHtcblx0Y29uc3QgbGwgPSBva2xhYlswXSAvIDEwMDtcblx0Y29uc3QgYWEgPSBva2xhYlsxXSAvIDEwMDtcblx0Y29uc3QgYmIgPSBva2xhYlsyXSAvIDEwMDtcblxuXHRjb25zdCBsID0gKGxsICsgMC4zOTZfMzM3Xzc3N180ICogYWEgKyAwLjIxNV84MDNfNzU3XzMgKiBiYikgKiogMztcblx0Y29uc3QgbSA9IChsbCAtIDAuMTA1XzU2MV8zNDVfOCAqIGFhIC0gMC4wNjNfODU0XzE3Ml84ICogYmIpICoqIDM7XG5cdGNvbnN0IHMgPSAobGwgLSAwLjA4OV80ODRfMTc3XzUgKiBhYSAtIDEuMjkxXzQ4NV81NDggKiBiYikgKiogMztcblxuXHQvLyBBc3N1bWUgc1JHQlxuXHRjb25zdCByID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybSg0LjA3Nl83NDFfNjYyXzEgKiBsIC0gMy4zMDdfNzExXzU5MV8zICogbSArIDAuMjMwXzk2OV85MjlfMiAqIHMpO1xuXHRjb25zdCBnID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybSgtMS4yNjhfNDM4XzAwNF82ICogbCArIDIuNjA5Xzc1N180MDFfMSAqIG0gLSAwLjM0MV8zMTlfMzk2XzUgKiBzKTtcblx0Y29uc3QgYiA9IHNyZ2JOb25saW5lYXJUcmFuc2Zvcm0oLTAuMDA0XzE5Nl8wODZfMyAqIGwgLSAwLjcwM180MThfNjE0XzcgKiBtICsgMS43MDdfNjE0XzcwMSAqIHMpO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lm9rbGNoLm9rbGFiID0gZnVuY3Rpb24gKG9rbGNoKSB7XG5cdHJldHVybiBjb252ZXJ0LmxjaC5sYWIob2tsY2gpO1xufTtcblxuY29udmVydC5sYWIueHl6ID0gZnVuY3Rpb24gKGxhYikge1xuXHRjb25zdCBsID0gbGFiWzBdO1xuXHRjb25zdCBhID0gbGFiWzFdO1xuXHRjb25zdCBiID0gbGFiWzJdO1xuXHRsZXQgeDtcblx0bGV0IHk7XG5cdGxldCB6O1xuXG5cdHkgPSAobCArIDE2KSAvIDExNjtcblx0eCA9IGEgLyA1MDAgKyB5O1xuXHR6ID0geSAtIGIgLyAyMDA7XG5cblx0Y29uc3QgeTIgPSB5ICoqIDM7XG5cdGNvbnN0IHgyID0geCAqKiAzO1xuXHRjb25zdCB6MiA9IHogKiogMztcblx0eSA9IHkyID4gTEFCX0ZUID8geTIgOiAoeSAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR4ID0geDIgPiBMQUJfRlQgPyB4MiA6ICh4IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHogPSB6MiA+IExBQl9GVCA/IHoyIDogKHogLSAxNiAvIDExNikgLyA3Ljc4NztcblxuXHQvLyBJbGx1bWluYW50IEQ2NSBYWVogVHJpc3RyaW11bHVzIFZhbHVlc1xuXHQvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DSUVfMTkzMV9jb2xvcl9zcGFjZVxuXHR4ICo9IDk1LjA0Nztcblx0eSAqPSAxMDA7XG5cdHogKj0gMTA4Ljg4MztcblxuXHRyZXR1cm4gW3gsIHksIHpdO1xufTtcblxuY29udmVydC5sYWIubGNoID0gZnVuY3Rpb24gKGxhYikge1xuXHRjb25zdCBsID0gbGFiWzBdO1xuXHRjb25zdCBhID0gbGFiWzFdO1xuXHRjb25zdCBiID0gbGFiWzJdO1xuXHRsZXQgaDtcblxuXHRjb25zdCBociA9IE1hdGguYXRhbjIoYiwgYSk7XG5cdGggPSBociAqIDM2MCAvIDIgLyBNYXRoLlBJO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0Y29uc3QgYyA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcblxuXHRyZXR1cm4gW2wsIGMsIGhdO1xufTtcblxuY29udmVydC5sY2gubGFiID0gZnVuY3Rpb24gKGxjaCkge1xuXHRjb25zdCBsID0gbGNoWzBdO1xuXHRjb25zdCBjID0gbGNoWzFdO1xuXHRjb25zdCBoID0gbGNoWzJdO1xuXG5cdGNvbnN0IGhyID0gaCAvIDM2MCAqIDIgKiBNYXRoLlBJO1xuXHRjb25zdCBhID0gYyAqIE1hdGguY29zKGhyKTtcblx0Y29uc3QgYiA9IGMgKiBNYXRoLnNpbihocik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzLCBzYXR1cmF0aW9uID0gbnVsbCkge1xuXHRjb25zdCBbciwgZywgYl0gPSBhcmdzO1xuXHRsZXQgdmFsdWUgPSBzYXR1cmF0aW9uID09PSBudWxsID8gY29udmVydC5yZ2IuaHN2KGFyZ3MpWzJdIDogc2F0dXJhdGlvbjsgLy8gSHN2IC0+IGFuc2kxNiBvcHRpbWl6YXRpb25cblxuXHR2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUgLyA1MCk7XG5cblx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0cmV0dXJuIDMwO1xuXHR9XG5cblx0bGV0IGFuc2kgPSAzMFxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0XHQrICgoTWF0aC5yb3VuZChiIC8gMjU1KSA8PCAyKVxuXHRcdHwgKE1hdGgucm91bmQoZyAvIDI1NSkgPDwgMSlcblx0XHR8IE1hdGgucm91bmQociAvIDI1NSkpO1xuXHRcdC8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuXG5cdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdGFuc2kgKz0gNjA7XG5cdH1cblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuaHN2LmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIE9wdGltaXphdGlvbiBoZXJlOyB3ZSBhbHJlYWR5IGtub3cgdGhlIHZhbHVlIGFuZCBkb24ndCBuZWVkIHRvIGdldFxuXHQvLyBpdCBjb252ZXJ0ZWQgZm9yIHVzLlxuXHRyZXR1cm4gY29udmVydC5yZ2IuYW5zaTE2KGNvbnZlcnQuaHN2LnJnYihhcmdzKSwgYXJnc1syXSk7XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMjU2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Y29uc3QgciA9IGFyZ3NbMF07XG5cdGNvbnN0IGcgPSBhcmdzWzFdO1xuXHRjb25zdCBiID0gYXJnc1syXTtcblxuXHQvLyBXZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0aWYgKHIgPj4gNCA9PT0gZyA+PiA0ICYmIGcgPj4gNCA9PT0gYiA+PiA0KSB7XG5cdFx0aWYgKHIgPCA4KSB7XG5cdFx0XHRyZXR1cm4gMTY7XG5cdFx0fVxuXG5cdFx0aWYgKHIgPiAyNDgpIHtcblx0XHRcdHJldHVybiAyMzE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGgucm91bmQoKChyIC0gOCkgLyAyNDcpICogMjQpICsgMjMyO1xuXHR9XG5cblx0Y29uc3QgYW5zaSA9IDE2XG5cdFx0KyAoMzYgKiBNYXRoLnJvdW5kKHIgLyAyNTUgKiA1KSlcblx0XHQrICg2ICogTWF0aC5yb3VuZChnIC8gMjU1ICogNSkpXG5cdFx0KyBNYXRoLnJvdW5kKGIgLyAyNTUgKiA1KTtcblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuYW5zaTE2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdGFyZ3MgPSBhcmdzWzBdO1xuXG5cdGxldCBjb2xvciA9IGFyZ3MgJSAxMDtcblxuXHQvLyBIYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChjb2xvciA9PT0gMCB8fCBjb2xvciA9PT0gNykge1xuXHRcdGlmIChhcmdzID4gNTApIHtcblx0XHRcdGNvbG9yICs9IDMuNTtcblx0XHR9XG5cblx0XHRjb2xvciA9IGNvbG9yIC8gMTAuNSAqIDI1NTtcblxuXHRcdHJldHVybiBbY29sb3IsIGNvbG9yLCBjb2xvcl07XG5cdH1cblxuXHRjb25zdCBtdWx0ID0gKE1hdGgudHJ1bmMoYXJncyA+IDUwKSArIDEpICogMC41O1xuXHQvKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cdGNvbnN0IHIgPSAoKGNvbG9yICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0Y29uc3QgZyA9ICgoKGNvbG9yID4+IDEpICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0Y29uc3QgYiA9ICgoKGNvbG9yID4+IDIpICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQuYW5zaTI1Ni5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRhcmdzID0gYXJnc1swXTtcblxuXHQvLyBIYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChhcmdzID49IDIzMikge1xuXHRcdGNvbnN0IGMgPSAoYXJncyAtIDIzMikgKiAxMCArIDg7XG5cdFx0cmV0dXJuIFtjLCBjLCBjXTtcblx0fVxuXG5cdGFyZ3MgLT0gMTY7XG5cblx0bGV0IHJlbTtcblx0Y29uc3QgciA9IE1hdGguZmxvb3IoYXJncyAvIDM2KSAvIDUgKiAyNTU7XG5cdGNvbnN0IGcgPSBNYXRoLmZsb29yKChyZW0gPSBhcmdzICUgMzYpIC8gNikgLyA1ICogMjU1O1xuXHRjb25zdCBiID0gKHJlbSAlIDYpIC8gNSAqIDI1NTtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5yZ2IuaGV4ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRjb25zdCBpbnRlZ2VyID0gKChNYXRoLnJvdW5kKGFyZ3NbMF0pICYgMHhGRikgPDwgMTYpXG5cdFx0KyAoKE1hdGgucm91bmQoYXJnc1sxXSkgJiAweEZGKSA8PCA4KVxuXHRcdCsgKE1hdGgucm91bmQoYXJnc1syXSkgJiAweEZGKTtcblx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cblx0Y29uc3Qgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnNsaWNlKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5oZXgucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Y29uc3QgbWF0Y2ggPSBhcmdzLnRvU3RyaW5nKDE2KS5tYXRjaCgvW2EtZlxcZF17Nn18W2EtZlxcZF17M30vaSk7XG5cdGlmICghbWF0Y2gpIHtcblx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHR9XG5cblx0bGV0IGNvbG9yU3RyaW5nID0gbWF0Y2hbMF07XG5cblx0aWYgKG1hdGNoWzBdLmxlbmd0aCA9PT0gMykge1xuXHRcdGNvbG9yU3RyaW5nID0gWy4uLmNvbG9yU3RyaW5nXS5tYXAoY2hhciA9PiBjaGFyICsgY2hhcikuam9pbignJyk7XG5cdH1cblxuXHRjb25zdCBpbnRlZ2VyID0gTnVtYmVyLnBhcnNlSW50KGNvbG9yU3RyaW5nLCAxNik7XG5cdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0Y29uc3QgciA9IChpbnRlZ2VyID4+IDE2KSAmIDB4RkY7XG5cdGNvbnN0IGcgPSAoaW50ZWdlciA+PiA4KSAmIDB4RkY7XG5cdGNvbnN0IGIgPSBpbnRlZ2VyICYgMHhGRjtcblx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhjZyA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblx0Y29uc3QgbWF4ID0gTWF0aC5tYXgoTWF0aC5tYXgociwgZyksIGIpO1xuXHRjb25zdCBtaW4gPSBNYXRoLm1pbihNYXRoLm1pbihyLCBnKSwgYik7XG5cdGNvbnN0IGNocm9tYSA9IChtYXggLSBtaW4pO1xuXHRsZXQgaHVlO1xuXG5cdGNvbnN0IGdyYXlzY2FsZSA9IGNocm9tYSA8IDEgPyBtaW4gLyAoMSAtIGNocm9tYSkgOiAwO1xuXG5cdGlmIChjaHJvbWEgPD0gMCkge1xuXHRcdGh1ZSA9IDA7XG5cdH0gZWxzZSBpZiAobWF4ID09PSByKSB7XG5cdFx0aHVlID0gKChnIC0gYikgLyBjaHJvbWEpICUgNjtcblx0fSBlbHNlIGlmIChtYXggPT09IGcpIHtcblx0XHRodWUgPSAyICsgKGIgLSByKSAvIGNocm9tYTtcblx0fSBlbHNlIHtcblx0XHRodWUgPSA0ICsgKHIgLSBnKSAvIGNocm9tYTtcblx0fVxuXG5cdGh1ZSAvPSA2O1xuXHRodWUgJT0gMTtcblxuXHRyZXR1cm4gW2h1ZSAqIDM2MCwgY2hyb21hICogMTAwLCBncmF5c2NhbGUgKiAxMDBdO1xufTtcblxuY29udmVydC5oc2wuaGNnID0gZnVuY3Rpb24gKGhzbCkge1xuXHRjb25zdCBzID0gaHNsWzFdIC8gMTAwO1xuXHRjb25zdCBsID0gaHNsWzJdIC8gMTAwO1xuXG5cdGNvbnN0IGMgPSBsIDwgMC41ID8gKDIgKiBzICogbCkgOiAoMiAqIHMgKiAoMSAtIGwpKTtcblxuXHRsZXQgZiA9IDA7XG5cdGlmIChjIDwgMSkge1xuXHRcdGYgPSAobCAtIDAuNSAqIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHNsWzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHN2LmhjZyA9IGZ1bmN0aW9uIChoc3YpIHtcblx0Y29uc3QgcyA9IGhzdlsxXSAvIDEwMDtcblx0Y29uc3QgdiA9IGhzdlsyXSAvIDEwMDtcblxuXHRjb25zdCBjID0gcyAqIHY7XG5cdGxldCBmID0gMDtcblxuXHRpZiAoYyA8IDEpIHtcblx0XHRmID0gKHYgLSBjKSAvICgxIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2hzdlswXSwgYyAqIDEwMCwgZiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5yZ2IgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGggPSBoY2dbMF0gLyAzNjA7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0aWYgKGMgPT09IDApIHtcblx0XHRyZXR1cm4gW2cgKiAyNTUsIGcgKiAyNTUsIGcgKiAyNTVdO1xuXHR9XG5cblx0Y29uc3QgcHVyZSA9IFswLCAwLCAwXTtcblx0Y29uc3QgaGkgPSAoaCAlIDEpICogNjtcblx0Y29uc3QgdiA9IGhpICUgMTtcblx0Y29uc3QgdyA9IDEgLSB2O1xuXHRsZXQgbWcgPSAwO1xuXG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lICovXG5cdHN3aXRjaCAoTWF0aC5mbG9vcihoaSkpIHtcblx0XHRjYXNlIDA6IHtcblx0XHRcdHB1cmVbMF0gPSAxOyBwdXJlWzFdID0gdjsgcHVyZVsyXSA9IDA7IGJyZWFrO1xuXHRcdH1cblxuXHRcdGNhc2UgMToge1xuXHRcdFx0cHVyZVswXSA9IHc7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSAyOiB7XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSB2OyBicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIDM6IHtcblx0XHRcdHB1cmVbMF0gPSAwOyBwdXJlWzFdID0gdzsgcHVyZVsyXSA9IDE7IGJyZWFrO1xuXHRcdH1cblxuXHRcdGNhc2UgNDoge1xuXHRcdFx0cHVyZVswXSA9IHY7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gdztcblx0XHR9XG5cdH1cblx0LyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSAqL1xuXG5cdG1nID0gKDEgLSBjKSAqIGc7XG5cblx0cmV0dXJuIFtcblx0XHQoYyAqIHB1cmVbMF0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzFdICsgbWcpICogMjU1LFxuXHRcdChjICogcHVyZVsyXSArIG1nKSAqIDI1NSxcblx0XTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzdiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRjb25zdCB2ID0gYyArIGcgKiAoMSAtIGMpO1xuXHRsZXQgZiA9IDA7XG5cblx0aWYgKHYgPiAwKSB7XG5cdFx0ZiA9IGMgLyB2O1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIGYgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHNsID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdGNvbnN0IGwgPSBnICogKDEgLSBjKSArIDAuNSAqIGM7XG5cdGxldCBzID0gMDtcblxuXHRpZiAobCA+IDAgJiYgbCA8IDAuNSkge1xuXHRcdHMgPSBjIC8gKDIgKiBsKTtcblx0fSBlbHNlIGlmIChsID49IDAuNSAmJiBsIDwgMSkge1xuXHRcdHMgPSBjIC8gKDIgKiAoMSAtIGwpKTtcblx0fVxuXG5cdHJldHVybiBbaGNnWzBdLCBzICogMTAwLCBsICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLmh3YiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblx0Y29uc3QgdiA9IGMgKyBnICogKDEgLSBjKTtcblx0cmV0dXJuIFtoY2dbMF0sICh2IC0gYykgKiAxMDAsICgxIC0gdikgKiAxMDBdO1xufTtcblxuY29udmVydC5od2IuaGNnID0gZnVuY3Rpb24gKGh3Yikge1xuXHRjb25zdCB3ID0gaHdiWzFdIC8gMTAwO1xuXHRjb25zdCBiID0gaHdiWzJdIC8gMTAwO1xuXHRjb25zdCB2ID0gMSAtIGI7XG5cdGNvbnN0IGMgPSB2IC0gdztcblx0bGV0IGcgPSAwO1xuXG5cdGlmIChjIDwgMSkge1xuXHRcdGcgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHdiWzBdLCBjICogMTAwLCBnICogMTAwXTtcbn07XG5cbmNvbnZlcnQuYXBwbGUucmdiID0gZnVuY3Rpb24gKGFwcGxlKSB7XG5cdHJldHVybiBbKGFwcGxlWzBdIC8gNjVfNTM1KSAqIDI1NSwgKGFwcGxlWzFdIC8gNjVfNTM1KSAqIDI1NSwgKGFwcGxlWzJdIC8gNjVfNTM1KSAqIDI1NV07XG59O1xuXG5jb252ZXJ0LnJnYi5hcHBsZSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0cmV0dXJuIFsocmdiWzBdIC8gMjU1KSAqIDY1XzUzNSwgKHJnYlsxXSAvIDI1NSkgKiA2NV81MzUsIChyZ2JbMl0gLyAyNTUpICogNjVfNTM1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gW2FyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTVdO1xufTtcblxuY29udmVydC5ncmF5LmhzbCA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbMCwgMCwgYXJnc1swXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHN2ID0gY29udmVydC5ncmF5LmhzbDtcblxuY29udmVydC5ncmF5Lmh3YiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMTAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5jbXlrID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAwLCAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5sYWIgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gW2dyYXlbMF0sIDAsIDBdO1xufTtcblxuY29udmVydC5ncmF5LmhleCA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0Y29uc3QgdmFsdWUgPSBNYXRoLnJvdW5kKGdyYXlbMF0gLyAxMDAgKiAyNTUpICYgMHhGRjtcblx0Y29uc3QgaW50ZWdlciA9ICh2YWx1ZSA8PCAxNikgKyAodmFsdWUgPDwgOCkgKyB2YWx1ZTtcblx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cblx0Y29uc3Qgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnNsaWNlKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5yZ2IuZ3JheSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgdmFsdWUgPSAocmdiWzBdICsgcmdiWzFdICsgcmdiWzJdKSAvIDM7XG5cdHJldHVybiBbdmFsdWUgLyAyNTUgKiAxMDBdO1xufTtcbiIsImltcG9ydCBjb252ZXJzaW9ucyBmcm9tICcuL2NvbnZlcnNpb25zLmpzJztcbmltcG9ydCByb3V0ZSBmcm9tICcuL3JvdXRlLmpzJztcblxuY29uc3QgY29udmVydCA9IHt9O1xuXG5jb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9ucyk7XG5cbmZ1bmN0aW9uIHdyYXBSYXcoZm4pIHtcblx0Y29uc3Qgd3JhcHBlZEZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBhcmcwID0gYXJnc1swXTtcblx0XHRpZiAoYXJnMCA9PT0gdW5kZWZpbmVkIHx8IGFyZzAgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmcwO1xuXHRcdH1cblxuXHRcdGlmIChhcmcwLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBhcmcwO1xuXHRcdH1cblxuXHRcdHJldHVybiBmbihhcmdzKTtcblx0fTtcblxuXHQvLyBQcmVzZXJ2ZSAuY29udmVyc2lvbiBwcm9wZXJ0eSBpZiB0aGVyZSBpcyBvbmVcblx0aWYgKCdjb252ZXJzaW9uJyBpbiBmbikge1xuXHRcdHdyYXBwZWRGbi5jb252ZXJzaW9uID0gZm4uY29udmVyc2lvbjtcblx0fVxuXG5cdHJldHVybiB3cmFwcGVkRm47XG59XG5cbmZ1bmN0aW9uIHdyYXBSb3VuZGVkKGZuKSB7XG5cdGNvbnN0IHdyYXBwZWRGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0Y29uc3QgYXJnMCA9IGFyZ3NbMF07XG5cblx0XHRpZiAoYXJnMCA9PT0gdW5kZWZpbmVkIHx8IGFyZzAgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmcwO1xuXHRcdH1cblxuXHRcdGlmIChhcmcwLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBhcmcwO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdCA9IGZuKGFyZ3MpO1xuXG5cdFx0Ly8gV2UncmUgYXNzdW1pbmcgdGhlIHJlc3VsdCBpcyBhbiBhcnJheSBoZXJlLlxuXHRcdC8vIHNlZSBub3RpY2UgaW4gY29udmVyc2lvbnMuanM7IGRvbid0IHVzZSBib3ggdHlwZXNcblx0XHQvLyBpbiBjb252ZXJzaW9uIGZ1bmN0aW9ucy5cblx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAobGV0IHtsZW5ndGh9ID0gcmVzdWx0LCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdC8vIFByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxuZm9yIChjb25zdCBmcm9tTW9kZWwgb2YgbW9kZWxzKSB7XG5cdGNvbnZlcnRbZnJvbU1vZGVsXSA9IHt9O1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5jaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmxhYmVsc30pO1xuXG5cdGNvbnN0IHJvdXRlcyA9IHJvdXRlKGZyb21Nb2RlbCk7XG5cdGNvbnN0IHJvdXRlTW9kZWxzID0gT2JqZWN0LmtleXMocm91dGVzKTtcblxuXHRmb3IgKGNvbnN0IHRvTW9kZWwgb2Ygcm91dGVNb2RlbHMpIHtcblx0XHRjb25zdCBmbiA9IHJvdXRlc1t0b01vZGVsXTtcblxuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXSA9IHdyYXBSb3VuZGVkKGZuKTtcblx0XHRjb252ZXJ0W2Zyb21Nb2RlbF1bdG9Nb2RlbF0ucmF3ID0gd3JhcFJhdyhmbik7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udmVydDtcbiIsImltcG9ydCBjb252ZXJzaW9ucyBmcm9tICcuL2NvbnZlcnNpb25zLmpzJztcblxuLypcblx0VGhpcyBmdW5jdGlvbiByb3V0ZXMgYSBtb2RlbCB0byBhbGwgb3RoZXIgbW9kZWxzLlxuXG5cdGFsbCBmdW5jdGlvbnMgdGhhdCBhcmUgcm91dGVkIGhhdmUgYSBwcm9wZXJ0eSBgLmNvbnZlcnNpb25gIGF0dGFjaGVkXG5cdHRvIHRoZSByZXR1cm5lZCBzeW50aGV0aWMgZnVuY3Rpb24uIFRoaXMgcHJvcGVydHkgaXMgYW4gYXJyYXlcblx0b2Ygc3RyaW5ncywgZWFjaCB3aXRoIHRoZSBzdGVwcyBpbiBiZXR3ZWVuIHRoZSAnZnJvbScgYW5kICd0bydcblx0Y29sb3IgbW9kZWxzIChpbmNsdXNpdmUpLlxuXG5cdGNvbnZlcnNpb25zIHRoYXQgYXJlIG5vdCBwb3NzaWJsZSBzaW1wbHkgYXJlIG5vdCBpbmNsdWRlZC5cbiovXG5cbmZ1bmN0aW9uIGJ1aWxkR3JhcGgoKSB7XG5cdGNvbnN0IGdyYXBoID0ge307XG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS9vYmplY3Qta2V5cy12cy1mb3ItaW4td2l0aC1jbG9zdXJlLzNcblx0Y29uc3QgbW9kZWxzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnMpO1xuXG5cdGZvciAobGV0IHtsZW5ndGh9ID0gbW9kZWxzLCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0Z3JhcGhbbW9kZWxzW2ldXSA9IHtcblx0XHRcdC8vIGh0dHA6Ly9qc3BlcmYuY29tLzEtdnMtaW5maW5pdHlcblx0XHRcdC8vIG1pY3JvLW9wdCwgYnV0IHRoaXMgaXMgc2ltcGxlLlxuXHRcdFx0ZGlzdGFuY2U6IC0xLFxuXHRcdFx0cGFyZW50OiBudWxsLFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gZ3JhcGg7XG59XG5cbi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JyZWFkdGgtZmlyc3Rfc2VhcmNoXG5mdW5jdGlvbiBkZXJpdmVCRlMoZnJvbU1vZGVsKSB7XG5cdGNvbnN0IGdyYXBoID0gYnVpbGRHcmFwaCgpO1xuXHRjb25zdCBxdWV1ZSA9IFtmcm9tTW9kZWxdOyAvLyBVbnNoaWZ0IC0+IHF1ZXVlIC0+IHBvcFxuXG5cdGdyYXBoW2Zyb21Nb2RlbF0uZGlzdGFuY2UgPSAwO1xuXG5cdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IHF1ZXVlLnBvcCgpO1xuXHRcdGNvbnN0IGFkamFjZW50cyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zW2N1cnJlbnRdKTtcblxuXHRcdGZvciAobGV0IHtsZW5ndGh9ID0gYWRqYWNlbnRzLCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBhZGphY2VudCA9IGFkamFjZW50c1tpXTtcblx0XHRcdGNvbnN0IG5vZGUgPSBncmFwaFthZGphY2VudF07XG5cblx0XHRcdGlmIChub2RlLmRpc3RhbmNlID09PSAtMSkge1xuXHRcdFx0XHRub2RlLmRpc3RhbmNlID0gZ3JhcGhbY3VycmVudF0uZGlzdGFuY2UgKyAxO1xuXHRcdFx0XHRub2RlLnBhcmVudCA9IGN1cnJlbnQ7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoYWRqYWNlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuZnVuY3Rpb24gbGluayhmcm9tLCB0bykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRyZXR1cm4gdG8oZnJvbShhcmdzKSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKSB7XG5cdGNvbnN0IHBhdGggPSBbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50LCB0b01vZGVsXTtcblx0bGV0IGZuID0gY29udmVyc2lvbnNbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50XVt0b01vZGVsXTtcblxuXHRsZXQgY3VyID0gZ3JhcGhbdG9Nb2RlbF0ucGFyZW50O1xuXHR3aGlsZSAoZ3JhcGhbY3VyXS5wYXJlbnQpIHtcblx0XHRwYXRoLnVuc2hpZnQoZ3JhcGhbY3VyXS5wYXJlbnQpO1xuXHRcdGZuID0gbGluayhjb252ZXJzaW9uc1tncmFwaFtjdXJdLnBhcmVudF1bY3VyXSwgZm4pO1xuXHRcdGN1ciA9IGdyYXBoW2N1cl0ucGFyZW50O1xuXHR9XG5cblx0Zm4uY29udmVyc2lvbiA9IHBhdGg7XG5cdHJldHVybiBmbjtcbn1cblxuZnVuY3Rpb24gcm91dGUoZnJvbU1vZGVsKSB7XG5cdGNvbnN0IGdyYXBoID0gZGVyaXZlQkZTKGZyb21Nb2RlbCk7XG5cdGNvbnN0IGNvbnZlcnNpb24gPSB7fTtcblxuXHRjb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhncmFwaCk7XG5cdGZvciAobGV0IHtsZW5ndGh9ID0gbW9kZWxzLCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgdG9Nb2RlbCA9IG1vZGVsc1tpXTtcblx0XHRjb25zdCBub2RlID0gZ3JhcGhbdG9Nb2RlbF07XG5cblx0XHRpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblx0XHRcdC8vIE5vIHBvc3NpYmxlIGNvbnZlcnNpb24sIG9yIHRoaXMgbm9kZSBpcyB0aGUgc291cmNlIG1vZGVsLlxuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29udmVyc2lvblt0b01vZGVsXSA9IHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKTtcblx0fVxuXG5cdHJldHVybiBjb252ZXJzaW9uO1xufVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZTtcbiIsImNvbnN0IGNvbG9ycyA9IHtcblx0YWxpY2VibHVlOiBbMjQwLCAyNDgsIDI1NV0sXG5cdGFudGlxdWV3aGl0ZTogWzI1MCwgMjM1LCAyMTVdLFxuXHRhcXVhOiBbMCwgMjU1LCAyNTVdLFxuXHRhcXVhbWFyaW5lOiBbMTI3LCAyNTUsIDIxMl0sXG5cdGF6dXJlOiBbMjQwLCAyNTUsIDI1NV0sXG5cdGJlaWdlOiBbMjQ1LCAyNDUsIDIyMF0sXG5cdGJpc3F1ZTogWzI1NSwgMjI4LCAxOTZdLFxuXHRibGFjazogWzAsIDAsIDBdLFxuXHRibGFuY2hlZGFsbW9uZDogWzI1NSwgMjM1LCAyMDVdLFxuXHRibHVlOiBbMCwgMCwgMjU1XSxcblx0Ymx1ZXZpb2xldDogWzEzOCwgNDMsIDIyNl0sXG5cdGJyb3duOiBbMTY1LCA0MiwgNDJdLFxuXHRidXJseXdvb2Q6IFsyMjIsIDE4NCwgMTM1XSxcblx0Y2FkZXRibHVlOiBbOTUsIDE1OCwgMTYwXSxcblx0Y2hhcnRyZXVzZTogWzEyNywgMjU1LCAwXSxcblx0Y2hvY29sYXRlOiBbMjEwLCAxMDUsIDMwXSxcblx0Y29yYWw6IFsyNTUsIDEyNywgODBdLFxuXHRjb3JuZmxvd2VyYmx1ZTogWzEwMCwgMTQ5LCAyMzddLFxuXHRjb3Juc2lsazogWzI1NSwgMjQ4LCAyMjBdLFxuXHRjcmltc29uOiBbMjIwLCAyMCwgNjBdLFxuXHRjeWFuOiBbMCwgMjU1LCAyNTVdLFxuXHRkYXJrYmx1ZTogWzAsIDAsIDEzOV0sXG5cdGRhcmtjeWFuOiBbMCwgMTM5LCAxMzldLFxuXHRkYXJrZ29sZGVucm9kOiBbMTg0LCAxMzQsIDExXSxcblx0ZGFya2dyYXk6IFsxNjksIDE2OSwgMTY5XSxcblx0ZGFya2dyZWVuOiBbMCwgMTAwLCAwXSxcblx0ZGFya2dyZXk6IFsxNjksIDE2OSwgMTY5XSxcblx0ZGFya2toYWtpOiBbMTg5LCAxODMsIDEwN10sXG5cdGRhcmttYWdlbnRhOiBbMTM5LCAwLCAxMzldLFxuXHRkYXJrb2xpdmVncmVlbjogWzg1LCAxMDcsIDQ3XSxcblx0ZGFya29yYW5nZTogWzI1NSwgMTQwLCAwXSxcblx0ZGFya29yY2hpZDogWzE1MywgNTAsIDIwNF0sXG5cdGRhcmtyZWQ6IFsxMzksIDAsIDBdLFxuXHRkYXJrc2FsbW9uOiBbMjMzLCAxNTAsIDEyMl0sXG5cdGRhcmtzZWFncmVlbjogWzE0MywgMTg4LCAxNDNdLFxuXHRkYXJrc2xhdGVibHVlOiBbNzIsIDYxLCAxMzldLFxuXHRkYXJrc2xhdGVncmF5OiBbNDcsIDc5LCA3OV0sXG5cdGRhcmtzbGF0ZWdyZXk6IFs0NywgNzksIDc5XSxcblx0ZGFya3R1cnF1b2lzZTogWzAsIDIwNiwgMjA5XSxcblx0ZGFya3Zpb2xldDogWzE0OCwgMCwgMjExXSxcblx0ZGVlcHBpbms6IFsyNTUsIDIwLCAxNDddLFxuXHRkZWVwc2t5Ymx1ZTogWzAsIDE5MSwgMjU1XSxcblx0ZGltZ3JheTogWzEwNSwgMTA1LCAxMDVdLFxuXHRkaW1ncmV5OiBbMTA1LCAxMDUsIDEwNV0sXG5cdGRvZGdlcmJsdWU6IFszMCwgMTQ0LCAyNTVdLFxuXHRmaXJlYnJpY2s6IFsxNzgsIDM0LCAzNF0sXG5cdGZsb3JhbHdoaXRlOiBbMjU1LCAyNTAsIDI0MF0sXG5cdGZvcmVzdGdyZWVuOiBbMzQsIDEzOSwgMzRdLFxuXHRmdWNoc2lhOiBbMjU1LCAwLCAyNTVdLFxuXHRnYWluc2Jvcm86IFsyMjAsIDIyMCwgMjIwXSxcblx0Z2hvc3R3aGl0ZTogWzI0OCwgMjQ4LCAyNTVdLFxuXHRnb2xkOiBbMjU1LCAyMTUsIDBdLFxuXHRnb2xkZW5yb2Q6IFsyMTgsIDE2NSwgMzJdLFxuXHRncmF5OiBbMTI4LCAxMjgsIDEyOF0sXG5cdGdyZWVuOiBbMCwgMTI4LCAwXSxcblx0Z3JlZW55ZWxsb3c6IFsxNzMsIDI1NSwgNDddLFxuXHRncmV5OiBbMTI4LCAxMjgsIDEyOF0sXG5cdGhvbmV5ZGV3OiBbMjQwLCAyNTUsIDI0MF0sXG5cdGhvdHBpbms6IFsyNTUsIDEwNSwgMTgwXSxcblx0aW5kaWFucmVkOiBbMjA1LCA5MiwgOTJdLFxuXHRpbmRpZ286IFs3NSwgMCwgMTMwXSxcblx0aXZvcnk6IFsyNTUsIDI1NSwgMjQwXSxcblx0a2hha2k6IFsyNDAsIDIzMCwgMTQwXSxcblx0bGF2ZW5kZXI6IFsyMzAsIDIzMCwgMjUwXSxcblx0bGF2ZW5kZXJibHVzaDogWzI1NSwgMjQwLCAyNDVdLFxuXHRsYXduZ3JlZW46IFsxMjQsIDI1MiwgMF0sXG5cdGxlbW9uY2hpZmZvbjogWzI1NSwgMjUwLCAyMDVdLFxuXHRsaWdodGJsdWU6IFsxNzMsIDIxNiwgMjMwXSxcblx0bGlnaHRjb3JhbDogWzI0MCwgMTI4LCAxMjhdLFxuXHRsaWdodGN5YW46IFsyMjQsIDI1NSwgMjU1XSxcblx0bGlnaHRnb2xkZW5yb2R5ZWxsb3c6IFsyNTAsIDI1MCwgMjEwXSxcblx0bGlnaHRncmF5OiBbMjExLCAyMTEsIDIxMV0sXG5cdGxpZ2h0Z3JlZW46IFsxNDQsIDIzOCwgMTQ0XSxcblx0bGlnaHRncmV5OiBbMjExLCAyMTEsIDIxMV0sXG5cdGxpZ2h0cGluazogWzI1NSwgMTgyLCAxOTNdLFxuXHRsaWdodHNhbG1vbjogWzI1NSwgMTYwLCAxMjJdLFxuXHRsaWdodHNlYWdyZWVuOiBbMzIsIDE3OCwgMTcwXSxcblx0bGlnaHRza3libHVlOiBbMTM1LCAyMDYsIDI1MF0sXG5cdGxpZ2h0c2xhdGVncmF5OiBbMTE5LCAxMzYsIDE1M10sXG5cdGxpZ2h0c2xhdGVncmV5OiBbMTE5LCAxMzYsIDE1M10sXG5cdGxpZ2h0c3RlZWxibHVlOiBbMTc2LCAxOTYsIDIyMl0sXG5cdGxpZ2h0eWVsbG93OiBbMjU1LCAyNTUsIDIyNF0sXG5cdGxpbWU6IFswLCAyNTUsIDBdLFxuXHRsaW1lZ3JlZW46IFs1MCwgMjA1LCA1MF0sXG5cdGxpbmVuOiBbMjUwLCAyNDAsIDIzMF0sXG5cdG1hZ2VudGE6IFsyNTUsIDAsIDI1NV0sXG5cdG1hcm9vbjogWzEyOCwgMCwgMF0sXG5cdG1lZGl1bWFxdWFtYXJpbmU6IFsxMDIsIDIwNSwgMTcwXSxcblx0bWVkaXVtYmx1ZTogWzAsIDAsIDIwNV0sXG5cdG1lZGl1bW9yY2hpZDogWzE4NiwgODUsIDIxMV0sXG5cdG1lZGl1bXB1cnBsZTogWzE0NywgMTEyLCAyMTldLFxuXHRtZWRpdW1zZWFncmVlbjogWzYwLCAxNzksIDExM10sXG5cdG1lZGl1bXNsYXRlYmx1ZTogWzEyMywgMTA0LCAyMzhdLFxuXHRtZWRpdW1zcHJpbmdncmVlbjogWzAsIDI1MCwgMTU0XSxcblx0bWVkaXVtdHVycXVvaXNlOiBbNzIsIDIwOSwgMjA0XSxcblx0bWVkaXVtdmlvbGV0cmVkOiBbMTk5LCAyMSwgMTMzXSxcblx0bWlkbmlnaHRibHVlOiBbMjUsIDI1LCAxMTJdLFxuXHRtaW50Y3JlYW06IFsyNDUsIDI1NSwgMjUwXSxcblx0bWlzdHlyb3NlOiBbMjU1LCAyMjgsIDIyNV0sXG5cdG1vY2Nhc2luOiBbMjU1LCAyMjgsIDE4MV0sXG5cdG5hdmFqb3doaXRlOiBbMjU1LCAyMjIsIDE3M10sXG5cdG5hdnk6IFswLCAwLCAxMjhdLFxuXHRvbGRsYWNlOiBbMjUzLCAyNDUsIDIzMF0sXG5cdG9saXZlOiBbMTI4LCAxMjgsIDBdLFxuXHRvbGl2ZWRyYWI6IFsxMDcsIDE0MiwgMzVdLFxuXHRvcmFuZ2U6IFsyNTUsIDE2NSwgMF0sXG5cdG9yYW5nZXJlZDogWzI1NSwgNjksIDBdLFxuXHRvcmNoaWQ6IFsyMTgsIDExMiwgMjE0XSxcblx0cGFsZWdvbGRlbnJvZDogWzIzOCwgMjMyLCAxNzBdLFxuXHRwYWxlZ3JlZW46IFsxNTIsIDI1MSwgMTUyXSxcblx0cGFsZXR1cnF1b2lzZTogWzE3NSwgMjM4LCAyMzhdLFxuXHRwYWxldmlvbGV0cmVkOiBbMjE5LCAxMTIsIDE0N10sXG5cdHBhcGF5YXdoaXA6IFsyNTUsIDIzOSwgMjEzXSxcblx0cGVhY2hwdWZmOiBbMjU1LCAyMTgsIDE4NV0sXG5cdHBlcnU6IFsyMDUsIDEzMywgNjNdLFxuXHRwaW5rOiBbMjU1LCAxOTIsIDIwM10sXG5cdHBsdW06IFsyMjEsIDE2MCwgMjIxXSxcblx0cG93ZGVyYmx1ZTogWzE3NiwgMjI0LCAyMzBdLFxuXHRwdXJwbGU6IFsxMjgsIDAsIDEyOF0sXG5cdHJlYmVjY2FwdXJwbGU6IFsxMDIsIDUxLCAxNTNdLFxuXHRyZWQ6IFsyNTUsIDAsIDBdLFxuXHRyb3N5YnJvd246IFsxODgsIDE0MywgMTQzXSxcblx0cm95YWxibHVlOiBbNjUsIDEwNSwgMjI1XSxcblx0c2FkZGxlYnJvd246IFsxMzksIDY5LCAxOV0sXG5cdHNhbG1vbjogWzI1MCwgMTI4LCAxMTRdLFxuXHRzYW5keWJyb3duOiBbMjQ0LCAxNjQsIDk2XSxcblx0c2VhZ3JlZW46IFs0NiwgMTM5LCA4N10sXG5cdHNlYXNoZWxsOiBbMjU1LCAyNDUsIDIzOF0sXG5cdHNpZW5uYTogWzE2MCwgODIsIDQ1XSxcblx0c2lsdmVyOiBbMTkyLCAxOTIsIDE5Ml0sXG5cdHNreWJsdWU6IFsxMzUsIDIwNiwgMjM1XSxcblx0c2xhdGVibHVlOiBbMTA2LCA5MCwgMjA1XSxcblx0c2xhdGVncmF5OiBbMTEyLCAxMjgsIDE0NF0sXG5cdHNsYXRlZ3JleTogWzExMiwgMTI4LCAxNDRdLFxuXHRzbm93OiBbMjU1LCAyNTAsIDI1MF0sXG5cdHNwcmluZ2dyZWVuOiBbMCwgMjU1LCAxMjddLFxuXHRzdGVlbGJsdWU6IFs3MCwgMTMwLCAxODBdLFxuXHR0YW46IFsyMTAsIDE4MCwgMTQwXSxcblx0dGVhbDogWzAsIDEyOCwgMTI4XSxcblx0dGhpc3RsZTogWzIxNiwgMTkxLCAyMTZdLFxuXHR0b21hdG86IFsyNTUsIDk5LCA3MV0sXG5cdHR1cnF1b2lzZTogWzY0LCAyMjQsIDIwOF0sXG5cdHZpb2xldDogWzIzOCwgMTMwLCAyMzhdLFxuXHR3aGVhdDogWzI0NSwgMjIyLCAxNzldLFxuXHR3aGl0ZTogWzI1NSwgMjU1LCAyNTVdLFxuXHR3aGl0ZXNtb2tlOiBbMjQ1LCAyNDUsIDI0NV0sXG5cdHllbGxvdzogWzI1NSwgMjU1LCAwXSxcblx0eWVsbG93Z3JlZW46IFsxNTQsIDIwNSwgNTBdLFxufVxuXG5mb3IgKGNvbnN0IGtleSBpbiBjb2xvcnMpIE9iamVjdC5mcmVlemUoY29sb3JzW2tleV0pO1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmZyZWV6ZShjb2xvcnMpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxubGV0IF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdmlzX3N0cl9kZW1vLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9