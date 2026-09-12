/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/strlib.ts"
/*!***********************!*\
  !*** ./src/strlib.ts ***!
  \***********************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.enumIfGroup = exports.enumIf = exports.prevSmallerSuffixes = exports.nextSmallerSuffixes = exports.prevArray = exports.nssArray = exports.rankArray = exports.suffixArray = exports.replaceEffectiveAlphabet = exports.lyndonArray = exports.lyndonFactorization = exports.findLongestLyndonFactor = exports.enumLyndon = exports.isLyndon = exports.lz78 = exports.lz77 = exports.isMaxRepeat = exports.isRightMaximal = exports.isLeftMaximal = exports.rightExtensions = exports.reverse = exports.leftExtensions = exports.enumRuns = exports.isRun = exports.enumLeftmostSquares = exports.enumRightmostSquares = exports.isLeftmostSquare = exports.isRightmostSquare = exports.enumSquares = exports.isSquare = exports.enumPrevOccLPF = exports.prevOccLPF = exports.lcp = exports.findAll = exports.substrings = exports.flat = exports.enumPalindromes = exports.isPalindrome = void 0;
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
    let res = [];
    for (let len = 1; len <= n; len++) {
        for (let beg = 0; beg + len <= n; beg++) {
            if ((0, exports.isPalindrome)(str.substring(beg, beg + len)))
                res.push([beg, beg + len - 1]);
        }
    }
    return res;
};
exports.enumPalindromes = enumPalindromes;
const flat = (arr) => {
    return arr.reduce((acm, x) => acm.concat(x), []);
};
exports.flat = flat;
const substrings = (str) => {
    const n = str.length;
    let res = new Set();
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j <= n; j++)
            res.add(str.substring(i, j));
    }
    return [...res.keys()];
};
exports.substrings = substrings;
const findAll = (str, pat) => {
    const m = pat.length;
    let res = [];
    let pos = str.indexOf(pat);
    while (pos !== -1) {
        res.push([pos, pos + m - 1]);
        pos = str.indexOf(pat, pos + 1);
    }
    return res;
};
exports.findAll = findAll;
const lcp = (str, i, j) => {
    let n = str.length;
    let match_len = 0;
    while (i + match_len < n && j + match_len < n) {
        if (str[i + match_len] == str[j + match_len])
            match_len++;
        else
            break;
    }
    return match_len;
};
exports.lcp = lcp;
const prevOccLPF = (str) => {
    let prevOcc = [];
    let lpf = [];
    const n = str.length;
    for (let i = 0; i < n; i++) {
        let poccx = -1;
        let lpfx = 0;
        for (let j = 0; j < i; j++) {
            const l = (0, exports.lcp)(str, i, j);
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
    let res = [
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
const isSquare = (s, beg, p) => {
    for (let i = 0; i < p; i++) {
        if (s[beg + i] != s[beg + p + i])
            return false;
    }
    return true;
};
exports.isSquare = isSquare;
const enumSquares = (s) => {
    const n = s.length;
    let res = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if ((0, exports.isSquare)(s, beg, p)) {
                    res.push([beg, beg + 2 * p - 1, p]);
                }
            }
        }
    }
    return res;
};
exports.enumSquares = enumSquares;
const isRightmostSquare = (s, beg, p) => {
    if (!(0, exports.isSquare)(s, beg, p))
        return false;
    return !s.includes(s.substr(beg, 2 * p), beg + 1);
};
exports.isRightmostSquare = isRightmostSquare;
const isLeftmostSquare = (s, beg, p) => {
    if (!(0, exports.isSquare)(s, beg, p))
        return false;
    return !s.substr(0, beg + 2 * p - 1).includes(s.substr(beg, 2 * p));
};
exports.isLeftmostSquare = isLeftmostSquare;
const enumRightmostSquares = (s) => {
    const n = s.length;
    let res = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if ((0, exports.isRightmostSquare)(s, beg, p)) {
                    res.push([beg, beg + 2 * p - 1, p]);
                }
            }
        }
    }
    return res;
};
exports.enumRightmostSquares = enumRightmostSquares;
const enumLeftmostSquares = (s) => {
    const n = s.length;
    let res = [];
    for (let p = 1; p < n; p++) {
        for (let offset = 0; offset < 2 * p; offset++) {
            for (let beg = offset; beg < n - 2 * p + 1; beg += 2 * p) {
                if ((0, exports.isLeftmostSquare)(s, beg, p)) {
                    res.push([beg, beg + 2 * p - 1, p]);
                }
            }
        }
    }
    return res;
};
exports.enumLeftmostSquares = enumLeftmostSquares;
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
    let res = [];
    let rmap = new Set();
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
const leftExtensions = (str, pat) => {
    let res = new Set();
    let fromIdx = 1;
    let pos = str.indexOf(pat, fromIdx);
    while (pos !== -1) {
        res.add(str[pos - 1]);
        pos = str.indexOf(pat, pos + 1);
    }
    return [...res.keys()];
};
exports.leftExtensions = leftExtensions;
const reverse = (str) => {
    return str.split("").reverse().join("");
};
exports.reverse = reverse;
const rightExtensions = (str, pat) => {
    const rstr = (0, exports.reverse)(str);
    const rpat = (0, exports.reverse)(pat);
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
const lz77 = (str, show_factorid = 1) => {
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
        if (show_factorid >= 0) {
            const last_end = ranges[ranges.length - 1][1];
            ranges.push([last_end + 1, last_end + 1, ["f" + show_factorid]]);
            show_factorid++;
        }
        res.push(ranges);
    }
    return res;
};
exports.lz77 = lz77;
const lz78 = (str, show_factorid = 1) => {
    let d = new Map();
    let res = [];
    for (var i = 0; i < str.length;) {
        let j = i + 1;
        while (j <= str.length && d.has(str.substring(i, j))) {
            j++;
        }
        let row = [];
        if (j - i > 1) {
            const prev = d.get(str.substring(i, j - 1));
            row.push([prev, prev + (j - i - 2)]);
            row.push([i, j - 2]);
        }
        if (j < str.length) {
            row.push([j - 1, j, [str[j - 1], "f" + show_factorid]]);
        }
        else {
            row.push([j - 1, j - 1, ["f" + show_factorid]]);
        }
        show_factorid++;
        res.push(row);
        d.set(str.substring(i, j), i);
        i = j;
    }
    return res;
};
exports.lz78 = lz78;
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
            const sub = str.substr(i, len);
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
    let res = [];
    let beg = 0;
    while (beg < str.length) {
        const factor = (0, exports.findLongestLyndonFactor)(str, beg);
        const len_factor = factor[0] * factor[1];
        res.push([[beg, beg + len_factor - 1, factor[0]]]);
        beg += len_factor;
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
    const suffixes = [...Array(str.length).keys()].map((i) => str.substr(i));
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
// next smaller suffixes
const nssArray = (str, rank) => {
    if (rank === undefined)
        rank = (0, exports.rankArray)(str);
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
exports.nssArray = nssArray;
// previous smaller suffixes
const prevArray = (str, rank) => {
    if (rank === undefined)
        rank = (0, exports.rankArray)(str);
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
     * @param font_size font size
     * @param font_type font name
     */
    constructor(canvas, font_size = 32, font_type = 'Courier') {
        this.canvas = canvas;
        this.font_size = font_size;
        this.font_size_half = this.font_size / 2;
        this.font_type = font_type;
        this.ctx = canvas.getContext('2d');
        this.str_x = this.font_size;
        this.str_y = this.font_size * 2 + this.font_size_half;
        this.range_beg_offset = -this.font_size / 4;
        this.range_end_offset = this.font_size / 4;
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
        return this.str_x + this.font_size * idx + this.range_beg_offset;
    }
    /**
     * Returns the x-coordinate which is a ending of a range.
     *
     * @param idx index of a range
     * @return The x-coordinate of a range ending at `idx`
     */
    rangeEnd(idx) {
        return this.str_x + this.font_size * idx + this.range_end_offset;
    }
    /**
     * Return the height of a given range.
     * @param r A range.
     */
    rangeHeight(r) {
        return r.style === 'str' ? this.font_size : Math.round(this.font_size * 0.5);
    }
    /**
     * For a range not to draw strings, split it to three parts left, center, and right.
     * @param rpx Given range to split.
     */
    splitRangePx(rpx) {
        const styles = rpx.style.split(',');
        let rl = Object.assign({}, rpx);
        let rc = Object.assign({}, rpx);
        let rr = Object.assign({}, rpx);
        rl.x_end = rpx.x_beg + this.curve_d();
        rl.style = styles[0];
        rr.x_beg = rpx.x_end;
        rr.x_end = rpx.x_end - this.curve_d();
        rr.style = styles.length > 1 ? styles[1] : styles[0];
        rc.x_beg = rl.x_end;
        rc.x_end = rr.x_end;
        rc.style = 'line';
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
        return this.font_size_half / 2;
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
        if (rpx.style == 'line') {
            this.drawLinePxPart(rpx);
        }
        else if (rpx.style == 'curve') {
            this.drawCurvePart(rpx);
        }
        else if (rpx.style == 'arrow') {
            this.drawArrowPxPart(rpx);
        }
    }
    /**
     * Draw range.
     * @param rpx A range to draw.
     */
    drawRangePx(rpx) {
        if (rpx.style == 'line') {
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
            const cx = this.str_x + (r.beg + i) * this.font_size;
            this.ctx.fillText(c, cx, y + this.font_size * 0.3, this.font_size);
            this.ctx.beginPath();
            this.ctx.rect(cx - this.font_size_half, y - this.font_size_half, this.font_size, this.font_size);
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
        let rpx = {
            x_beg: this.rangeBeg(r.beg),
            x_end: this.rangeEnd(r.end),
            y: y,
            style: r.style,
            color: r.color,
            str: r.str,
        };
        if (r.style == 'str') {
            this.drawStr(r, y);
        }
        else if (r.step === undefined) {
            this.drawRangePx(rpx);
        }
        else {
            let x_beg = this.rangeBeg(r.beg);
            for (let cur = r.beg + r.step - 1; cur < r.end; cur += r.step) {
                rpx.x_end = this.str_x + this.font_size * cur + this.font_size_half;
                this.drawRangePx(rpx);
                rpx.x_beg = rpx.x_end;
            }
            if ((r.end - r.beg + 1) % r.step === 0) {
                rpx.x_end = this.rangeEnd(r.end);
                this.drawRangePx(rpx);
            }
            else {
                // There is an uncomplete range.
                rpx.x_end = this.str_x + this.font_size * r.end + this.font_size_half;
                rpx.style = r.style.split(',')[0] + ',line';
                this.drawRangePx(rpx);
            }
        }
    }
    /**
     * Draw ranges.
     * @param range_rows Ranges to draw.
     */
    drawRanges(range_rows) {
        let ypx = this.str_y;
        for (const ranges of range_rows) {
            const height = Math.max(...ranges.map(r => this.rangeHeight(r)));
            for (const range of ranges) {
                this.drawRange(range, ypx + height / 2);
            }
            ypx += height;
        }
    }
    /**
     * Draw an input string.
     */
    drawInputStr(input_str) {
        let index = ['i'];
        for (let i = 0; i < input_str.length; i++)
            index.push('' + i);
        let r = {
            style: 'str',
            color: '#000000',
            beg: -1,
            end: input_str.length - 1,
            str: index,
        };
        this.drawRange(r, this.str_y - this.font_size - this.font_size_half);
        const chars = ['Str'];
        for (let i = 0; i < input_str.length; i++)
            chars.push(input_str.substring(i, i + 1));
        r.str = chars;
        this.drawRange(r, this.str_y - this.font_size_half);
    }
    /**
     * Draw a given string and ranges.
     * @param input_str Input string to draw.
     * @param rss The ranges to draw which are related to a given string `input_str`
     */
    draw(input_str, rss) {
        let range_bound = [-1, input_str.length - 1];
        rss.forEach(rs => rs.forEach(r => (range_bound = [
            Math.min(range_bound[0], r.beg),
            Math.max(range_bound[1], r.end),
        ])));
        this.str_x = this.font_size + Math.abs(range_bound[0]) * this.font_size;
        this.canvas.width = (range_bound[1] - range_bound[0] + 2) * this.font_size;
        this.canvas.height =
            this.str_y +
                this.font_size_half +
                rss.reduce((acm, rs) => acm + Math.max(...rs.map(r => this.rangeHeight(r))), 0);
        // DPI settings
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        // console.log('dpr', dpr, ' rect', rect)
        this.canvas.width *= dpr;
        this.canvas.height *= dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = this.canvas.width / dpr + 'px';
        this.canvas.style.height = this.canvas.height / dpr + 'px';
        this.ctx.textAlign = 'center';
        this.ctx.lineWidth = 3;
        this.ctx.font = this.font_size + 'px ' + this.font_type;
        this.drawInputStr(input_str);
        this.drawRanges(rss);
    }
    /**
     * Make group that each contains a single range.
     * @param ranges The range list.
     */
    makeSingleGroups(ranges) {
        return ranges.map(range => [range]);
    }
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param Ts The range list.
     * @param rangef The function to return the tuple beginning index and ending index of a given range `Ts[i]`.
     */
    nonOverlapObjs(Ts, rangef) {
        if (Ts.length <= 0)
            return [];
        const ends = Ts.map(t => rangef(t)[1]);
        const n = Math.max(...ends) + 1;
        let used = new Array(n);
        used.fill(false);
        let res = [];
        let rows = [];
        for (const t of Ts) {
            // check whether or not a range can be inserted to the current row.
            let used_any = false;
            for (let i = rangef(t)[0]; i <= rangef(t)[1]; i++) {
                used_any = used_any || used[i];
            }
            if (used_any) {
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
        return this.nonOverlapObjs(rs, r => [r.beg, r.end]);
    }
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param rs The range list.
     */
    nonOverlapRangesSimple(rs) {
        return this.nonOverlapObjs(rs, x => [x[0], x[1]]);
    }
    /**
     * Return the range list `rs` specified with the style `style`.
     * @param rs The range list.
     * @param style The style of the ranges `rs` to draw.
     */
    makeGroupRangesAutoColor(rs, style) {
        let res = [];
        for (let i = 0; i < rs.length; i++) {
            const color = '#' + color_convert_1.default.hsv.hex([(i * 360) / rs.length, 80, 80]);
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
        return ranges.map(range => {
            const is_str = typeof range[2] !== 'undefined' && typeof range[2] !== 'number';
            const step = typeof range[2] === 'number' ? range[2] : undefined;
            const str = typeof range[2] !== 'number' ? range[2] : undefined;
            return {
                style: is_str ? 'str' : style,
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
            color: '#' + color_convert_1.default.hsv.hex([(i * 360) / rs.length, 80, 80]),
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
const strlib = __importStar(__webpack_require__(/*! ./strlib */ "./src/strlib.ts"));
const radioValue = (selector) => {
    let res = "";
    const elms = document.querySelectorAll(selector);
    for (let i = 0; i < elms.length; i++) {
        if (elms[i].checked)
            res = elms[i].value;
    }
    return res;
};
const draw = (e) => {
    // get font size
    let font_size = parseInt(radioValue("[name=font_size]"));
    // get line style
    let range_style = radioValue("[name=line_style]");
    const line_style_right = radioValue("[name=line_style_right]");
    range_style += line_style_right.length === 0 ? "" : "," + line_style_right;
    let visualize = radioValue("[name=visualize]");
    console.log(`font_size=${font_size}, line_style=${range_style}, visualize=${visualize}`);
    // get input string
    const elm = document.querySelector("#input_str");
    let input_str = elm.value;
    // get canvas
    const canvas = document.querySelector("#canvas");
    // canvas.width = window.innerWidth - 50
    const visStr = new vis_str_1.VisStr(canvas, (font_size = font_size));
    // compute ranges
    let rangesp = [];
    let ranges_group = [];
    let ranges = [];
    const show_effective_alphabet = document.getElementById("effective_alphabet").checked;
    const show_rank_array = document.getElementById("rank_array").checked;
    if (show_effective_alphabet) {
        ranges_group.push([
            [
                -1,
                input_str.length - 1,
                ["eStr", ...strlib.replaceEffectiveAlphabet(input_str)],
            ],
        ]);
    }
    if (show_rank_array) {
        ranges_group.push([
            [-1, input_str.length - 1, ["rank", ...strlib.rankArray(input_str)]],
        ]);
    }
    if (visualize === "runs" ||
        visualize === "palindromes" ||
        visualize === "squares" ||
        visualize === "rmostsquares" ||
        visualize === "lmostsquares") {
        if (visualize === "runs") {
            rangesp = strlib.enumRuns(input_str);
        }
        else if (visualize === "palindromes") {
            rangesp = strlib.enumPalindromes(input_str);
        }
        else if (visualize === "squares") {
            rangesp = strlib.enumSquares(input_str);
        }
        else if (visualize === "rmostsquares") {
            rangesp = strlib.enumRightmostSquares(input_str);
        }
        else if (visualize === "lmostsquares") {
            rangesp = strlib.enumLeftmostSquares(input_str);
        }
        console.log("rangesp", rangesp);
        ranges_group = ranges_group.concat(visStr.nonOverlapRangesSimple(rangesp));
        console.log("range_group", ranges_group);
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        console.log("rangesp", ranges);
    }
    else {
        if (visualize === "lpf")
            ranges_group = ranges_group.concat(strlib.enumPrevOccLPF(input_str));
        else if (visualize === "left_maximal")
            ranges_group = ranges_group.concat(strlib.enumIfGroup(input_str, strlib.isLeftMaximal));
        else if (visualize === "right_maximal")
            ranges_group = ranges_group.concat(strlib.enumIfGroup(input_str, strlib.isRightMaximal));
        else if (visualize === "max_repeat")
            ranges_group = ranges_group.concat(strlib.enumIfGroup(input_str, strlib.isMaxRepeat));
        else if (visualize === "lz77")
            ranges_group = ranges_group.concat(strlib.lz77(input_str));
        else if (visualize === "lz78")
            ranges_group = ranges_group.concat(strlib.lz78(input_str));
        else if (visualize === "lyndon_factorization")
            ranges_group = ranges_group.concat(strlib.lyndonFactorization(input_str));
        else if (visualize === "lyndon_array")
            ranges_group = ranges_group.concat(strlib.lyndonArray(input_str));
        else if (visualize === "enum_lyndon")
            ranges_group = ranges_group.concat(strlib.enumLyndon(input_str));
        else if (visualize === "prev_smaller_suffix")
            ranges_group = ranges_group.concat(strlib.prevSmallerSuffixes(input_str));
        else if (visualize === "next_smaller_suffix")
            ranges_group = ranges_group.concat(strlib.nextSmallerSuffixes(input_str));
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        ranges = strlib.flat(ranges.map((x) => visStr.nonOverlapRanges(x)));
    }
    visStr.draw(input_str, ranges);
};
const selectorAddEvent = (selector, event, func) => {
    const elms = document.querySelectorAll(selector);
    for (let i = 0; i < elms.length; i++) {
        elms[i].addEventListener(event, func);
    }
};
const main = () => {
    const input_str = document.getElementById("input_str");
    input_str.addEventListener("input", draw);
    input_str.addEventListener("propertychange", draw);
    // add event for radio buttons
    selectorAddEvent("[name=font_size]", "click", draw);
    selectorAddEvent("[name=line_style]", "click", draw);
    selectorAddEvent("[name=line_style_right]", "click", draw);
    selectorAddEvent("[name=visualize]", "click", draw);
    selectorAddEvent("[type=checkbox]", "click", draw);
    // draw initially.
    input_str.dispatchEvent(new CustomEvent("propertychange", { detail: "init event" }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUSxRQUFRLFFBQVE7QUFDcEM7O0FBRUEsWUFBWSxRQUFRLFFBQVEsUUFBUTtBQUNwQzs7QUFFQSxZQUFZLFFBQVEsUUFBUSxPQUFPO0FBQ25DOztBQUVBLFlBQVksUUFBUSxRQUFRLE9BQU87QUFDbkM7O0FBRUEsWUFBWSxRQUFRLFFBQVEsT0FBTztBQUNuQzs7QUFFQSxZQUFZLFFBQVEsUUFBUSxPQUFPO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwRUFBMEU7O0FBRTFFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCxFQUFFLFNBQVMsRUFBRTtBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsYUFBYSxhQUFhO0FBQzFDOztBQUVBO0FBQ0EsZ0JBQWdCLGFBQWEsYUFBYTtBQUMxQzs7QUFFQTtBQUNBLGdCQUFnQixhQUFhLGFBQWE7QUFDMUM7O0FBRUE7QUFDQSxnQkFBZ0IsYUFBYSxhQUFhO0FBQzFDOztBQUVBO0FBQ0EsZ0JBQWdCLGFBQWEsYUFBYTtBQUMxQzs7QUFFQTtBQUNBLGdCQUFnQixhQUFhO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbjlCMkM7QUFDWjs7QUFFL0I7O0FBRUEsMkJBQTJCLHVEQUFXOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0EsYUFBYSxRQUFRLGlCQUFpQixZQUFZO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3REFBd0QsT0FBTyx1REFBVyxxQkFBcUI7QUFDL0Ysc0RBQXNELE9BQU8sdURBQVcsbUJBQW1COztBQUUzRixnQkFBZ0IscURBQUs7QUFDckI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRm9COztBQUUzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVEQUFXOztBQUV2QyxXQUFXLFFBQVEsaUJBQWlCLFlBQVk7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0MsdURBQVc7O0FBRTNDLFlBQVksUUFBUSxvQkFBb0IsWUFBWTtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSx1REFBVzs7QUFFckI7QUFDQTtBQUNBO0FBQ0EsWUFBWSx1REFBVztBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFFBQVEsaUJBQWlCLFlBQVk7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNqR3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlFQUFlLHFCQUFxQixFOzs7Ozs7VUN4SnBDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUM1QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQSxFOzs7VUNQQSx5Rjs7O1VDQUE7VUFDQTtVQUNBLHNEQUFzRCxpQkFBaUI7VUFDdkUsZ0RBQWdELGFBQWE7VUFDN0QsRTs7OztVRUpBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlzc3RyLy4vc3JjL3N0cmxpYi50cyIsIndlYnBhY2s6Ly92aXNzdHIvLi9zcmMvdmlzX3N0ci50cyIsIndlYnBhY2s6Ly92aXNzdHIvLi9zcmMvdmlzX3N0cl9kZW1vLnRzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2NvbnZlcnNpb25zLmpzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2luZGV4LmpzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L3JvdXRlLmpzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1uYW1lL2luZGV4LmpzIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92aXNzdHIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmlzc3RyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSYW5nZVNpbXBsZSwgUmFuZ2VMaW5lIH0gZnJvbSBcIi4vdmlzX3N0clwiO1xuXG5leHBvcnQgY29uc3QgaXNQYWxpbmRyb21lID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoIC8gMjsgaSsrKSB7XG4gICAgICAgIGlmIChzdHJbaV0gIT0gc3RyW3N0ci5sZW5ndGggLSBpIC0gMV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgZW51bVBhbGluZHJvbWVzID0gKHN0cjogc3RyaW5nKTogUmFuZ2VMaW5lW10gPT4ge1xuICAgIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICAgIGxldCByZXM6IFJhbmdlTGluZVtdID0gW107XG4gICAgZm9yIChsZXQgbGVuID0gMTsgbGVuIDw9IG47IGxlbisrKSB7XG4gICAgICAgIGZvciAobGV0IGJlZyA9IDA7IGJlZyArIGxlbiA8PSBuOyBiZWcrKykge1xuICAgICAgICAgICAgaWYgKGlzUGFsaW5kcm9tZShzdHIuc3Vic3RyaW5nKGJlZywgYmVnICsgbGVuKSkpXG4gICAgICAgICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgbGVuIC0gMV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZmxhdCA9IDxUPihhcnI6IFRbXVtdKTogVFtdID0+IHtcbiAgICByZXR1cm4gYXJyLnJlZHVjZSgoYWNtLCB4KSA9PiBhY20uY29uY2F0KHgpLCBbXSBhcyBUW10pO1xufTtcblxuZXhwb3J0IGNvbnN0IHN1YnN0cmluZ3MgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gICAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gICAgbGV0IHJlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8PSBuOyBqKyspIHJlcy5hZGQoc3RyLnN1YnN0cmluZyhpLCBqKSk7XG4gICAgfVxuICAgIHJldHVybiBbLi4ucmVzLmtleXMoKV07XG59O1xuXG5leHBvcnQgY29uc3QgZmluZEFsbCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgICBjb25zdCBtID0gcGF0Lmxlbmd0aDtcbiAgICBsZXQgcmVzOiBSYW5nZVNpbXBsZVtdID0gW107XG4gICAgbGV0IHBvcyA9IHN0ci5pbmRleE9mKHBhdCk7XG4gICAgd2hpbGUgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgcmVzLnB1c2goW3BvcywgcG9zICsgbSAtIDFdKTtcbiAgICAgICAgcG9zID0gc3RyLmluZGV4T2YocGF0LCBwb3MgKyAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBsY3AgPSAoc3RyOiBzdHJpbmcsIGk6IG51bWJlciwgajogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICBsZXQgbiA9IHN0ci5sZW5ndGg7XG4gICAgbGV0IG1hdGNoX2xlbiA9IDA7XG4gICAgd2hpbGUgKGkgKyBtYXRjaF9sZW4gPCBuICYmIGogKyBtYXRjaF9sZW4gPCBuKSB7XG4gICAgICAgIGlmIChzdHJbaSArIG1hdGNoX2xlbl0gPT0gc3RyW2ogKyBtYXRjaF9sZW5dKSBtYXRjaF9sZW4rKztcbiAgICAgICAgZWxzZSBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoX2xlbjtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmV2T2NjTFBGID0gKHN0cjogc3RyaW5nKTogW251bWJlcltdLCBudW1iZXJbXV0gPT4ge1xuICAgIGxldCBwcmV2T2NjID0gW107XG4gICAgbGV0IGxwZiA9IFtdO1xuICAgIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGxldCBwb2NjeCA9IC0xO1xuICAgICAgICBsZXQgbHBmeCA9IDA7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaTsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBsID0gbGNwKHN0ciwgaSwgaik7XG4gICAgICAgICAgICBpZiAobHBmeCA8IGwpIHtcbiAgICAgICAgICAgICAgICBscGZ4ID0gbDtcbiAgICAgICAgICAgICAgICBwb2NjeCA9IGo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJldk9jYy5wdXNoKHBvY2N4KTtcbiAgICAgICAgbHBmLnB1c2gobHBmeCk7XG4gICAgfVxuICAgIHJldHVybiBbcHJldk9jYywgbHBmXTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtUHJldk9jY0xQRiA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gICAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gICAgY29uc3QgW3ByZXZPY2MsIGxwZl0gPSBwcmV2T2NjTFBGKHN0cik7XG4gICAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW1xuICAgICAgICBbWy0xLCBuIC0gMSwgW1wib2NjXCJdLmNvbmNhdChwcmV2T2NjLm1hcCgoeCkgPT4geC50b1N0cmluZygpKSldXSxcbiAgICAgICAgW1stMSwgbiAtIDEsIFtcImxlblwiXS5jb25jYXQobHBmLm1hcCgoeCkgPT4geC50b1N0cmluZygpKSldXSxcbiAgICBdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldk9jYy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobHBmW2ldID4gMCkge1xuICAgICAgICAgICAgcmVzLnB1c2goW1xuICAgICAgICAgICAgICAgIFtpLCBpICsgbHBmW2ldIC0gMV0sXG4gICAgICAgICAgICAgICAgW3ByZXZPY2NbaV0sIHByZXZPY2NbaV0gKyBscGZbaV0gLSAxXSxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgaXNTcXVhcmUgPSAoczogc3RyaW5nLCBiZWc6IG51bWJlciwgcDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwOyBpKyspIHtcbiAgICAgICAgaWYgKHNbYmVnICsgaV0gIT0gc1tiZWcgKyBwICsgaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgZW51bVNxdWFyZXMgPSAoczogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXSA9PiB7XG4gICAgY29uc3QgbiA9IHMubGVuZ3RoO1xuICAgIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICBmb3IgKGxldCBwID0gMTsgcCA8IG47IHArKykge1xuICAgICAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCAyICogcDsgb2Zmc2V0KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGJlZyA9IG9mZnNldDsgYmVnIDwgbiAtIDIgKiBwICsgMTsgYmVnICs9IDIgKiBwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3F1YXJlKHMsIGJlZywgcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgMiAqIHAgLSAxLCBwXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgaXNSaWdodG1vc3RTcXVhcmUgPSAoXG4gICAgczogc3RyaW5nLFxuICAgIGJlZzogbnVtYmVyLFxuICAgIHA6IG51bWJlclxuKTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKCFpc1NxdWFyZShzLCBiZWcsIHApKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICFzLmluY2x1ZGVzKHMuc3Vic3RyKGJlZywgMiAqIHApLCBiZWcgKyAxKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0xlZnRtb3N0U3F1YXJlID0gKFxuICAgIHM6IHN0cmluZyxcbiAgICBiZWc6IG51bWJlcixcbiAgICBwOiBudW1iZXJcbik6IGJvb2xlYW4gPT4ge1xuICAgIGlmICghaXNTcXVhcmUocywgYmVnLCBwKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAhcy5zdWJzdHIoMCwgYmVnICsgMiAqIHAgLSAxKS5pbmNsdWRlcyhzLnN1YnN0cihiZWcsIDIgKiBwKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZW51bVJpZ2h0bW9zdFNxdWFyZXMgPSAoczogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXSA9PiB7XG4gICAgY29uc3QgbiA9IHMubGVuZ3RoO1xuICAgIGxldCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICBmb3IgKGxldCBwID0gMTsgcCA8IG47IHArKykge1xuICAgICAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCAyICogcDsgb2Zmc2V0KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGJlZyA9IG9mZnNldDsgYmVnIDwgbiAtIDIgKiBwICsgMTsgYmVnICs9IDIgKiBwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUmlnaHRtb3N0U3F1YXJlKHMsIGJlZywgcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgMiAqIHAgLSAxLCBwXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZW51bUxlZnRtb3N0U3F1YXJlcyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgICBjb25zdCBuID0gcy5sZW5ndGg7XG4gICAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICAgIGZvciAobGV0IHAgPSAxOyBwIDwgbjsgcCsrKSB7XG4gICAgICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IDIgKiBwOyBvZmZzZXQrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgYmVnID0gb2Zmc2V0OyBiZWcgPCBuIC0gMiAqIHAgKyAxOyBiZWcgKz0gMiAqIHApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0bW9zdFNxdWFyZShzLCBiZWcsIHApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKFtiZWcsIGJlZyArIDIgKiBwIC0gMSwgcF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzUnVuID0gKHM6IHN0cmluZywgYmVnOiBudW1iZXIsIHA6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICAgIGlmIChiZWcgPiAwICYmIHNbYmVnIC0gMV0gPT0gc1tiZWcgKyBwIC0gMV0pIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHA7IGkrKykge1xuICAgICAgICBpZiAoc1tiZWcgKyBpXSAhPSBzW2JlZyArIHAgKyBpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtUnVucyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgICBjb25zdCBuID0gcy5sZW5ndGg7XG4gICAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICAgIGxldCBybWFwID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgZm9yIChsZXQgcCA9IDE7IHAgPCBuOyBwKyspIHtcbiAgICAgICAgZm9yIChsZXQgYmVnID0gMDsgYmVnICsgMiAqIHAgPD0gbjsgYmVnKyspIHtcbiAgICAgICAgICAgIGlmIChpc1J1bihzLCBiZWcsIHApKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gMiAqIHA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG1hdGNoIDwgbiAmJiBzW2JlZyArIChtYXRjaCAlIHApXSA9PSBzW2JlZyArIG1hdGNoXSkge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBiZWcgKyBcIixcIiArIChiZWcgKyBtYXRjaCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmICghcm1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChbYmVnLCBiZWcgKyBtYXRjaCAtIDEsIHBdKTtcbiAgICAgICAgICAgICAgICAgICAgcm1hcC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBsZWZ0RXh0ZW5zaW9ucyA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gICAgbGV0IHJlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGxldCBmcm9tSWR4ID0gMTtcbiAgICBsZXQgcG9zID0gc3RyLmluZGV4T2YocGF0LCBmcm9tSWR4KTtcbiAgICB3aGlsZSAocG9zICE9PSAtMSkge1xuICAgICAgICByZXMuYWRkKHN0cltwb3MgLSAxXSk7XG4gICAgICAgIHBvcyA9IHN0ci5pbmRleE9mKHBhdCwgcG9zICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBbLi4ucmVzLmtleXMoKV07XG59O1xuXG5leHBvcnQgY29uc3QgcmV2ZXJzZSA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCByaWdodEV4dGVuc2lvbnMgPSAoc3RyOiBzdHJpbmcsIHBhdDogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xuICAgIGNvbnN0IHJzdHIgPSByZXZlcnNlKHN0cik7XG4gICAgY29uc3QgcnBhdCA9IHJldmVyc2UocGF0KTtcbiAgICByZXR1cm4gbGVmdEV4dGVuc2lvbnMocnN0ciwgcnBhdCk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNMZWZ0TWF4aW1hbCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gbGVmdEV4dGVuc2lvbnMoc3RyLCBwYXQpLmxlbmd0aCA+IDE7XG59O1xuXG5leHBvcnQgY29uc3QgaXNSaWdodE1heGltYWwgPSAoc3RyOiBzdHJpbmcsIHBhdDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHJpZ2h0RXh0ZW5zaW9ucyhzdHIsIHBhdCkubGVuZ3RoID4gMTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc01heFJlcGVhdCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gaXNMZWZ0TWF4aW1hbChzdHIsIHBhdCkgJiYgaXNSaWdodE1heGltYWwoc3RyLCBwYXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IGx6NzcgPSAoXG4gICAgc3RyOiBzdHJpbmcsXG4gICAgc2hvd19mYWN0b3JpZDogbnVtYmVyID0gMVxuKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgICBjb25zdCBuID0gc3RyLmxlbmd0aDtcbiAgICBjb25zdCBbb2NjcywgbGVuc10gPSBwcmV2T2NjTFBGKHN0cik7XG4gICAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKSB7XG4gICAgICAgIGxldCByYW5nZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICAgICAgaWYgKG9jY3NbaV0gPT09IC0xKSB7XG4gICAgICAgICAgICByYW5nZXMgPSBbW2ksIGksIFtzdHJbaV1dXV07XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYW5nZXMgPSBbXG4gICAgICAgICAgICAgICAgW29jY3NbaV0sIG9jY3NbaV0gKyBsZW5zW2ldIC0gMV0sXG4gICAgICAgICAgICAgICAgW2ksIGkgKyBsZW5zW2ldIC0gMV0sXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaSArPSBsZW5zW2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaG93X2ZhY3RvcmlkID49IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RfZW5kID0gcmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXVsxXTtcbiAgICAgICAgICAgIHJhbmdlcy5wdXNoKFtsYXN0X2VuZCArIDEsIGxhc3RfZW5kICsgMSwgW1wiZlwiICsgc2hvd19mYWN0b3JpZF1dKTtcbiAgICAgICAgICAgIHNob3dfZmFjdG9yaWQrKztcbiAgICAgICAgfVxuICAgICAgICByZXMucHVzaChyYW5nZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGx6NzggPSAoc3RyOiBzdHJpbmcsIHNob3dfZmFjdG9yaWQgPSAxKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgICBsZXQgZCA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gICAgbGV0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyApIHtcbiAgICAgICAgbGV0IGogPSBpICsgMTtcbiAgICAgICAgd2hpbGUgKGogPD0gc3RyLmxlbmd0aCAmJiBkLmhhcyhzdHIuc3Vic3RyaW5nKGksIGopKSkge1xuICAgICAgICAgICAgaisrO1xuICAgICAgICB9XG4gICAgICAgIGxldCByb3c6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICAgICAgaWYgKGogLSBpID4gMSkge1xuICAgICAgICAgICAgY29uc3QgcHJldiA9IGQuZ2V0KHN0ci5zdWJzdHJpbmcoaSwgaiAtIDEpKSBhcyBudW1iZXI7XG4gICAgICAgICAgICByb3cucHVzaChbcHJldiwgcHJldiArIChqIC0gaSAtIDIpXSk7XG4gICAgICAgICAgICByb3cucHVzaChbaSwgaiAtIDJdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaiA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKFtqIC0gMSwgaiwgW3N0cltqIC0gMV0sIFwiZlwiICsgc2hvd19mYWN0b3JpZF1dKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKFtqIC0gMSwgaiAtIDEsIFtcImZcIiArIHNob3dfZmFjdG9yaWRdXSk7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd19mYWN0b3JpZCsrO1xuICAgICAgICByZXMucHVzaChyb3cpO1xuICAgICAgICBkLnNldChzdHIuc3Vic3RyaW5nKGksIGopLCBpKTtcbiAgICAgICAgaSA9IGo7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgaXNMeW5kb24gPSAoc3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbGVzc3RoYW4gPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdHIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGoyID0gKGkgKyBqKSAlIHN0ci5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoc3RyW2pdID4gc3RyW2oyXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgZWxzZSBpZiAoc3RyW2pdIDwgc3RyW2oyXSkge1xuICAgICAgICAgICAgICAgIGxlc3N0aGFuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWxlc3N0aGFuKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGVudW1MeW5kb24gPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICAgIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gICAgZm9yIChsZXQgbGVuID0gMTsgbGVuIDw9IHN0ci5sZW5ndGg7IGxlbisrKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwOiBSYW5nZVNpbXBsZVtdID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpICsgbGVuIDw9IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc3ViID0gc3RyLnN1YnN0cihpLCBsZW4pO1xuICAgICAgICAgICAgaWYgKGlzTHluZG9uKHN1YikpIGdyb3VwLnB1c2goW2ksIGkgKyBsZW4gLSAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwLmxlbmd0aCA+IDApIHJlcy5wdXNoKGdyb3VwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbi8vIER1dmFsJ3MgYWxnb3JpdGhtXG4vLyBmaW5kIGxvbmdlc3QgbHluZG9uIGZhY3RvciB3aGljaCBzdGFydHMgYXQgYmVnIGluIHN0ci5cbi8vIHJldHVybiBbbGVuLCByZXBlYXRdLCB3aGVyZVxuLy8gbGVuIGlzIHRoZSBsZW5ndGggb2YgdGhlIGZhY3Rvcixcbi8vIHJlcGVhdCBpcyB0aGUgbWF4aW11bSByZXBlYXQgb2YgdGhlIGZhY3Rvci5cbmV4cG9ydCBjb25zdCBmaW5kTG9uZ2VzdEx5bmRvbkZhY3RvciA9IChcbiAgICBzdHI6IHN0cmluZyxcbiAgICBiZWc6IG51bWJlclxuKTogW251bWJlciwgbnVtYmVyXSA9PiB7XG4gICAgbGV0IGkgPSBiZWc7XG4gICAgbGV0IGVuZCA9IGJlZyArIDE7XG4gICAgd2hpbGUgKGVuZCA8IHN0ci5sZW5ndGggJiYgc3RyW2ldIDw9IHN0cltlbmRdKSB7XG4gICAgICAgIGlmIChzdHJbaV0gPT09IHN0cltlbmRdKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBlbmQrKztcbiAgICAgICAgfSBlbHNlIGlmIChzdHJbaV0gPCBzdHJbZW5kXSkge1xuICAgICAgICAgICAgLy8gc3RyW2JlZy4uLmVuZF0gaXMgTHluZG9uIHN0cmluZ1xuICAgICAgICAgICAgaSA9IGJlZztcbiAgICAgICAgICAgIGVuZCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHN0cltiZWcuLi5lbmQtMV0gaXMgdGhlIGxvbmdlc3QgTHluZG9uIHByZWZpeCBvZiBzdHJbYmVnLi4uXS5cbiAgICBjb25zdCBsZW4gPSBlbmQgLSBpO1xuICAgIGNvbnN0IHJlcGVhdCA9IE1hdGguZmxvb3IoKGVuZCAtIGJlZykgLyAoZW5kIC0gaSkpO1xuICAgIHJldHVybiBbbGVuLCByZXBlYXRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGx5bmRvbkZhY3Rvcml6YXRpb24gPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICAgIGxldCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICAgIGxldCBiZWcgPSAwO1xuXG4gICAgd2hpbGUgKGJlZyA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZmFjdG9yID0gZmluZExvbmdlc3RMeW5kb25GYWN0b3Ioc3RyLCBiZWcpO1xuICAgICAgICBjb25zdCBsZW5fZmFjdG9yID0gZmFjdG9yWzBdICogZmFjdG9yWzFdO1xuICAgICAgICByZXMucHVzaChbW2JlZywgYmVnICsgbGVuX2ZhY3RvciAtIDEsIGZhY3RvclswXV1dIGFzIFJhbmdlU2ltcGxlW10pO1xuICAgICAgICBiZWcgKz0gbGVuX2ZhY3RvcjtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBseW5kb25BcnJheSA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gICAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBmYWN0b3IgPSBmaW5kTG9uZ2VzdEx5bmRvbkZhY3RvcihzdHIsIGkpO1xuICAgICAgICByZXMucHVzaChbW2ksIGkgKyBmYWN0b3JbMF0gLSAxXV0gYXMgUmFuZ2VTaW1wbGVbXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59O1xuXG4vLyByZXBsYWNlIHRoZSBjaGFyYWN0ZXJzIHRvIGVmZmVjdGl2ZSBhbHBoYWJldCBbMCwgc2lnbWEtMV1cbi8vIHNpZ21hIGlzIHRoZSBudW1iZXIgb2YgZGlzdGluY3QgY2hhcmFjdGVycyBvZiBnaXZlbiBzdHJpbmdcbi8vIHNpZ21hIG11c3QgYmUgbGVzcyB0aGFuIDEwXG5leHBvcnQgY29uc3QgcmVwbGFjZUVmZmVjdGl2ZUFscGhhYmV0ID0gKHN0cjogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xuICAgIGNvbnN0IGNoYXJzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIGNoYXJzLmFkZChzdHJbaV0pO1xuICAgIGNvbnN0IGFyciA9IEFycmF5LmZyb20oY2hhcnMudmFsdWVzKCkpO1xuICAgIGFyci5zb3J0KCk7XG4gICAgY29uc3QgcmVwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICBhcnIubWFwKChjLCBpKSA9PiByZXAuc2V0KGMsIGkudG9TdHJpbmcoKSkpO1xuICAgIGNvbnN0IHJlcHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykgcmVwcy5wdXNoKHJlcC5nZXQoc3RyW2ldKSBhcyBzdHJpbmcpO1xuICAgIHJldHVybiByZXBzO1xufTtcblxuZXhwb3J0IGNvbnN0IHN1ZmZpeEFycmF5ID0gKHN0cjogc3RyaW5nKTogbnVtYmVyW10gPT4ge1xuICAgIGNvbnN0IHN1ZmZpeGVzID0gWy4uLkFycmF5KHN0ci5sZW5ndGgpLmtleXMoKV0ubWFwKChpKSA9PiBzdHIuc3Vic3RyKGkpKTtcbiAgICBzdWZmaXhlcy5zb3J0KCk7XG4gICAgcmV0dXJuIHN1ZmZpeGVzLm1hcCgocykgPT4gc3RyLmxlbmd0aCAtIHMubGVuZ3RoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByYW5rQXJyYXkgPSAoc3RyOiBzdHJpbmcsIHNhPzogbnVtYmVyW10pID0+IHtcbiAgICBpZiAoc2EgPT09IHVuZGVmaW5lZCkgc2EgPSBzdWZmaXhBcnJheShzdHIpO1xuICAgIGNvbnN0IHJhbmsgPSBBcnJheShzdHIubGVuZ3RoKTtcbiAgICBzYS5mb3JFYWNoKChwb3MsIHIpID0+IChyYW5rW3Bvc10gPSByKSk7XG4gICAgcmV0dXJuIHJhbms7XG59O1xuXG4vLyBuZXh0IHNtYWxsZXIgc3VmZml4ZXNcbmV4cG9ydCBjb25zdCBuc3NBcnJheSA9IChzdHI6IHN0cmluZywgcmFuaz86IG51bWJlcltdKSA9PiB7XG4gICAgaWYgKHJhbmsgPT09IHVuZGVmaW5lZCkgcmFuayA9IHJhbmtBcnJheShzdHIpO1xuICAgIGNvbnN0IG4gPSByYW5rLmxlbmd0aDtcbiAgICBjb25zdCBuc3NhID0gbmV3IEFycmF5KG4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGxldCBuc3MgPSBuO1xuICAgICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChyYW5rW2ldID4gcmFua1tqXSkge1xuICAgICAgICAgICAgICAgIG5zcyA9IGo7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbnNzYVtpXSA9IG5zcztcbiAgICB9XG4gICAgcmV0dXJuIG5zc2E7XG59O1xuXG4vLyBwcmV2aW91cyBzbWFsbGVyIHN1ZmZpeGVzXG5leHBvcnQgY29uc3QgcHJldkFycmF5ID0gKHN0cjogc3RyaW5nLCByYW5rPzogbnVtYmVyW10pID0+IHtcbiAgICBpZiAocmFuayA9PT0gdW5kZWZpbmVkKSByYW5rID0gcmFua0FycmF5KHN0cik7XG4gICAgY29uc3QgbiA9IHJhbmsubGVuZ3RoO1xuICAgIGNvbnN0IHBzc2EgPSBuZXcgQXJyYXkobik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgbGV0IHBzcyA9IC0xO1xuICAgICAgICBmb3IgKGxldCBqID0gaSAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICBpZiAocmFua1tpXSA+IHJhbmtbal0pIHtcbiAgICAgICAgICAgICAgICBwc3MgPSBqO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBzc2FbaV0gPSBwc3M7XG4gICAgfVxuICAgIHJldHVybiBwc3NhO1xufTtcblxuZXhwb3J0IGNvbnN0IG5leHRTbWFsbGVyU3VmZml4ZXMgPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICAgIGNvbnN0IG5zc2EgPSBuc3NBcnJheShzdHIpO1xuICAgIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZ3JvdXA6IFJhbmdlU2ltcGxlW10gPSBbW2ksIG5zc2FbaV1dXTtcbiAgICAgICAgaWYgKGdyb3VwLmxlbmd0aCA+IDApIHJlcy5wdXNoKGdyb3VwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBwcmV2U21hbGxlclN1ZmZpeGVzID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgICBjb25zdCBwc3NhID0gcHJldkFycmF5KHN0cik7XG4gICAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBncm91cDogUmFuZ2VTaW1wbGVbXSA9IFtbcHNzYVtpXSwgaV1dO1xuICAgICAgICBpZiAoZ3JvdXAubGVuZ3RoID4gMCkgcmVzLnB1c2goZ3JvdXApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGVudW1JZiA9IChcbiAgICBzdHI6IHN0cmluZyxcbiAgICBjaGVjazogKHM6IHN0cmluZywgcDogc3RyaW5nKSA9PiBib29sZWFuXG4pOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgICByZXR1cm4gZmxhdChlbnVtSWZHcm91cChzdHIsIGNoZWNrKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZW51bUlmR3JvdXAgPSAoXG4gICAgc3RyOiBzdHJpbmcsXG4gICAgY2hlY2s6IChzOiBzdHJpbmcsIHA6IHN0cmluZykgPT4gYm9vbGVhblxuKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgICByZXR1cm4gc3Vic3RyaW5ncyhzdHIpXG4gICAgICAgIC5maWx0ZXIoKHApID0+IGNoZWNrKHN0ciwgcCkpXG4gICAgICAgIC5tYXAoKHApID0+IGZpbmRBbGwoc3RyLCBwKSk7XG59O1xuIiwiaW1wb3J0IGNvbnZlcnQgZnJvbSAnY29sb3ItY29udmVydCdcblxuLyoqIFRoZSBzaW1wbGUgcmFuZ2UgcmVwcmVzZW50YXRpb24gZm9yIHN0cmluZ3MgKi9cbmV4cG9ydCB0eXBlIFJhbmdlU3RyID0gW251bWJlciwgbnVtYmVyLCBzdHJpbmdbXV1cbi8qKiBUaGUgc2ltcGxlIHJhbmdlIHJlcHJlc2VudGF0aW9uIGZvciBsaW5lICovXG5leHBvcnQgdHlwZSBSYW5nZUxpbmUgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcj9dXG4vKiogVGhlIHNpbXBsZSByYW5nZSByZXByZXNlbnRhdGlvbiAqL1xuZXhwb3J0IHR5cGUgUmFuZ2VTaW1wbGUgPSBSYW5nZVN0ciB8IFJhbmdlTGluZVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlIHtcbiAgLyoqIFRoZSBzdHlsZSB0byBkcmF3IHJhbmdlLiBJdCBpcyBlaXRoZXIgb2YgW1wibGluZVwiLCBcImN1cnZlXCIsIFwiYXJyb3dcIiwgXCJzdHJcIl0uIElmIFwic3RyXCIgaXMgY2hvc2VuLCB0aGUgb3B0aW5hbCBwYXJhbWV0ZXIgYHN0cmAgbXVzdCBiZSBnaXZlbi4gRm9yIG90aGVyIHN0eWxlcywgeW91IGNhbiBzZXQgbGVmdCBzdHlsZSBhbmQgcmlnaHQgc3R5bGUgbGllIFwibGluZSxhcnJvd1wiLiAqL1xuICBzdHlsZTogc3RyaW5nXG4gIC8qKiBUaGUgY29sb3IgdG8gZHJhdyByYW5nZSwgZS5nLiBcIiMwMDAwMDBcIiBmb3IgYmxhY2suICovXG4gIGNvbG9yOiBzdHJpbmdcbiAgLyoqIFRoZSBiZWdpbm5pbmcgaW5kZXggb2YgdGhlIHJhbmdlLiAqL1xuICBiZWc6IG51bWJlclxuICAvKiogVGhlIGVuZGluZyBpbmRleCBvZiB0aGUgcmFuZ2UuIE5vdGUgdGhhdCBpbmRleGVzIGFyZSBpbmNsdXNpdmUuICovXG4gIGVuZDogbnVtYmVyXG4gIC8qKiBUaGUgc3RlcCBvZiB0aGUgcmFuZ2UgW2BiZWdgLCBgZW5kYF0uIEZvciBleGFtcGxlLCBhIHJhbmdlIFtgYmVnYCwgYGVuZGAsIGBzdGVwYF0gPSBbMSwgOCwgM10gcmVwcmVzZW50cyBjb250aW51b3VzIHJhbmdlcyBbW2BiZWdgLCBgZW5kYF1dPVtbMSwgM10sIFs0LCA2XSwgWzcsIDhdXSAqL1xuICBzdGVwPzogbnVtYmVyXG4gIC8qKiBUaGUgc3RyaW5ncyBvZiB0aGUgcmFuZ2UuIEl0cyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSByYW5nZSBgZW5kYCAtIGBiZWdgICsgMSAqL1xuICBzdHI/OiBzdHJpbmdbXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlUHgge1xuICAvKiogVGhlIHN0eWxlIHRvIGRyYXcgcmFuZ2UuIEl0IGlzIGVpdGhlciBvZiBbXCJsaW5lXCIsIFwiY3VydmVcIiwgXCJhcnJvd1wiLCBcInN0clwiXS4gSWYgXCJzdHJcIiBpcyBjaG9zZW4sIHRoZSBvcHRpbmFsIHBhcmFtZXRlciBgc3RyYCBtdXN0IGJlIGdpdmVuLiBGb3Igb3RoZXIgc3R5bGVzLCB5b3UgY2FuIHNldCBsZWZ0IHN0eWxlIGFuZCByaWdodCBzdHlsZSBsaWUgXCJsaW5lLGFycm93XCIuICovXG4gIHN0eWxlOiBzdHJpbmdcbiAgLyoqIFRoZSBjb2xvciB0byBkcmF3IHJhbmdlLCBlLmcuIFwiIzAwMDAwMFwiIGZvciBibGFjay4gKi9cbiAgY29sb3I6IHN0cmluZ1xuICAvKiogVGhlIHgtY29vcmRpbmF0ZSB3aGljaCBiZWdpbnMgdGhlIHJhbmdlLiAqL1xuICB4X2JlZzogbnVtYmVyXG4gIC8qKiBUaGUgeC1jb29yZGluYXRlIHdoaWNoIGVuZHMgdGhlIHJhbmdlLiAqL1xuICB4X2VuZDogbnVtYmVyXG4gIC8qKiBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSByYW5nZS4gKi9cbiAgeTogbnVtYmVyXG4gIC8qKiBUaGUgc3RyaW5ncyBvZiB0aGUgcmFuZ2UuIEl0cyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSByYW5nZSBgZW5kYCAtIGBiZWdgICsgMSAqL1xuICBzdHI/OiBzdHJpbmdbXVxufVxuXG5leHBvcnQgY2xhc3MgVmlzU3RyIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4gIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgcHJpdmF0ZSBzdHJfeDogbnVtYmVyXG4gIHByaXZhdGUgc3RyX3k6IG51bWJlclxuICBwcml2YXRlIGZvbnRfc2l6ZTogbnVtYmVyXG4gIHByaXZhdGUgZm9udF9zaXplX2hhbGY6IG51bWJlclxuICBwcml2YXRlIGZvbnRfdHlwZTogc3RyaW5nXG4gIC8qKiBUaGUgb2Zmc2V0IHRvIHN0YXJ0IGRyYXdpbmcgYSByYW5nZSBmcm9tIGEgY2VudGVyIHBvc2l0aW9uIG9mIGFuIGluZGV4LiAqL1xuICBwcml2YXRlIHJhbmdlX2JlZ19vZmZzZXQ6IG51bWJlclxuICBwcml2YXRlIHJhbmdlX2VuZF9vZmZzZXQ6IG51bWJlclxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gY2FudmFzIEhUTUxDYW52YXNFbGVtZW50XG4gICAqIEBwYXJhbSBmb250X3NpemUgZm9udCBzaXplXG4gICAqIEBwYXJhbSBmb250X3R5cGUgZm9udCBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgIGZvbnRfc2l6ZSA9IDMyLFxuICAgIGZvbnRfdHlwZSA9ICdDb3VyaWVyJyxcbiAgKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcbiAgICB0aGlzLmZvbnRfc2l6ZSA9IGZvbnRfc2l6ZVxuICAgIHRoaXMuZm9udF9zaXplX2hhbGYgPSB0aGlzLmZvbnRfc2l6ZSAvIDJcbiAgICB0aGlzLmZvbnRfdHlwZSA9IGZvbnRfdHlwZVxuICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgdGhpcy5zdHJfeCA9IHRoaXMuZm9udF9zaXplXG4gICAgdGhpcy5zdHJfeSA9IHRoaXMuZm9udF9zaXplICogMiArIHRoaXMuZm9udF9zaXplX2hhbGZcbiAgICB0aGlzLnJhbmdlX2JlZ19vZmZzZXQgPSAtdGhpcy5mb250X3NpemUgLyA0XG4gICAgdGhpcy5yYW5nZV9lbmRfb2Zmc2V0ID0gdGhpcy5mb250X3NpemUgLyA0XG4gIH1cblxuICAvKiogQ2xlYXIgdGhlIGNhbnZhcy4gKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeC1jb29yZGluYXRlIHdoaWNoIGlzIGEgYmVnaW5uaW5nIG9mIGEgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBpZHggaW5kZXggb2YgYSByYW5nZVxuICAgKiBAcmV0dXJuIFRoZSB4LWNvb3JkaW5hdGUgb2YgYSByYW5nZSBiZWdpbm5pbmcgYXQgYGlkeGBcbiAgICovXG4gIHJhbmdlQmVnKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdHJfeCArIHRoaXMuZm9udF9zaXplICogaWR4ICsgdGhpcy5yYW5nZV9iZWdfb2Zmc2V0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeC1jb29yZGluYXRlIHdoaWNoIGlzIGEgZW5kaW5nIG9mIGEgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBpZHggaW5kZXggb2YgYSByYW5nZVxuICAgKiBAcmV0dXJuIFRoZSB4LWNvb3JkaW5hdGUgb2YgYSByYW5nZSBlbmRpbmcgYXQgYGlkeGBcbiAgICovXG4gIHJhbmdlRW5kKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdHJfeCArIHRoaXMuZm9udF9zaXplICogaWR4ICsgdGhpcy5yYW5nZV9lbmRfb2Zmc2V0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBoZWlnaHQgb2YgYSBnaXZlbiByYW5nZS5cbiAgICogQHBhcmFtIHIgQSByYW5nZS5cbiAgICovXG4gIHJhbmdlSGVpZ2h0KHI6IFJhbmdlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gci5zdHlsZSA9PT0gJ3N0cicgPyB0aGlzLmZvbnRfc2l6ZSA6IE1hdGgucm91bmQodGhpcy5mb250X3NpemUgKiAwLjUpXG4gIH1cblxuICAvKipcbiAgICogRm9yIGEgcmFuZ2Ugbm90IHRvIGRyYXcgc3RyaW5ncywgc3BsaXQgaXQgdG8gdGhyZWUgcGFydHMgbGVmdCwgY2VudGVyLCBhbmQgcmlnaHQuXG4gICAqIEBwYXJhbSBycHggR2l2ZW4gcmFuZ2UgdG8gc3BsaXQuXG4gICAqL1xuICBzcGxpdFJhbmdlUHgocnB4OiBSYW5nZVB4KTogUmFuZ2VQeFtdIHtcbiAgICBjb25zdCBzdHlsZXMgPSBycHguc3R5bGUuc3BsaXQoJywnKVxuXG4gICAgbGV0IHJsID0gT2JqZWN0LmFzc2lnbih7fSwgcnB4KVxuICAgIGxldCByYyA9IE9iamVjdC5hc3NpZ24oe30sIHJweClcbiAgICBsZXQgcnIgPSBPYmplY3QuYXNzaWduKHt9LCBycHgpXG4gICAgcmwueF9lbmQgPSBycHgueF9iZWcgKyB0aGlzLmN1cnZlX2QoKVxuICAgIHJsLnN0eWxlID0gc3R5bGVzWzBdXG5cbiAgICByci54X2JlZyA9IHJweC54X2VuZFxuICAgIHJyLnhfZW5kID0gcnB4LnhfZW5kIC0gdGhpcy5jdXJ2ZV9kKClcbiAgICByci5zdHlsZSA9IHN0eWxlcy5sZW5ndGggPiAxID8gc3R5bGVzWzFdIDogc3R5bGVzWzBdXG5cbiAgICByYy54X2JlZyA9IHJsLnhfZW5kXG4gICAgcmMueF9lbmQgPSByci54X2VuZFxuICAgIHJjLnN0eWxlID0gJ2xpbmUnXG4gICAgcmV0dXJuIFtybCwgcmMsIHJyXVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgY3VydmUgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3Q3VydmVQYXJ0KHJweDogUmFuZ2VQeCkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgdGhpcy5jdHgubW92ZVRvKHJweC54X2JlZywgcnB4LnkgLSB0aGlzLmN1cnZlX2QoKSlcbiAgICB0aGlzLmN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHJweC54X2JlZywgcnB4LnksIHJweC54X2VuZCwgcnB4LnkpXG4gICAgdGhpcy5jdHguc3Ryb2tlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGxlbmd0aCBvZiBhIGJlZ2lubmluZyAob3IgZW5kaW5nKSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBjdXJ2ZV9kKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZm9udF9zaXplX2hhbGYgLyAyXG4gIH1cblxuICAvKipcbiAgICogRHJhdyBsaW5lIGFzIGEgcGFydCBvZiBhIHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcGFydCBvZiBhIHJhbmdlLlxuICAgKi9cbiAgZHJhd0xpbmVQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKClcbiAgICB0aGlzLmN0eC5tb3ZlVG8ocnB4LnhfYmVnLCBycHgueSlcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kLCBycHgueSlcbiAgICB0aGlzLmN0eC5zdHJva2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgYXJyb3cgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3QXJyb3dQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLmN1cnZlX2QoKSAqIChycHgueF9iZWcgPCBycHgueF9lbmQgPyAtMSA6ICsxKVxuICAgIHRoaXMuZHJhd0xpbmVQeFBhcnQocnB4KVxuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgdGhpcy5jdHgubW92ZVRvKHJweC54X2VuZCArIGR4IC8gMiwgcnB4LnkgKyBkeCAvIDIpXG4gICAgdGhpcy5jdHgubGluZVRvKHJweC54X2VuZCArIGR4LCBycHgueSlcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kICsgZHggLyAyLCBycHgueSAtIGR4IC8gMilcbiAgICB0aGlzLmN0eC5zdHJva2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgcmFuZ2UgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3UmFuZ2VQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgaWYgKHJweC5zdHlsZSA9PSAnbGluZScpIHtcbiAgICAgIHRoaXMuZHJhd0xpbmVQeFBhcnQocnB4KVxuICAgIH0gZWxzZSBpZiAocnB4LnN0eWxlID09ICdjdXJ2ZScpIHtcbiAgICAgIHRoaXMuZHJhd0N1cnZlUGFydChycHgpXG4gICAgfSBlbHNlIGlmIChycHguc3R5bGUgPT0gJ2Fycm93Jykge1xuICAgICAgdGhpcy5kcmF3QXJyb3dQeFBhcnQocnB4KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcmFuZ2UgdG8gZHJhdy5cbiAgICovXG4gIGRyYXdSYW5nZVB4KHJweDogUmFuZ2VQeCkge1xuICAgIGlmIChycHguc3R5bGUgPT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLmRyYXdMaW5lUHhQYXJ0KHJweClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgW3JsLCByYywgcnJdID0gdGhpcy5zcGxpdFJhbmdlUHgocnB4KVxuICAgICAgdGhpcy5kcmF3UmFuZ2VQeFBhcnQocmwpXG4gICAgICB0aGlzLmRyYXdSYW5nZVB4UGFydChyYylcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHhQYXJ0KHJyKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHN0cmluZ3MuXG4gICAqIEBwYXJhbSByIEEgcmFuZ2UgdG8gZHJhdyBzdHJpbmdzLlxuICAgKiBAcGFyYW0geSBUaGUgeS1jb29yaW5hdGUgdG8gZHJhdyByYW5nZSBgcmAuXG4gICAqL1xuICBkcmF3U3RyKHI6IFJhbmdlLCB5OiBudW1iZXIpIHtcbiAgICBjb25zdCByc3RyID0gci5zdHIgYXMgc3RyaW5nW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSByc3RyW2ldXG4gICAgICBjb25zdCBjeCA9IHRoaXMuc3RyX3ggKyAoci5iZWcgKyBpKSAqIHRoaXMuZm9udF9zaXplXG4gICAgICB0aGlzLmN0eC5maWxsVGV4dChjLCBjeCwgeSArIHRoaXMuZm9udF9zaXplICogMC4zLCB0aGlzLmZvbnRfc2l6ZSlcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICB0aGlzLmN0eC5yZWN0KFxuICAgICAgICBjeCAtIHRoaXMuZm9udF9zaXplX2hhbGYsXG4gICAgICAgIHkgLSB0aGlzLmZvbnRfc2l6ZV9oYWxmLFxuICAgICAgICB0aGlzLmZvbnRfc2l6ZSxcbiAgICAgICAgdGhpcy5mb250X3NpemUsXG4gICAgICApXG4gICAgICB0aGlzLmN0eC5zdHJva2UoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlLlxuICAgKiBAcGFyYW0gciBBIHJhbmdlIHRvIGRyYXcuXG4gICAqIEBwYXJhbSB5IEEgeS1jb29yZGluYXRlIHRvIGRyYXcgYHJgLlxuICAgKi9cbiAgZHJhd1JhbmdlKHI6IFJhbmdlLCB5OiBudW1iZXIpIHtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IHIuY29sb3JcbiAgICBsZXQgcnB4ID0ge1xuICAgICAgeF9iZWc6IHRoaXMucmFuZ2VCZWcoci5iZWcpLFxuICAgICAgeF9lbmQ6IHRoaXMucmFuZ2VFbmQoci5lbmQpLFxuICAgICAgeTogeSxcbiAgICAgIHN0eWxlOiByLnN0eWxlLFxuICAgICAgY29sb3I6IHIuY29sb3IsXG4gICAgICBzdHI6IHIuc3RyLFxuICAgIH1cbiAgICBpZiAoci5zdHlsZSA9PSAnc3RyJykge1xuICAgICAgdGhpcy5kcmF3U3RyKHIsIHkpXG4gICAgfSBlbHNlIGlmIChyLnN0ZXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB4X2JlZyA9IHRoaXMucmFuZ2VCZWcoci5iZWcpXG4gICAgICBmb3IgKGxldCBjdXIgPSByLmJlZyArIHIuc3RlcCAtIDE7IGN1ciA8IHIuZW5kOyBjdXIgKz0gci5zdGVwKSB7XG4gICAgICAgIHJweC54X2VuZCA9IHRoaXMuc3RyX3ggKyB0aGlzLmZvbnRfc2l6ZSAqIGN1ciArIHRoaXMuZm9udF9zaXplX2hhbGZcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgICAgIHJweC54X2JlZyA9IHJweC54X2VuZFxuICAgICAgfVxuICAgICAgaWYgKChyLmVuZCAtIHIuYmVnICsgMSkgJSByLnN0ZXAgPT09IDApIHtcbiAgICAgICAgcnB4LnhfZW5kID0gdGhpcy5yYW5nZUVuZChyLmVuZClcbiAgICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGVyZSBpcyBhbiB1bmNvbXBsZXRlIHJhbmdlLlxuICAgICAgICBycHgueF9lbmQgPSB0aGlzLnN0cl94ICsgdGhpcy5mb250X3NpemUgKiByLmVuZCArIHRoaXMuZm9udF9zaXplX2hhbGZcbiAgICAgICAgcnB4LnN0eWxlID0gci5zdHlsZS5zcGxpdCgnLCcpWzBdICsgJyxsaW5lJ1xuICAgICAgICB0aGlzLmRyYXdSYW5nZVB4KHJweClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyByYW5nZXMuXG4gICAqIEBwYXJhbSByYW5nZV9yb3dzIFJhbmdlcyB0byBkcmF3LlxuICAgKi9cbiAgZHJhd1JhbmdlcyhyYW5nZV9yb3dzOiBSYW5nZVtdW10pIHtcbiAgICBsZXQgeXB4ID0gdGhpcy5zdHJfeVxuICAgIGZvciAoY29uc3QgcmFuZ2VzIG9mIHJhbmdlX3Jvd3MpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KC4uLnJhbmdlcy5tYXAociA9PiB0aGlzLnJhbmdlSGVpZ2h0KHIpKSlcbiAgICAgIGZvciAoY29uc3QgcmFuZ2Ugb2YgcmFuZ2VzKSB7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlKHJhbmdlLCB5cHggKyBoZWlnaHQgLyAyKVxuICAgICAgfVxuICAgICAgeXB4ICs9IGhlaWdodFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGFuIGlucHV0IHN0cmluZy5cbiAgICovXG4gIGRyYXdJbnB1dFN0cihpbnB1dF9zdHI6IHN0cmluZykge1xuICAgIGxldCBpbmRleCA9IFsnaSddXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dF9zdHIubGVuZ3RoOyBpKyspIGluZGV4LnB1c2goJycgKyBpKVxuICAgIGxldCByID0ge1xuICAgICAgc3R5bGU6ICdzdHInLFxuICAgICAgY29sb3I6ICcjMDAwMDAwJyxcbiAgICAgIGJlZzogLTEsXG4gICAgICBlbmQ6IGlucHV0X3N0ci5sZW5ndGggLSAxLFxuICAgICAgc3RyOiBpbmRleCxcbiAgICB9XG4gICAgdGhpcy5kcmF3UmFuZ2UociwgdGhpcy5zdHJfeSAtIHRoaXMuZm9udF9zaXplIC0gdGhpcy5mb250X3NpemVfaGFsZilcbiAgICBjb25zdCBjaGFycyA9IFsnU3RyJ11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0X3N0ci5sZW5ndGg7IGkrKylcbiAgICAgIGNoYXJzLnB1c2goaW5wdXRfc3RyLnN1YnN0cmluZyhpLCBpICsgMSkpXG4gICAgci5zdHIgPSBjaGFyc1xuICAgIHRoaXMuZHJhd1JhbmdlKHIsIHRoaXMuc3RyX3kgLSB0aGlzLmZvbnRfc2l6ZV9oYWxmKVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgYSBnaXZlbiBzdHJpbmcgYW5kIHJhbmdlcy5cbiAgICogQHBhcmFtIGlucHV0X3N0ciBJbnB1dCBzdHJpbmcgdG8gZHJhdy5cbiAgICogQHBhcmFtIHJzcyBUaGUgcmFuZ2VzIHRvIGRyYXcgd2hpY2ggYXJlIHJlbGF0ZWQgdG8gYSBnaXZlbiBzdHJpbmcgYGlucHV0X3N0cmBcbiAgICovXG4gIGRyYXcoaW5wdXRfc3RyOiBzdHJpbmcsIHJzczogUmFuZ2VbXVtdKSB7XG4gICAgbGV0IHJhbmdlX2JvdW5kID0gWy0xLCBpbnB1dF9zdHIubGVuZ3RoIC0gMV1cbiAgICByc3MuZm9yRWFjaChycyA9PlxuICAgICAgcnMuZm9yRWFjaChcbiAgICAgICAgciA9PlxuICAgICAgICAgIChyYW5nZV9ib3VuZCA9IFtcbiAgICAgICAgICAgIE1hdGgubWluKHJhbmdlX2JvdW5kWzBdLCByLmJlZyksXG4gICAgICAgICAgICBNYXRoLm1heChyYW5nZV9ib3VuZFsxXSwgci5lbmQpLFxuICAgICAgICAgIF0pLFxuICAgICAgKSxcbiAgICApXG4gICAgdGhpcy5zdHJfeCA9IHRoaXMuZm9udF9zaXplICsgTWF0aC5hYnMocmFuZ2VfYm91bmRbMF0pICogdGhpcy5mb250X3NpemVcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IChyYW5nZV9ib3VuZFsxXSAtIHJhbmdlX2JvdW5kWzBdICsgMikgKiB0aGlzLmZvbnRfc2l6ZVxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9XG4gICAgICB0aGlzLnN0cl95ICtcbiAgICAgIHRoaXMuZm9udF9zaXplX2hhbGYgK1xuICAgICAgcnNzLnJlZHVjZShcbiAgICAgICAgKGFjbSwgcnMpID0+IGFjbSArIE1hdGgubWF4KC4uLnJzLm1hcChyID0+IHRoaXMucmFuZ2VIZWlnaHQocikpKSxcbiAgICAgICAgMCxcbiAgICAgIClcblxuICAgIC8vIERQSSBzZXR0aW5nc1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDFcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAvLyBjb25zb2xlLmxvZygnZHByJywgZHByLCAnIHJlY3QnLCByZWN0KVxuICAgIHRoaXMuY2FudmFzLndpZHRoICo9IGRwclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCAqPSBkcHJcbiAgICB0aGlzLmN0eC5zY2FsZShkcHIsIGRwcilcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoIC8gZHByICsgJ3B4J1xuXG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gZHByICsgJ3B4J1xuICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gM1xuICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLmZvbnRfc2l6ZSArICdweCAnICsgdGhpcy5mb250X3R5cGVcbiAgICB0aGlzLmRyYXdJbnB1dFN0cihpbnB1dF9zdHIpXG4gICAgdGhpcy5kcmF3UmFuZ2VzKHJzcylcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGdyb3VwIHRoYXQgZWFjaCBjb250YWlucyBhIHNpbmdsZSByYW5nZS5cbiAgICogQHBhcmFtIHJhbmdlcyBUaGUgcmFuZ2UgbGlzdC5cbiAgICovXG4gIG1ha2VTaW5nbGVHcm91cHMocmFuZ2VzOiBSYW5nZVtdKTogUmFuZ2VbXVtdIHtcbiAgICByZXR1cm4gcmFuZ2VzLm1hcChyYW5nZSA9PiBbcmFuZ2VdKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZ3JvdXBlZCByYW5nZXMgdGhhdCBlYWNoIGNvbnRhaW5zIG5vbiBvdmVybGFwcGluZyByYW5nZXMuXG4gICAqIEBwYXJhbSBUcyBUaGUgcmFuZ2UgbGlzdC5cbiAgICogQHBhcmFtIHJhbmdlZiBUaGUgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSB0dXBsZSBiZWdpbm5pbmcgaW5kZXggYW5kIGVuZGluZyBpbmRleCBvZiBhIGdpdmVuIHJhbmdlIGBUc1tpXWAuXG4gICAqL1xuICBub25PdmVybGFwT2JqczxUPihUczogVFtdLCByYW5nZWY6IChhcmcwOiBUKSA9PiBudW1iZXJbXSk6IFRbXVtdIHtcbiAgICBpZiAoVHMubGVuZ3RoIDw9IDApIHJldHVybiBbXVxuICAgIGNvbnN0IGVuZHMgPSBUcy5tYXAodCA9PiByYW5nZWYodClbMV0pXG4gICAgY29uc3QgbiA9IE1hdGgubWF4KC4uLmVuZHMpICsgMVxuICAgIGxldCB1c2VkID0gbmV3IEFycmF5PGJvb2xlYW4+KG4pXG4gICAgdXNlZC5maWxsKGZhbHNlKVxuICAgIGxldCByZXMgPSBbXVxuICAgIGxldCByb3dzOiBUW10gPSBbXVxuICAgIGZvciAoY29uc3QgdCBvZiBUcykge1xuICAgICAgLy8gY2hlY2sgd2hldGhlciBvciBub3QgYSByYW5nZSBjYW4gYmUgaW5zZXJ0ZWQgdG8gdGhlIGN1cnJlbnQgcm93LlxuICAgICAgbGV0IHVzZWRfYW55ID0gZmFsc2VcbiAgICAgIGZvciAobGV0IGkgPSByYW5nZWYodClbMF07IGkgPD0gcmFuZ2VmKHQpWzFdOyBpKyspIHtcbiAgICAgICAgdXNlZF9hbnkgPSB1c2VkX2FueSB8fCB1c2VkW2ldXG4gICAgICB9XG4gICAgICBpZiAodXNlZF9hbnkpIHtcbiAgICAgICAgcmVzLnB1c2gocm93cylcbiAgICAgICAgcm93cyA9IFt0XVxuICAgICAgICB1c2VkLmZpbGwoZmFsc2UpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3dzLnB1c2godClcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSByYW5nZWYodClbMF07IGkgPD0gcmFuZ2VmKHQpWzFdOyBpKyspIHtcbiAgICAgICAgdXNlZFtpXSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvd3MubGVuZ3RoID4gMCkgcmVzLnB1c2gocm93cylcblxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGdyb3VwZWQgcmFuZ2VzIHRoYXQgZWFjaCBjb250YWlucyBub24gb3ZlcmxhcHBpbmcgcmFuZ2VzLlxuICAgKiBAcGFyYW0gcnMgVGhlIHJhbmdlIGxpc3QuXG4gICAqL1xuICBub25PdmVybGFwUmFuZ2VzKHJzOiBSYW5nZVtdKTogUmFuZ2VbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5ub25PdmVybGFwT2JqczxSYW5nZT4ocnMsIHIgPT4gW3IuYmVnLCByLmVuZF0pXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBncm91cGVkIHJhbmdlcyB0aGF0IGVhY2ggY29udGFpbnMgbm9uIG92ZXJsYXBwaW5nIHJhbmdlcy5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKi9cbiAgbm9uT3ZlcmxhcFJhbmdlc1NpbXBsZShyczogUmFuZ2VTaW1wbGVbXSk6IFJhbmdlU2ltcGxlW11bXSB7XG4gICAgcmV0dXJuIHRoaXMubm9uT3ZlcmxhcE9ianM8UmFuZ2VTaW1wbGU+KHJzLCB4ID0+IFt4WzBdLCB4WzFdXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCB0aGUgc3R5bGUgYHN0eWxlYC5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZUdyb3VwUmFuZ2VzQXV0b0NvbG9yKHJzOiBSYW5nZVNpbXBsZVtdW10sIHN0eWxlOiBzdHJpbmcpOiBSYW5nZVtdW10ge1xuICAgIGxldCByZXMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gJyMnICsgY29udmVydC5oc3YuaGV4KFsoaSAqIDM2MCkgLyBycy5sZW5ndGgsIDgwLCA4MF0pXG4gICAgICByZXMucHVzaCh0aGlzLm1ha2VSYW5nZXMocnNbaV0sIHN0eWxlLCBjb2xvcikpXG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCBzdHlsZSBgc3R5bGVgIGFuZCBgY29sb3JgLlxuICAgKiBAcGFyYW0gcmFuZ2VzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKiBAcGFyYW0gY29sb3IgVGhlIGNvbG9yIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZVJhbmdlcyhyYW5nZXM6IFJhbmdlU2ltcGxlW10sIHN0eWxlOiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpOiBSYW5nZVtdIHtcbiAgICByZXR1cm4gcmFuZ2VzLm1hcChyYW5nZSA9PiB7XG4gICAgICBjb25zdCBpc19zdHIgPVxuICAgICAgICB0eXBlb2YgcmFuZ2VbMl0gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiByYW5nZVsyXSAhPT0gJ251bWJlcidcbiAgICAgIGNvbnN0IHN0ZXAgPSB0eXBlb2YgcmFuZ2VbMl0gPT09ICdudW1iZXInID8gcmFuZ2VbMl0gOiB1bmRlZmluZWRcbiAgICAgIGNvbnN0IHN0ciA9IHR5cGVvZiByYW5nZVsyXSAhPT0gJ251bWJlcicgPyByYW5nZVsyXSA6IHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3R5bGU6IGlzX3N0ciA/ICdzdHInIDogc3R5bGUsXG4gICAgICAgIGNvbG9yLFxuICAgICAgICBiZWc6IHJhbmdlWzBdLFxuICAgICAgICBlbmQ6IHJhbmdlWzFdLFxuICAgICAgICBzdGVwLFxuICAgICAgICBzdHIsXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCB0aGUgc3R5bGUgYHN0eWxlYC5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZVJhbmdlc0F1dG9Db2xvcihyczogUmFuZ2VTaW1wbGVbXSwgc3R5bGU6IHN0cmluZyk6IFJhbmdlW10ge1xuICAgIHJldHVybiBycy5tYXAoKHJhbmdlLCBpKSA9PiAoe1xuICAgICAgc3R5bGUsXG4gICAgICBjb2xvcjogJyMnICsgY29udmVydC5oc3YuaGV4KFsoaSAqIDM2MCkgLyBycy5sZW5ndGgsIDgwLCA4MF0pLFxuICAgICAgYmVnOiByYW5nZVswXSxcbiAgICAgIGVuZDogcmFuZ2VbMV0sXG4gICAgfSkpXG4gIH1cbn1cbiIsImltcG9ydCB7IFJhbmdlLCBSYW5nZVNpbXBsZSwgVmlzU3RyIH0gZnJvbSBcIi4vdmlzX3N0clwiO1xuaW1wb3J0ICogYXMgc3RybGliIGZyb20gXCIuL3N0cmxpYlwiO1xuXG5jb25zdCByYWRpb1ZhbHVlID0gKHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGNvbnN0IGVsbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KHNlbGVjdG9yKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVsbXNbaV0uY2hlY2tlZCkgcmVzID0gZWxtc1tpXS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IGRyYXcgPSAoZTogRXZlbnQpID0+IHtcbiAgICAvLyBnZXQgZm9udCBzaXplXG4gICAgbGV0IGZvbnRfc2l6ZSA9IHBhcnNlSW50KHJhZGlvVmFsdWUoXCJbbmFtZT1mb250X3NpemVdXCIpKTtcbiAgICAvLyBnZXQgbGluZSBzdHlsZVxuICAgIGxldCByYW5nZV9zdHlsZSA9IHJhZGlvVmFsdWUoXCJbbmFtZT1saW5lX3N0eWxlXVwiKTtcbiAgICBjb25zdCBsaW5lX3N0eWxlX3JpZ2h0ID0gcmFkaW9WYWx1ZShcIltuYW1lPWxpbmVfc3R5bGVfcmlnaHRdXCIpO1xuXG4gICAgcmFuZ2Vfc3R5bGUgKz0gbGluZV9zdHlsZV9yaWdodC5sZW5ndGggPT09IDAgPyBcIlwiIDogXCIsXCIgKyBsaW5lX3N0eWxlX3JpZ2h0O1xuICAgIGxldCB2aXN1YWxpemUgPSByYWRpb1ZhbHVlKFwiW25hbWU9dmlzdWFsaXplXVwiKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYGZvbnRfc2l6ZT0ke2ZvbnRfc2l6ZX0sIGxpbmVfc3R5bGU9JHtyYW5nZV9zdHlsZX0sIHZpc3VhbGl6ZT0ke3Zpc3VhbGl6ZX1gXG4gICAgKTtcblxuICAgIC8vIGdldCBpbnB1dCBzdHJpbmdcbiAgICBjb25zdCBlbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0X3N0clwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGxldCBpbnB1dF9zdHIgPSBlbG0udmFsdWU7XG5cbiAgICAvLyBnZXQgY2FudmFzXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgLy8gY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSA1MFxuICAgIGNvbnN0IHZpc1N0ciA9IG5ldyBWaXNTdHIoY2FudmFzLCAoZm9udF9zaXplID0gZm9udF9zaXplKSk7XG5cbiAgICAvLyBjb21wdXRlIHJhbmdlc1xuICAgIGxldCByYW5nZXNwOiBSYW5nZVNpbXBsZVtdID0gW107XG4gICAgbGV0IHJhbmdlc19ncm91cDogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gICAgbGV0IHJhbmdlczogUmFuZ2VbXVtdID0gW107XG5cbiAgICBjb25zdCBzaG93X2VmZmVjdGl2ZV9hbHBoYWJldCA9IChcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZmZlY3RpdmVfYWxwaGFiZXRcIikgYXMgSFRNTElucHV0RWxlbWVudFxuICAgICkuY2hlY2tlZDtcbiAgICBjb25zdCBzaG93X3JhbmtfYXJyYXkgPSAoXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFua19hcnJheVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgKS5jaGVja2VkO1xuXG4gICAgaWYgKHNob3dfZWZmZWN0aXZlX2FscGhhYmV0KSB7XG4gICAgICAgIHJhbmdlc19ncm91cC5wdXNoKFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAtMSxcbiAgICAgICAgICAgICAgICBpbnB1dF9zdHIubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICBbXCJlU3RyXCIsIC4uLnN0cmxpYi5yZXBsYWNlRWZmZWN0aXZlQWxwaGFiZXQoaW5wdXRfc3RyKV0sXG4gICAgICAgICAgICBdLFxuICAgICAgICBdIGFzIFJhbmdlU2ltcGxlW10pO1xuICAgIH1cbiAgICBpZiAoc2hvd19yYW5rX2FycmF5KSB7XG4gICAgICAgIHJhbmdlc19ncm91cC5wdXNoKFtcbiAgICAgICAgICAgIFstMSwgaW5wdXRfc3RyLmxlbmd0aCAtIDEsIFtcInJhbmtcIiwgLi4uc3RybGliLnJhbmtBcnJheShpbnB1dF9zdHIpXV0sXG4gICAgICAgIF0gYXMgUmFuZ2VTaW1wbGVbXSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICB2aXN1YWxpemUgPT09IFwicnVuc1wiIHx8XG4gICAgICAgIHZpc3VhbGl6ZSA9PT0gXCJwYWxpbmRyb21lc1wiIHx8XG4gICAgICAgIHZpc3VhbGl6ZSA9PT0gXCJzcXVhcmVzXCIgfHxcbiAgICAgICAgdmlzdWFsaXplID09PSBcInJtb3N0c3F1YXJlc1wiIHx8XG4gICAgICAgIHZpc3VhbGl6ZSA9PT0gXCJsbW9zdHNxdWFyZXNcIlxuICAgICkge1xuICAgICAgICBpZiAodmlzdWFsaXplID09PSBcInJ1bnNcIikge1xuICAgICAgICAgICAgcmFuZ2VzcCA9IHN0cmxpYi5lbnVtUnVucyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW107XG4gICAgICAgIH0gZWxzZSBpZiAodmlzdWFsaXplID09PSBcInBhbGluZHJvbWVzXCIpIHtcbiAgICAgICAgICAgIHJhbmdlc3AgPSBzdHJsaWIuZW51bVBhbGluZHJvbWVzKGlucHV0X3N0cikgYXMgUmFuZ2VTaW1wbGVbXTtcbiAgICAgICAgfSBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwic3F1YXJlc1wiKSB7XG4gICAgICAgICAgICByYW5nZXNwID0gc3RybGliLmVudW1TcXVhcmVzKGlucHV0X3N0cikgYXMgUmFuZ2VTaW1wbGVbXTtcbiAgICAgICAgfSBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwicm1vc3RzcXVhcmVzXCIpIHtcbiAgICAgICAgICAgIHJhbmdlc3AgPSBzdHJsaWIuZW51bVJpZ2h0bW9zdFNxdWFyZXMoaW5wdXRfc3RyKSBhcyBSYW5nZVNpbXBsZVtdO1xuICAgICAgICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJsbW9zdHNxdWFyZXNcIikge1xuICAgICAgICAgICAgcmFuZ2VzcCA9IHN0cmxpYi5lbnVtTGVmdG1vc3RTcXVhcmVzKGlucHV0X3N0cikgYXMgUmFuZ2VTaW1wbGVbXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcInJhbmdlc3BcIiwgcmFuZ2VzcCk7XG4gICAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoXG4gICAgICAgICAgICB2aXNTdHIubm9uT3ZlcmxhcFJhbmdlc1NpbXBsZShyYW5nZXNwKVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhcInJhbmdlX2dyb3VwXCIsIHJhbmdlc19ncm91cCk7XG4gICAgICAgIHJhbmdlcyA9IHZpc1N0ci5tYWtlR3JvdXBSYW5nZXNBdXRvQ29sb3IocmFuZ2VzX2dyb3VwLCByYW5nZV9zdHlsZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmFuZ2VzcFwiLCByYW5nZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh2aXN1YWxpemUgPT09IFwibHBmXCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KHN0cmxpYi5lbnVtUHJldk9jY0xQRihpbnB1dF9zdHIpKTtcbiAgICAgICAgZWxzZSBpZiAodmlzdWFsaXplID09PSBcImxlZnRfbWF4aW1hbFwiKVxuICAgICAgICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChcbiAgICAgICAgICAgICAgICBzdHJsaWIuZW51bUlmR3JvdXAoaW5wdXRfc3RyLCBzdHJsaWIuaXNMZWZ0TWF4aW1hbClcbiAgICAgICAgICAgICk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJyaWdodF9tYXhpbWFsXCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KFxuICAgICAgICAgICAgICAgIHN0cmxpYi5lbnVtSWZHcm91cChpbnB1dF9zdHIsIHN0cmxpYi5pc1JpZ2h0TWF4aW1hbClcbiAgICAgICAgICAgICk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJtYXhfcmVwZWF0XCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KFxuICAgICAgICAgICAgICAgIHN0cmxpYi5lbnVtSWZHcm91cChpbnB1dF9zdHIsIHN0cmxpYi5pc01heFJlcGVhdClcbiAgICAgICAgICAgICk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJsejc3XCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KHN0cmxpYi5sejc3KGlucHV0X3N0cikpO1xuICAgICAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwibHo3OFwiKVxuICAgICAgICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChzdHJsaWIubHo3OChpbnB1dF9zdHIpKTtcbiAgICAgICAgZWxzZSBpZiAodmlzdWFsaXplID09PSBcImx5bmRvbl9mYWN0b3JpemF0aW9uXCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KFxuICAgICAgICAgICAgICAgIHN0cmxpYi5seW5kb25GYWN0b3JpemF0aW9uKGlucHV0X3N0cilcbiAgICAgICAgICAgICk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJseW5kb25fYXJyYXlcIilcbiAgICAgICAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoc3RybGliLmx5bmRvbkFycmF5KGlucHV0X3N0cikpO1xuICAgICAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwiZW51bV9seW5kb25cIilcbiAgICAgICAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoc3RybGliLmVudW1MeW5kb24oaW5wdXRfc3RyKSk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJwcmV2X3NtYWxsZXJfc3VmZml4XCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KFxuICAgICAgICAgICAgICAgIHN0cmxpYi5wcmV2U21hbGxlclN1ZmZpeGVzKGlucHV0X3N0cilcbiAgICAgICAgICAgICk7XG4gICAgICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJuZXh0X3NtYWxsZXJfc3VmZml4XCIpXG4gICAgICAgICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KFxuICAgICAgICAgICAgICAgIHN0cmxpYi5uZXh0U21hbGxlclN1ZmZpeGVzKGlucHV0X3N0cilcbiAgICAgICAgICAgICk7XG4gICAgICAgIHJhbmdlcyA9IHZpc1N0ci5tYWtlR3JvdXBSYW5nZXNBdXRvQ29sb3IocmFuZ2VzX2dyb3VwLCByYW5nZV9zdHlsZSk7XG4gICAgICAgIHJhbmdlcyA9IHN0cmxpYi5mbGF0KHJhbmdlcy5tYXAoKHgpID0+IHZpc1N0ci5ub25PdmVybGFwUmFuZ2VzKHgpKSk7XG4gICAgfVxuXG4gICAgdmlzU3RyLmRyYXcoaW5wdXRfc3RyLCByYW5nZXMpO1xufTtcblxuY29uc3Qgc2VsZWN0b3JBZGRFdmVudCA9IChcbiAgICBzZWxlY3Rvcjogc3RyaW5nLFxuICAgIGV2ZW50OiBzdHJpbmcsXG4gICAgZnVuYzogRXZlbnRMaXN0ZW5lclxuKSA9PiB7XG4gICAgY29uc3QgZWxtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oc2VsZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBlbG1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xuICAgIH1cbn07XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRfc3RyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dF9zdHJcIikgYXMgSFRNTEVsZW1lbnQ7XG4gICAgaW5wdXRfc3RyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBkcmF3KTtcbiAgICBpbnB1dF9zdHIuYWRkRXZlbnRMaXN0ZW5lcihcInByb3BlcnR5Y2hhbmdlXCIsIGRyYXcpO1xuXG4gICAgLy8gYWRkIGV2ZW50IGZvciByYWRpbyBidXR0b25zXG4gICAgc2VsZWN0b3JBZGRFdmVudChcIltuYW1lPWZvbnRfc2l6ZV1cIiwgXCJjbGlja1wiLCBkcmF3KTtcbiAgICBzZWxlY3RvckFkZEV2ZW50KFwiW25hbWU9bGluZV9zdHlsZV1cIiwgXCJjbGlja1wiLCBkcmF3KTtcbiAgICBzZWxlY3RvckFkZEV2ZW50KFwiW25hbWU9bGluZV9zdHlsZV9yaWdodF1cIiwgXCJjbGlja1wiLCBkcmF3KTtcbiAgICBzZWxlY3RvckFkZEV2ZW50KFwiW25hbWU9dmlzdWFsaXplXVwiLCBcImNsaWNrXCIsIGRyYXcpO1xuICAgIHNlbGVjdG9yQWRkRXZlbnQoXCJbdHlwZT1jaGVja2JveF1cIiwgXCJjbGlja1wiLCBkcmF3KTtcblxuICAgIC8vIGRyYXcgaW5pdGlhbGx5LlxuICAgIGlucHV0X3N0ci5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJwcm9wZXJ0eWNoYW5nZVwiLCB7IGRldGFpbDogXCJpbml0IGV2ZW50XCIgfSlcbiAgICApO1xufTtcblxubWFpbigpO1xuIiwiLyogTUlUIGxpY2Vuc2UgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW1peGVkLW9wZXJhdG9ycyAqL1xuaW1wb3J0IGNzc0tleXdvcmRzIGZyb20gJ2NvbG9yLW5hbWUnO1xuXG4vLyBOT1RFOiBjb252ZXJzaW9ucyBzaG91bGQgb25seSByZXR1cm4gcHJpbWl0aXZlIHZhbHVlcyAoaS5lLiBhcnJheXMsIG9yXG4vLyAgICAgICB2YWx1ZXMgdGhhdCBnaXZlIGNvcnJlY3QgYHR5cGVvZmAgcmVzdWx0cykuXG4vLyAgICAgICBkbyBub3QgdXNlIGJveCB2YWx1ZXMgdHlwZXMgKGkuZS4gTnVtYmVyKCksIFN0cmluZygpLCBldGMuKVxuXG5jb25zdCByZXZlcnNlS2V5d29yZHMgPSB7fTtcbmZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGNzc0tleXdvcmRzKSkge1xuXHRyZXZlcnNlS2V5d29yZHNbY3NzS2V5d29yZHNba2V5XV0gPSBrZXk7XG59XG5cbmNvbnN0IGNvbnZlcnQgPSB7XG5cdHJnYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdyZ2InfSxcblx0aHNsOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzbCd9LFxuXHRoc3Y6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHN2J30sXG5cdGh3Yjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdod2InfSxcblx0Y215azoge2NoYW5uZWxzOiA0LCBsYWJlbHM6ICdjbXlrJ30sXG5cdHh5ejoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICd4eXonfSxcblx0bGFiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2xhYid9LFxuXHRva2xhYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsnb2tsJywgJ29rYScsICdva2InXX0sXG5cdGxjaDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsY2gnfSxcblx0b2tsY2g6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ29rbCcsICdva2MnLCAnb2toJ119LFxuXHRoZXg6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2hleCddfSxcblx0a2V5d29yZDoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsna2V5d29yZCddfSxcblx0YW5zaTE2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMTYnXX0sXG5cdGFuc2kyNTY6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2Fuc2kyNTYnXX0sXG5cdGhjZzoge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsnaCcsICdjJywgJ2cnXX0sXG5cdGFwcGxlOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydyMTYnLCAnZzE2JywgJ2IxNiddfSxcblx0Z3JheToge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnZ3JheSddfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZlcnQ7XG5cbi8vIExBQiBmKHQpIGNvbnN0YW50XG5jb25zdCBMQUJfRlQgPSAoNiAvIDI5KSAqKiAzO1xuXG4vLyBTUkdCIG5vbi1saW5lYXIgdHJhbnNmb3JtIGZ1bmN0aW9uc1xuZnVuY3Rpb24gc3JnYk5vbmxpbmVhclRyYW5zZm9ybShjKSB7XG5cdGNvbnN0IGNjID0gYyA+IDAuMDAzXzEzMF84XG5cdFx0PyAoKDEuMDU1ICogKGMgKiogKDEgLyAyLjQpKSkgLSAwLjA1NSlcblx0XHQ6IGMgKiAxMi45Mjtcblx0cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KDAsIGNjKSwgMSk7XG59XG5cbmZ1bmN0aW9uIHNyZ2JOb25saW5lYXJUcmFuc2Zvcm1JbnYoYykge1xuXHRyZXR1cm4gYyA+IDAuMDQwXzQ1ID8gKCgoYyArIDAuMDU1KSAvIDEuMDU1KSAqKiAyLjQpIDogKGMgLyAxMi45Mik7XG59XG5cbi8vIEhpZGUgLmNoYW5uZWxzIGFuZCAubGFiZWxzIHByb3BlcnRpZXNcbmZvciAoY29uc3QgbW9kZWwgb2YgT2JqZWN0LmtleXMoY29udmVydCkpIHtcblx0aWYgKCEoJ2NoYW5uZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHRpZiAoISgnbGFiZWxzJyBpbiBjb252ZXJ0W21vZGVsXSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbCBsYWJlbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHRpZiAoY29udmVydFttb2RlbF0ubGFiZWxzLmxlbmd0aCAhPT0gY29udmVydFttb2RlbF0uY2hhbm5lbHMpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2NoYW5uZWwgYW5kIGxhYmVsIGNvdW50cyBtaXNtYXRjaDogJyArIG1vZGVsKTtcblx0fVxuXG5cdGNvbnN0IHtjaGFubmVscywgbGFiZWxzfSA9IGNvbnZlcnRbbW9kZWxdO1xuXHRkZWxldGUgY29udmVydFttb2RlbF0uY2hhbm5lbHM7XG5cdGRlbGV0ZSBjb252ZXJ0W21vZGVsXS5sYWJlbHM7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W21vZGVsXSwgJ2NoYW5uZWxzJywge3ZhbHVlOiBjaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdsYWJlbHMnLCB7dmFsdWU6IGxhYmVsc30pO1xufVxuXG5jb252ZXJ0LnJnYi5oc2wgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF0gLyAyNTU7XG5cdGNvbnN0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGNvbnN0IGIgPSByZ2JbMl0gLyAyNTU7XG5cdGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuXHRjb25zdCBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcblx0Y29uc3QgZGVsdGEgPSBtYXggLSBtaW47XG5cdGxldCBoO1xuXHRsZXQgcztcblxuXHRzd2l0Y2ggKG1heCkge1xuXHRcdGNhc2UgbWluOiB7XG5cdFx0XHRoID0gMDtcblxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSByOiB7XG5cdFx0XHRoID0gKGcgLSBiKSAvIGRlbHRhO1xuXG5cdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIGc6IHtcblx0XHRcdGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuXG5cdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIGI6IHtcblx0XHRcdGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuXG5cdFx0XHRicmVhaztcblx0XHR9XG5cdC8vIE5vIGRlZmF1bHRcblx0fVxuXG5cdGggPSBNYXRoLm1pbihoICogNjAsIDM2MCk7XG5cblx0aWYgKGggPCAwKSB7XG5cdFx0aCArPSAzNjA7XG5cdH1cblxuXHRjb25zdCBsID0gKG1pbiArIG1heCkgLyAyO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdHMgPSAwO1xuXHR9IGVsc2UgaWYgKGwgPD0gMC41KSB7XG5cdFx0cyA9IGRlbHRhIC8gKG1heCArIG1pbik7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IGRlbHRhIC8gKDIgLSBtYXggLSBtaW4pO1xuXHR9XG5cblx0cmV0dXJuIFtoLCBzICogMTAwLCBsICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmhzdiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0bGV0IHJkaWY7XG5cdGxldCBnZGlmO1xuXHRsZXQgYmRpZjtcblx0bGV0IGg7XG5cdGxldCBzO1xuXG5cdGNvbnN0IHIgPSByZ2JbMF0gLyAyNTU7XG5cdGNvbnN0IGcgPSByZ2JbMV0gLyAyNTU7XG5cdGNvbnN0IGIgPSByZ2JbMl0gLyAyNTU7XG5cdGNvbnN0IHYgPSBNYXRoLm1heChyLCBnLCBiKTtcblx0Y29uc3QgZGlmZiA9IHYgLSBNYXRoLm1pbihyLCBnLCBiKTtcblx0Y29uc3QgZGlmZmMgPSBmdW5jdGlvbiAoYykge1xuXHRcdHJldHVybiAodiAtIGMpIC8gNiAvIGRpZmYgKyAxIC8gMjtcblx0fTtcblxuXHRpZiAoZGlmZiA9PT0gMCkge1xuXHRcdGggPSAwO1xuXHRcdHMgPSAwO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBkaWZmIC8gdjtcblx0XHRyZGlmID0gZGlmZmMocik7XG5cdFx0Z2RpZiA9IGRpZmZjKGcpO1xuXHRcdGJkaWYgPSBkaWZmYyhiKTtcblxuXHRcdHN3aXRjaCAodikge1xuXHRcdFx0Y2FzZSByOiB7XG5cdFx0XHRcdGggPSBiZGlmIC0gZ2RpZjtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0Y2FzZSBnOiB7XG5cdFx0XHRcdGggPSAoMSAvIDMpICsgcmRpZiAtIGJkaWY7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGNhc2UgYjoge1xuXHRcdFx0XHRoID0gKDIgLyAzKSArIGdkaWYgLSByZGlmO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdC8vIE5vIGRlZmF1bHRcblx0XHR9XG5cblx0XHRpZiAoaCA8IDApIHtcblx0XHRcdGggKz0gMTtcblx0XHR9IGVsc2UgaWYgKGggPiAxKSB7XG5cdFx0XHRoIC09IDE7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFtcblx0XHRoICogMzYwLFxuXHRcdHMgKiAxMDAsXG5cdFx0diAqIDEwMCxcblx0XTtcbn07XG5cbmNvbnZlcnQucmdiLmh3YiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXTtcblx0Y29uc3QgZyA9IHJnYlsxXTtcblx0bGV0IGIgPSByZ2JbMl07XG5cdGNvbnN0IGggPSBjb252ZXJ0LnJnYi5oc2wocmdiKVswXTtcblx0Y29uc3QgdyA9IDEgLyAyNTUgKiBNYXRoLm1pbihyLCBNYXRoLm1pbihnLCBiKSk7XG5cblx0YiA9IDEgLSAxIC8gMjU1ICogTWF0aC5tYXgociwgTWF0aC5tYXgoZywgYikpO1xuXG5cdHJldHVybiBbaCwgdyAqIDEwMCwgYiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5va2xhYiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Ly8gQXNzdW1lIHNSR0Jcblx0Y29uc3QgciA9IHNyZ2JOb25saW5lYXJUcmFuc2Zvcm1JbnYocmdiWzBdIC8gMjU1KTtcblx0Y29uc3QgZyA9IHNyZ2JOb25saW5lYXJUcmFuc2Zvcm1JbnYocmdiWzFdIC8gMjU1KTtcblx0Y29uc3QgYiA9IHNyZ2JOb25saW5lYXJUcmFuc2Zvcm1JbnYocmdiWzJdIC8gMjU1KTtcblxuXHRjb25zdCBscCA9IE1hdGguY2JydCgwLjQxMl8yMjFfNDcwXzggKiByICsgMC41MzZfMzMyXzUzNl8zICogZyArIDAuMDUxXzQ0NV85OTJfOSAqIGIpO1xuXHRjb25zdCBtcCA9IE1hdGguY2JydCgwLjIxMV85MDNfNDk4XzIgKiByICsgMC42ODBfNjk5XzU0NV8xICogZyArIDAuMTA3XzM5Nl85NTZfNiAqIGIpO1xuXHRjb25zdCBzcCA9IE1hdGguY2JydCgwLjA4OF8zMDJfNDYxXzkgKiByICsgMC4yODFfNzE4XzgzN182ICogZyArIDAuNjI5Xzk3OF83MDBfNSAqIGIpO1xuXG5cdGNvbnN0IGwgPSAwLjIxMF80NTRfMjU1XzMgKiBscCArIDAuNzkzXzYxN183ODUgKiBtcCAtIDAuMDA0XzA3Ml8wNDZfOCAqIHNwO1xuXHRjb25zdCBhYSA9IDEuOTc3Xzk5OF80OTVfMSAqIGxwIC0gMi40MjhfNTkyXzIwNSAqIG1wICsgMC40NTBfNTkzXzcwOV85ICogc3A7XG5cdGNvbnN0IGJiID0gMC4wMjVfOTA0XzAzN18xICogbHAgKyAwLjc4Ml83NzFfNzY2XzIgKiBtcCAtIDAuODA4XzY3NV83NjYgKiBzcDtcblxuXHRyZXR1cm4gW2wgKiAxMDAsIGFhICogMTAwLCBiYiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5jbXlrID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXG5cdGNvbnN0IGsgPSBNYXRoLm1pbigxIC0gciwgMSAtIGcsIDEgLSBiKTtcblx0Y29uc3QgYyA9ICgxIC0gciAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHRjb25zdCBtID0gKDEgLSBnIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cdGNvbnN0IHkgPSAoMSAtIGIgLSBrKSAvICgxIC0gaykgfHwgMDtcblxuXHRyZXR1cm4gW2MgKiAxMDAsIG0gKiAxMDAsIHkgKiAxMDAsIGsgKiAxMDBdO1xufTtcblxuZnVuY3Rpb24gY29tcGFyYXRpdmVEaXN0YW5jZSh4LCB5KSB7XG5cdC8qXG5cdFx0U2VlIGh0dHBzOi8vZW4ubS53aWtpcGVkaWEub3JnL3dpa2kvRXVjbGlkZWFuX2Rpc3RhbmNlI1NxdWFyZWRfRXVjbGlkZWFuX2Rpc3RhbmNlXG5cdCovXG5cdHJldHVybiAoXG5cdFx0KCh4WzBdIC0geVswXSkgKiogMikgK1xuXHRcdCgoeFsxXSAtIHlbMV0pICoqIDIpICtcblx0XHQoKHhbMl0gLSB5WzJdKSAqKiAyKVxuXHQpO1xufVxuXG5jb252ZXJ0LnJnYi5rZXl3b3JkID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByZXZlcnNlZCA9IHJldmVyc2VLZXl3b3Jkc1tyZ2JdO1xuXHRpZiAocmV2ZXJzZWQpIHtcblx0XHRyZXR1cm4gcmV2ZXJzZWQ7XG5cdH1cblxuXHRsZXQgY3VycmVudENsb3Nlc3REaXN0YW5jZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblx0bGV0IGN1cnJlbnRDbG9zZXN0S2V5d29yZDtcblxuXHRmb3IgKGNvbnN0IGtleXdvcmQgb2YgT2JqZWN0LmtleXMoY3NzS2V5d29yZHMpKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBjc3NLZXl3b3Jkc1trZXl3b3JkXTtcblxuXHRcdC8vIENvbXB1dGUgY29tcGFyYXRpdmUgZGlzdGFuY2Vcblx0XHRjb25zdCBkaXN0YW5jZSA9IGNvbXBhcmF0aXZlRGlzdGFuY2UocmdiLCB2YWx1ZSk7XG5cblx0XHQvLyBDaGVjayBpZiBpdHMgbGVzcywgaWYgc28gc2V0IGFzIGNsb3Nlc3Rcblx0XHRpZiAoZGlzdGFuY2UgPCBjdXJyZW50Q2xvc2VzdERpc3RhbmNlKSB7XG5cdFx0XHRjdXJyZW50Q2xvc2VzdERpc3RhbmNlID0gZGlzdGFuY2U7XG5cdFx0XHRjdXJyZW50Q2xvc2VzdEtleXdvcmQgPSBrZXl3b3JkO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG59O1xuXG5jb252ZXJ0LmtleXdvcmQucmdiID0gZnVuY3Rpb24gKGtleXdvcmQpIHtcblx0cmV0dXJuIFsuLi5jc3NLZXl3b3Jkc1trZXl3b3JkXV07XG59O1xuXG5jb252ZXJ0LnJnYi54eXogPSBmdW5jdGlvbiAocmdiKSB7XG5cdC8vIEFzc3VtZSBzUkdCXG5cdGNvbnN0IHIgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KHJnYlswXSAvIDI1NSk7XG5cdGNvbnN0IGcgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KHJnYlsxXSAvIDI1NSk7XG5cdGNvbnN0IGIgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KHJnYlsyXSAvIDI1NSk7XG5cblx0Y29uc3QgeCA9IChyICogMC40MTJfNDU2XzQpICsgKGcgKiAwLjM1N181NzZfMSkgKyAoYiAqIDAuMTgwXzQzN181KTtcblx0Y29uc3QgeSA9IChyICogMC4yMTJfNjcyXzkpICsgKGcgKiAwLjcxNV8xNTJfMikgKyAoYiAqIDAuMDcyXzE3NSk7XG5cdGNvbnN0IHogPSAociAqIDAuMDE5XzMzM185KSArIChnICogMC4xMTlfMTkyKSArIChiICogMC45NTBfMzA0XzEpO1xuXG5cdHJldHVybiBbeCAqIDEwMCwgeSAqIDEwMCwgeiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5sYWIgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHh5eiA9IGNvbnZlcnQucmdiLnh5eihyZ2IpO1xuXHRsZXQgeCA9IHh5elswXTtcblx0bGV0IHkgPSB4eXpbMV07XG5cdGxldCB6ID0geHl6WzJdO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gTEFCX0ZUID8gKHggKiogKDEgLyAzKSkgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gTEFCX0ZUID8gKHkgKiogKDEgLyAzKSkgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gTEFCX0ZUID8gKHogKiogKDEgLyAzKSkgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0Y29uc3QgbCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRjb25zdCBhID0gNTAwICogKHggLSB5KTtcblx0Y29uc3QgYiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQuaHNsLnJnYiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0Y29uc3QgaCA9IGhzbFswXSAvIDM2MDtcblx0Y29uc3QgcyA9IGhzbFsxXSAvIDEwMDtcblx0Y29uc3QgbCA9IGhzbFsyXSAvIDEwMDtcblx0bGV0IHQzO1xuXHRsZXQgdmFsdWU7XG5cblx0aWYgKHMgPT09IDApIHtcblx0XHR2YWx1ZSA9IGwgKiAyNTU7XG5cdFx0cmV0dXJuIFt2YWx1ZSwgdmFsdWUsIHZhbHVlXTtcblx0fVxuXG5cdGNvbnN0IHQyID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcblxuXHRjb25zdCB0MSA9IDIgKiBsIC0gdDI7XG5cblx0Y29uc3QgcmdiID0gWzAsIDAsIDBdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdHQzID0gaCArIDEgLyAzICogLShpIC0gMSk7XG5cdFx0aWYgKHQzIDwgMCkge1xuXHRcdFx0dDMrKztcblx0XHR9XG5cblx0XHRpZiAodDMgPiAxKSB7XG5cdFx0XHR0My0tO1xuXHRcdH1cblxuXHRcdGlmICg2ICogdDMgPCAxKSB7XG5cdFx0XHR2YWx1ZSA9IHQxICsgKHQyIC0gdDEpICogNiAqIHQzO1xuXHRcdH0gZWxzZSBpZiAoMiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsdWUgPSB0Mjtcblx0XHR9IGVsc2UgaWYgKDMgKiB0MyA8IDIpIHtcblx0XHRcdHZhbHVlID0gdDEgKyAodDIgLSB0MSkgKiAoMiAvIDMgLSB0MykgKiA2O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YWx1ZSA9IHQxO1xuXHRcdH1cblxuXHRcdHJnYltpXSA9IHZhbHVlICogMjU1O1xuXHR9XG5cblx0cmV0dXJuIHJnYjtcbn07XG5cbmNvbnZlcnQuaHNsLmhzdiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0Y29uc3QgaCA9IGhzbFswXTtcblx0bGV0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGxldCBsID0gaHNsWzJdIC8gMTAwO1xuXHRsZXQgc21pbiA9IHM7XG5cdGNvbnN0IGxtaW4gPSBNYXRoLm1heChsLCAwLjAxKTtcblxuXHRsICo9IDI7XG5cdHMgKj0gKGwgPD0gMSkgPyBsIDogMiAtIGw7XG5cdHNtaW4gKj0gbG1pbiA8PSAxID8gbG1pbiA6IDIgLSBsbWluO1xuXHRjb25zdCB2ID0gKGwgKyBzKSAvIDI7XG5cdGNvbnN0IHN2ID0gbCA9PT0gMCA/ICgyICogc21pbikgLyAobG1pbiArIHNtaW4pIDogKDIgKiBzKSAvIChsICsgcyk7XG5cblx0cmV0dXJuIFtoLCBzdiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmhzdi5yZ2IgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdGNvbnN0IGggPSBoc3ZbMF0gLyA2MDtcblx0Y29uc3QgcyA9IGhzdlsxXSAvIDEwMDtcblx0bGV0IHYgPSBoc3ZbMl0gLyAxMDA7XG5cdGNvbnN0IGhpID0gTWF0aC5mbG9vcihoKSAlIDY7XG5cblx0Y29uc3QgZiA9IGggLSBNYXRoLmZsb29yKGgpO1xuXHRjb25zdCBwID0gMjU1ICogdiAqICgxIC0gcyk7XG5cdGNvbnN0IHEgPSAyNTUgKiB2ICogKDEgLSAocyAqIGYpKTtcblx0Y29uc3QgdCA9IDI1NSAqIHYgKiAoMSAtIChzICogKDEgLSBmKSkpO1xuXHR2ICo9IDI1NTtcblxuXHRzd2l0Y2ggKGhpKSB7XG5cdFx0Y2FzZSAwOiB7XG5cdFx0XHRyZXR1cm4gW3YsIHQsIHBdO1xuXHRcdH1cblxuXHRcdGNhc2UgMToge1xuXHRcdFx0cmV0dXJuIFtxLCB2LCBwXTtcblx0XHR9XG5cblx0XHRjYXNlIDI6IHtcblx0XHRcdHJldHVybiBbcCwgdiwgdF07XG5cdFx0fVxuXG5cdFx0Y2FzZSAzOiB7XG5cdFx0XHRyZXR1cm4gW3AsIHEsIHZdO1xuXHRcdH1cblxuXHRcdGNhc2UgNDoge1xuXHRcdFx0cmV0dXJuIFt0LCBwLCB2XTtcblx0XHR9XG5cblx0XHRjYXNlIDU6IHtcblx0XHRcdHJldHVybiBbdiwgcCwgcV07XG5cdFx0fVxuXHR9XG59O1xuXG5jb252ZXJ0Lmhzdi5oc2wgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdGNvbnN0IGggPSBoc3ZbMF07XG5cdGNvbnN0IHMgPSBoc3ZbMV0gLyAxMDA7XG5cdGNvbnN0IHYgPSBoc3ZbMl0gLyAxMDA7XG5cdGNvbnN0IHZtaW4gPSBNYXRoLm1heCh2LCAwLjAxKTtcblx0bGV0IHNsO1xuXHRsZXQgbDtcblxuXHRsID0gKDIgLSBzKSAqIHY7XG5cdGNvbnN0IGxtaW4gPSAoMiAtIHMpICogdm1pbjtcblx0c2wgPSBzICogdm1pbjtcblx0c2wgLz0gKGxtaW4gPD0gMSkgPyBsbWluIDogMiAtIGxtaW47XG5cdHNsID0gc2wgfHwgMDtcblx0bCAvPSAyO1xuXG5cdHJldHVybiBbaCwgc2wgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuLy8gaHR0cDovL2Rldi53My5vcmcvY3Nzd2cvY3NzLWNvbG9yLyNod2ItdG8tcmdiXG5jb252ZXJ0Lmh3Yi5yZ2IgPSBmdW5jdGlvbiAoaHdiKSB7XG5cdGNvbnN0IGggPSBod2JbMF0gLyAzNjA7XG5cdGxldCB3aCA9IGh3YlsxXSAvIDEwMDtcblx0bGV0IGJsID0gaHdiWzJdIC8gMTAwO1xuXHRjb25zdCByYXRpbyA9IHdoICsgYmw7XG5cdGxldCBmO1xuXG5cdC8vIFdoICsgYmwgY2FudCBiZSA+IDFcblx0aWYgKHJhdGlvID4gMSkge1xuXHRcdHdoIC89IHJhdGlvO1xuXHRcdGJsIC89IHJhdGlvO1xuXHR9XG5cblx0Y29uc3QgaSA9IE1hdGguZmxvb3IoNiAqIGgpO1xuXHRjb25zdCB2ID0gMSAtIGJsO1xuXHRmID0gNiAqIGggLSBpO1xuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdGlmICgoaSAmIDB4MDEpICE9PSAwKSB7XG5cdFx0ZiA9IDEgLSBmO1xuXHR9XG5cblx0Y29uc3QgbiA9IHdoICsgZiAqICh2IC0gd2gpOyAvLyBMaW5lYXIgaW50ZXJwb2xhdGlvblxuXG5cdGxldCByO1xuXHRsZXQgZztcblx0bGV0IGI7XG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lLG5vLW11bHRpLXNwYWNlcywgZGVmYXVsdC1jYXNlLWxhc3QgKi9cblx0c3dpdGNoIChpKSB7XG5cdFx0ZGVmYXVsdDpcblx0XHRjYXNlIDY6XG5cdFx0Y2FzZSAwOiB7IHIgPSB2OyAgZyA9IG47ICBiID0gd2g7IGJyZWFrO1xuXHRcdH1cblxuXHRcdGNhc2UgMTogeyByID0gbjsgIGcgPSB2OyAgYiA9IHdoOyBicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIDI6IHsgciA9IHdoOyBnID0gdjsgIGIgPSBuOyBicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIDM6IHsgciA9IHdoOyBnID0gbjsgIGIgPSB2OyBicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIDQ6IHsgciA9IG47ICBnID0gd2g7IGIgPSB2OyBicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIDU6IHsgciA9IHY7ICBnID0gd2g7IGIgPSBuOyBicmVhaztcblx0XHR9XG5cdH1cblx0LyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSxuby1tdWx0aS1zcGFjZXMsIGRlZmF1bHQtY2FzZS1sYXN0ICovXG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQuY215ay5yZ2IgPSBmdW5jdGlvbiAoY215aykge1xuXHRjb25zdCBjID0gY215a1swXSAvIDEwMDtcblx0Y29uc3QgbSA9IGNteWtbMV0gLyAxMDA7XG5cdGNvbnN0IHkgPSBjbXlrWzJdIC8gMTAwO1xuXHRjb25zdCBrID0gY215a1szXSAvIDEwMDtcblxuXHRjb25zdCByID0gMSAtIE1hdGgubWluKDEsIGMgKiAoMSAtIGspICsgayk7XG5cdGNvbnN0IGcgPSAxIC0gTWF0aC5taW4oMSwgbSAqICgxIC0gaykgKyBrKTtcblx0Y29uc3QgYiA9IDEgLSBNYXRoLm1pbigxLCB5ICogKDEgLSBrKSArIGspO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5yZ2IgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdGNvbnN0IHggPSB4eXpbMF0gLyAxMDA7XG5cdGNvbnN0IHkgPSB4eXpbMV0gLyAxMDA7XG5cdGNvbnN0IHogPSB4eXpbMl0gLyAxMDA7XG5cdGxldCByO1xuXHRsZXQgZztcblx0bGV0IGI7XG5cblx0ciA9ICh4ICogMy4yNDBfNDU0XzIpICsgKHkgKiAtMS41MzdfMTM4XzUpICsgKHogKiAtMC40OThfNTMxXzQpO1xuXHRnID0gKHggKiAtMC45NjlfMjY2KSArICh5ICogMS44NzZfMDEwXzgpICsgKHogKiAwLjA0MV81NTYpO1xuXHRiID0gKHggKiAwLjA1NV82NDNfNCkgKyAoeSAqIC0wLjIwNF8wMjVfOSkgKyAoeiAqIDEuMDU3XzIyNV8yKTtcblxuXHQvLyBBc3N1bWUgc1JHQlxuXHRyID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybShyKTtcblx0ZyA9IHNyZ2JOb25saW5lYXJUcmFuc2Zvcm0oZyk7XG5cdGIgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtKGIpO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5sYWIgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdGxldCB4ID0geHl6WzBdO1xuXHRsZXQgeSA9IHh5elsxXTtcblx0bGV0IHogPSB4eXpbMl07XG5cblx0eCAvPSA5NS4wNDc7XG5cdHkgLz0gMTAwO1xuXHR6IC89IDEwOC44ODM7XG5cblx0eCA9IHggPiBMQUJfRlQgPyAoeCAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHgpICsgKDE2IC8gMTE2KTtcblx0eSA9IHkgPiBMQUJfRlQgPyAoeSAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHkpICsgKDE2IC8gMTE2KTtcblx0eiA9IHogPiBMQUJfRlQgPyAoeiAqKiAoMSAvIDMpKSA6ICg3Ljc4NyAqIHopICsgKDE2IC8gMTE2KTtcblxuXHRjb25zdCBsID0gKDExNiAqIHkpIC0gMTY7XG5cdGNvbnN0IGEgPSA1MDAgKiAoeCAtIHkpO1xuXHRjb25zdCBiID0gMjAwICogKHkgLSB6KTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC54eXoub2tsYWIgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdGNvbnN0IHggPSB4eXpbMF0gLyAxMDA7XG5cdGNvbnN0IHkgPSB4eXpbMV0gLyAxMDA7XG5cdGNvbnN0IHogPSB4eXpbMl0gLyAxMDA7XG5cblx0Y29uc3QgbHAgPSBNYXRoLmNicnQoMC44MThfOTMzXzAxMF8xICogeCArIDAuMzYxXzg2Nl83NDJfNCAqIHkgLSAwLjEyOF84NTlfNzEzXzcgKiB6KTtcblx0Y29uc3QgbXAgPSBNYXRoLmNicnQoMC4wMzJfOTg0XzU0M182ICogeCArIDAuOTI5XzMxMV84NzFfNSAqIHkgKyAwLjAzNl8xNDVfNjM4XzcgKiB6KTtcblx0Y29uc3Qgc3AgPSBNYXRoLmNicnQoMC4wNDhfMjAwXzMwMV84ICogeCArIDAuMjY0XzM2Nl8yNjlfMSAqIHkgKyAwLjYzM184NTFfNzA3ICogeik7XG5cblx0Y29uc3QgbCA9IDAuMjEwXzQ1NF8yNTVfMyAqIGxwICsgMC43OTNfNjE3Xzc4NSAqIG1wIC0gMC4wMDRfMDcyXzA0Nl84ICogc3A7XG5cdGNvbnN0IGEgPSAxLjk3N185OThfNDk1XzEgKiBscCAtIDIuNDI4XzU5Ml8yMDUgKiBtcCArIDAuNDUwXzU5M183MDlfOSAqIHNwO1xuXHRjb25zdCBiID0gMC4wMjVfOTA0XzAzN18xICogbHAgKyAwLjc4Ml83NzFfNzY2XzIgKiBtcCAtIDAuODA4XzY3NV83NjYgKiBzcDtcblxuXHRyZXR1cm4gW2wgKiAxMDAsIGEgKiAxMDAsIGIgKiAxMDBdO1xufTtcblxuY29udmVydC5va2xhYi5va2xjaCA9IGZ1bmN0aW9uIChva2xhYikge1xuXHRyZXR1cm4gY29udmVydC5sYWIubGNoKG9rbGFiKTtcbn07XG5cbmNvbnZlcnQub2tsYWIueHl6ID0gZnVuY3Rpb24gKG9rbGFiKSB7XG5cdGNvbnN0IGxsID0gb2tsYWJbMF0gLyAxMDA7XG5cdGNvbnN0IGEgPSBva2xhYlsxXSAvIDEwMDtcblx0Y29uc3QgYiA9IG9rbGFiWzJdIC8gMTAwO1xuXG5cdGNvbnN0IGwgPSAoMC45OTlfOTk5Xzk5OCAqIGxsICsgMC4zOTZfMzM3Xzc5MiAqIGEgKyAwLjIxNV84MDNfNzU4ICogYikgKiogMztcblx0Y29uc3QgbSA9ICgxLjAwMF8wMDBfMDA4ICogbGwgLSAwLjEwNV81NjFfMzQyICogYSAtIDAuMDYzXzg1NF8xNzUgKiBiKSAqKiAzO1xuXHRjb25zdCBzID0gKDEuMDAwXzAwMF8wNTUgKiBsbCAtIDAuMDg5XzQ4NF8xODIgKiBhIC0gMS4yOTFfNDg1XzUzOCAqIGIpICoqIDM7XG5cblx0Y29uc3QgeCA9IDEuMjI3XzAxM184NTEgKiBsIC0gMC41NTdfNzk5Xzk4ICogbSArIDAuMjgxXzI1Nl8xNDkgKiBzO1xuXHRjb25zdCB5ID0gLTAuMDQwXzU4MF8xNzggKiBsICsgMS4xMTJfMjU2Xzg3ICogbSAtIDAuMDcxXzY3Nl82NzkgKiBzO1xuXHRjb25zdCB6ID0gLTAuMDc2XzM4MV8yODUgKiBsIC0gMC40MjFfNDgxXzk3OCAqIG0gKyAxLjU4Nl8xNjNfMjIgKiBzO1xuXG5cdHJldHVybiBbeCAqIDEwMCwgeSAqIDEwMCwgeiAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lm9rbGFiLnJnYiA9IGZ1bmN0aW9uIChva2xhYikge1xuXHRjb25zdCBsbCA9IG9rbGFiWzBdIC8gMTAwO1xuXHRjb25zdCBhYSA9IG9rbGFiWzFdIC8gMTAwO1xuXHRjb25zdCBiYiA9IG9rbGFiWzJdIC8gMTAwO1xuXG5cdGNvbnN0IGwgPSAobGwgKyAwLjM5Nl8zMzdfNzc3XzQgKiBhYSArIDAuMjE1XzgwM183NTdfMyAqIGJiKSAqKiAzO1xuXHRjb25zdCBtID0gKGxsIC0gMC4xMDVfNTYxXzM0NV84ICogYWEgLSAwLjA2M184NTRfMTcyXzggKiBiYikgKiogMztcblx0Y29uc3QgcyA9IChsbCAtIDAuMDg5XzQ4NF8xNzdfNSAqIGFhIC0gMS4yOTFfNDg1XzU0OCAqIGJiKSAqKiAzO1xuXG5cdC8vIEFzc3VtZSBzUkdCXG5cdGNvbnN0IHIgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtKDQuMDc2Xzc0MV82NjJfMSAqIGwgLSAzLjMwN183MTFfNTkxXzMgKiBtICsgMC4yMzBfOTY5XzkyOV8yICogcyk7XG5cdGNvbnN0IGcgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtKC0xLjI2OF80MzhfMDA0XzYgKiBsICsgMi42MDlfNzU3XzQwMV8xICogbSAtIDAuMzQxXzMxOV8zOTZfNSAqIHMpO1xuXHRjb25zdCBiID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybSgtMC4wMDRfMTk2XzA4Nl8zICogbCAtIDAuNzAzXzQxOF82MTRfNyAqIG0gKyAxLjcwN182MTRfNzAxICogcyk7XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQub2tsY2gub2tsYWIgPSBmdW5jdGlvbiAob2tsY2gpIHtcblx0cmV0dXJuIGNvbnZlcnQubGNoLmxhYihva2xjaCk7XG59O1xuXG5jb252ZXJ0LmxhYi54eXogPSBmdW5jdGlvbiAobGFiKSB7XG5cdGNvbnN0IGwgPSBsYWJbMF07XG5cdGNvbnN0IGEgPSBsYWJbMV07XG5cdGNvbnN0IGIgPSBsYWJbMl07XG5cdGxldCB4O1xuXHRsZXQgeTtcblx0bGV0IHo7XG5cblx0eSA9IChsICsgMTYpIC8gMTE2O1xuXHR4ID0gYSAvIDUwMCArIHk7XG5cdHogPSB5IC0gYiAvIDIwMDtcblxuXHRjb25zdCB5MiA9IHkgKiogMztcblx0Y29uc3QgeDIgPSB4ICoqIDM7XG5cdGNvbnN0IHoyID0geiAqKiAzO1xuXHR5ID0geTIgPiBMQUJfRlQgPyB5MiA6ICh5IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHggPSB4MiA+IExBQl9GVCA/IHgyIDogKHggLSAxNiAvIDExNikgLyA3Ljc4Nztcblx0eiA9IHoyID4gTEFCX0ZUID8gejIgOiAoeiAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXG5cdC8vIElsbHVtaW5hbnQgRDY1IFhZWiBUcmlzdHJpbXVsdXMgVmFsdWVzXG5cdC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NJRV8xOTMxX2NvbG9yX3NwYWNlXG5cdHggKj0gOTUuMDQ3O1xuXHR5ICo9IDEwMDtcblx0eiAqPSAxMDguODgzO1xuXG5cdHJldHVybiBbeCwgeSwgel07XG59O1xuXG5jb252ZXJ0LmxhYi5sY2ggPSBmdW5jdGlvbiAobGFiKSB7XG5cdGNvbnN0IGwgPSBsYWJbMF07XG5cdGNvbnN0IGEgPSBsYWJbMV07XG5cdGNvbnN0IGIgPSBsYWJbMl07XG5cdGxldCBoO1xuXG5cdGNvbnN0IGhyID0gTWF0aC5hdGFuMihiLCBhKTtcblx0aCA9IGhyICogMzYwIC8gMiAvIE1hdGguUEk7XG5cblx0aWYgKGggPCAwKSB7XG5cdFx0aCArPSAzNjA7XG5cdH1cblxuXHRjb25zdCBjID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpO1xuXG5cdHJldHVybiBbbCwgYywgaF07XG59O1xuXG5jb252ZXJ0LmxjaC5sYWIgPSBmdW5jdGlvbiAobGNoKSB7XG5cdGNvbnN0IGwgPSBsY2hbMF07XG5cdGNvbnN0IGMgPSBsY2hbMV07XG5cdGNvbnN0IGggPSBsY2hbMl07XG5cblx0Y29uc3QgaHIgPSBoIC8gMzYwICogMiAqIE1hdGguUEk7XG5cdGNvbnN0IGEgPSBjICogTWF0aC5jb3MoaHIpO1xuXHRjb25zdCBiID0gYyAqIE1hdGguc2luKGhyKTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5yZ2IuYW5zaTE2ID0gZnVuY3Rpb24gKGFyZ3MsIHNhdHVyYXRpb24gPSBudWxsKSB7XG5cdGNvbnN0IFtyLCBnLCBiXSA9IGFyZ3M7XG5cdGxldCB2YWx1ZSA9IHNhdHVyYXRpb24gPT09IG51bGwgPyBjb252ZXJ0LnJnYi5oc3YoYXJncylbMl0gOiBzYXR1cmF0aW9uOyAvLyBIc3YgLT4gYW5zaTE2IG9wdGltaXphdGlvblxuXG5cdHZhbHVlID0gTWF0aC5yb3VuZCh2YWx1ZSAvIDUwKTtcblxuXHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRyZXR1cm4gMzA7XG5cdH1cblxuXHRsZXQgYW5zaSA9IDMwXG5cdFx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRcdCsgKChNYXRoLnJvdW5kKGIgLyAyNTUpIDw8IDIpXG5cdFx0fCAoTWF0aC5yb3VuZChnIC8gMjU1KSA8PCAxKVxuXHRcdHwgTWF0aC5yb3VuZChyIC8gMjU1KSk7XG5cdFx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cblx0aWYgKHZhbHVlID09PSAyKSB7XG5cdFx0YW5zaSArPSA2MDtcblx0fVxuXG5cdHJldHVybiBhbnNpO1xufTtcblxuY29udmVydC5oc3YuYW5zaTE2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Ly8gT3B0aW1pemF0aW9uIGhlcmU7IHdlIGFscmVhZHkga25vdyB0aGUgdmFsdWUgYW5kIGRvbid0IG5lZWQgdG8gZ2V0XG5cdC8vIGl0IGNvbnZlcnRlZCBmb3IgdXMuXG5cdHJldHVybiBjb252ZXJ0LnJnYi5hbnNpMTYoY29udmVydC5oc3YucmdiKGFyZ3MpLCBhcmdzWzJdKTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kyNTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHRjb25zdCByID0gYXJnc1swXTtcblx0Y29uc3QgZyA9IGFyZ3NbMV07XG5cdGNvbnN0IGIgPSBhcmdzWzJdO1xuXG5cdC8vIFdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRpZiAociA+PiA0ID09PSBnID4+IDQgJiYgZyA+PiA0ID09PSBiID4+IDQpIHtcblx0XHRpZiAociA8IDgpIHtcblx0XHRcdHJldHVybiAxNjtcblx0XHR9XG5cblx0XHRpZiAociA+IDI0OCkge1xuXHRcdFx0cmV0dXJuIDIzMTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHIgLSA4KSAvIDI0NykgKiAyNCkgKyAyMzI7XG5cdH1cblxuXHRjb25zdCBhbnNpID0gMTZcblx0XHQrICgzNiAqIE1hdGgucm91bmQociAvIDI1NSAqIDUpKVxuXHRcdCsgKDYgKiBNYXRoLnJvdW5kKGcgLyAyNTUgKiA1KSlcblx0XHQrIE1hdGgucm91bmQoYiAvIDI1NSAqIDUpO1xuXG5cdHJldHVybiBhbnNpO1xufTtcblxuY29udmVydC5hbnNpMTYucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0YXJncyA9IGFyZ3NbMF07XG5cblx0bGV0IGNvbG9yID0gYXJncyAlIDEwO1xuXG5cdC8vIEhhbmRsZSBncmV5c2NhbGVcblx0aWYgKGNvbG9yID09PSAwIHx8IGNvbG9yID09PSA3KSB7XG5cdFx0aWYgKGFyZ3MgPiA1MCkge1xuXHRcdFx0Y29sb3IgKz0gMy41O1xuXHRcdH1cblxuXHRcdGNvbG9yID0gY29sb3IgLyAxMC41ICogMjU1O1xuXG5cdFx0cmV0dXJuIFtjb2xvciwgY29sb3IsIGNvbG9yXTtcblx0fVxuXG5cdGNvbnN0IG11bHQgPSAoTWF0aC50cnVuYyhhcmdzID4gNTApICsgMSkgKiAwLjU7XG5cdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0Y29uc3QgciA9ICgoY29sb3IgJiAxKSAqIG11bHQpICogMjU1O1xuXHRjb25zdCBnID0gKCgoY29sb3IgPj4gMSkgJiAxKSAqIG11bHQpICogMjU1O1xuXHRjb25zdCBiID0gKCgoY29sb3IgPj4gMikgJiAxKSAqIG11bHQpICogMjU1O1xuXHQvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5hbnNpMjU2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdGFyZ3MgPSBhcmdzWzBdO1xuXG5cdC8vIEhhbmRsZSBncmV5c2NhbGVcblx0aWYgKGFyZ3MgPj0gMjMyKSB7XG5cdFx0Y29uc3QgYyA9IChhcmdzIC0gMjMyKSAqIDEwICsgODtcblx0XHRyZXR1cm4gW2MsIGMsIGNdO1xuXHR9XG5cblx0YXJncyAtPSAxNjtcblxuXHRsZXQgcmVtO1xuXHRjb25zdCByID0gTWF0aC5mbG9vcihhcmdzIC8gMzYpIC8gNSAqIDI1NTtcblx0Y29uc3QgZyA9IE1hdGguZmxvb3IoKHJlbSA9IGFyZ3MgJSAzNikgLyA2KSAvIDUgKiAyNTU7XG5cdGNvbnN0IGIgPSAocmVtICUgNikgLyA1ICogMjU1O1xuXG5cdHJldHVybiBbciwgZywgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5oZXggPSBmdW5jdGlvbiAoYXJncykge1xuXHQvKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cdGNvbnN0IGludGVnZXIgPSAoKE1hdGgucm91bmQoYXJnc1swXSkgJiAweEZGKSA8PCAxNilcblx0XHQrICgoTWF0aC5yb3VuZChhcmdzWzFdKSAmIDB4RkYpIDw8IDgpXG5cdFx0KyAoTWF0aC5yb3VuZChhcmdzWzJdKSAmIDB4RkYpO1xuXHQvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cblxuXHRjb25zdCBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc2xpY2Uoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LmhleC5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRjb25zdCBtYXRjaCA9IGFyZ3MudG9TdHJpbmcoMTYpLm1hdGNoKC9bYS1mXFxkXXs2fXxbYS1mXFxkXXszfS9pKTtcblx0aWYgKCFtYXRjaCkge1xuXHRcdHJldHVybiBbMCwgMCwgMF07XG5cdH1cblxuXHRsZXQgY29sb3JTdHJpbmcgPSBtYXRjaFswXTtcblxuXHRpZiAobWF0Y2hbMF0ubGVuZ3RoID09PSAzKSB7XG5cdFx0Y29sb3JTdHJpbmcgPSBbLi4uY29sb3JTdHJpbmddLm1hcChjaGFyID0+IGNoYXIgKyBjaGFyKS5qb2luKCcnKTtcblx0fVxuXG5cdGNvbnN0IGludGVnZXIgPSBOdW1iZXIucGFyc2VJbnQoY29sb3JTdHJpbmcsIDE2KTtcblx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRjb25zdCByID0gKGludGVnZXIgPj4gMTYpICYgMHhGRjtcblx0Y29uc3QgZyA9IChpbnRlZ2VyID4+IDgpICYgMHhGRjtcblx0Y29uc3QgYiA9IGludGVnZXIgJiAweEZGO1xuXHQvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5yZ2IuaGNnID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXHRjb25zdCBtYXggPSBNYXRoLm1heChNYXRoLm1heChyLCBnKSwgYik7XG5cdGNvbnN0IG1pbiA9IE1hdGgubWluKE1hdGgubWluKHIsIGcpLCBiKTtcblx0Y29uc3QgY2hyb21hID0gKG1heCAtIG1pbik7XG5cdGxldCBodWU7XG5cblx0Y29uc3QgZ3JheXNjYWxlID0gY2hyb21hIDwgMSA/IG1pbiAvICgxIC0gY2hyb21hKSA6IDA7XG5cblx0aWYgKGNocm9tYSA8PSAwKSB7XG5cdFx0aHVlID0gMDtcblx0fSBlbHNlIGlmIChtYXggPT09IHIpIHtcblx0XHRodWUgPSAoKGcgLSBiKSAvIGNocm9tYSkgJSA2O1xuXHR9IGVsc2UgaWYgKG1heCA9PT0gZykge1xuXHRcdGh1ZSA9IDIgKyAoYiAtIHIpIC8gY2hyb21hO1xuXHR9IGVsc2Uge1xuXHRcdGh1ZSA9IDQgKyAociAtIGcpIC8gY2hyb21hO1xuXHR9XG5cblx0aHVlIC89IDY7XG5cdGh1ZSAlPSAxO1xuXG5cdHJldHVybiBbaHVlICogMzYwLCBjaHJvbWEgKiAxMDAsIGdyYXlzY2FsZSAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhzbC5oY2cgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGNvbnN0IGwgPSBoc2xbMl0gLyAxMDA7XG5cblx0Y29uc3QgYyA9IGwgPCAwLjUgPyAoMiAqIHMgKiBsKSA6ICgyICogcyAqICgxIC0gbCkpO1xuXG5cdGxldCBmID0gMDtcblx0aWYgKGMgPCAxKSB7XG5cdFx0ZiA9IChsIC0gMC41ICogYykgLyAoMSAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtoc2xbMF0sIGMgKiAxMDAsIGYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YuaGNnID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBzID0gaHN2WzFdIC8gMTAwO1xuXHRjb25zdCB2ID0gaHN2WzJdIC8gMTAwO1xuXG5cdGNvbnN0IGMgPSBzICogdjtcblx0bGV0IGYgPSAwO1xuXG5cdGlmIChjIDwgMSkge1xuXHRcdGYgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHN2WzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLnJnYiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgaCA9IGhjZ1swXSAvIDM2MDtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRpZiAoYyA9PT0gMCkge1xuXHRcdHJldHVybiBbZyAqIDI1NSwgZyAqIDI1NSwgZyAqIDI1NV07XG5cdH1cblxuXHRjb25zdCBwdXJlID0gWzAsIDAsIDBdO1xuXHRjb25zdCBoaSA9IChoICUgMSkgKiA2O1xuXHRjb25zdCB2ID0gaGkgJSAxO1xuXHRjb25zdCB3ID0gMSAtIHY7XG5cdGxldCBtZyA9IDA7XG5cblx0LyogZXNsaW50LWRpc2FibGUgbWF4LXN0YXRlbWVudHMtcGVyLWxpbmUgKi9cblx0c3dpdGNoIChNYXRoLmZsb29yKGhpKSkge1xuXHRcdGNhc2UgMDoge1xuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSB2OyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSAxOiB7XG5cdFx0XHRwdXJlWzBdID0gdzsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSAwOyBicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIDI6IHtcblx0XHRcdHB1cmVbMF0gPSAwOyBwdXJlWzFdID0gMTsgcHVyZVsyXSA9IHY7IGJyZWFrO1xuXHRcdH1cblxuXHRcdGNhc2UgMzoge1xuXHRcdFx0cHVyZVswXSA9IDA7IHB1cmVbMV0gPSB3OyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSA0OiB7XG5cdFx0XHRwdXJlWzBdID0gdjsgcHVyZVsxXSA9IDA7IHB1cmVbMl0gPSAxOyBicmVhaztcblx0XHR9XG5cblx0XHRkZWZhdWx0OiB7XG5cdFx0XHRwdXJlWzBdID0gMTsgcHVyZVsxXSA9IDA7IHB1cmVbMl0gPSB3O1xuXHRcdH1cblx0fVxuXHQvKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lICovXG5cblx0bWcgPSAoMSAtIGMpICogZztcblxuXHRyZXR1cm4gW1xuXHRcdChjICogcHVyZVswXSArIG1nKSAqIDI1NSxcblx0XHQoYyAqIHB1cmVbMV0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzJdICsgbWcpICogMjU1LFxuXHRdO1xufTtcblxuY29udmVydC5oY2cuaHN2ID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdGNvbnN0IHYgPSBjICsgZyAqICgxIC0gYyk7XG5cdGxldCBmID0gMDtcblxuXHRpZiAodiA+IDApIHtcblx0XHRmID0gYyAvIHY7XG5cdH1cblxuXHRyZXR1cm4gW2hjZ1swXSwgZiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5oc2wgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0Y29uc3QgbCA9IGcgKiAoMSAtIGMpICsgMC41ICogYztcblx0bGV0IHMgPSAwO1xuXG5cdGlmIChsID4gMCAmJiBsIDwgMC41KSB7XG5cdFx0cyA9IGMgLyAoMiAqIGwpO1xuXHR9IGVsc2UgaWYgKGwgPj0gMC41ICYmIGwgPCAxKSB7XG5cdFx0cyA9IGMgLyAoMiAqICgxIC0gbCkpO1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIHMgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHdiID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXHRjb25zdCB2ID0gYyArIGcgKiAoMSAtIGMpO1xuXHRyZXR1cm4gW2hjZ1swXSwgKHYgLSBjKSAqIDEwMCwgKDEgLSB2KSAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmh3Yi5oY2cgPSBmdW5jdGlvbiAoaHdiKSB7XG5cdGNvbnN0IHcgPSBod2JbMV0gLyAxMDA7XG5cdGNvbnN0IGIgPSBod2JbMl0gLyAxMDA7XG5cdGNvbnN0IHYgPSAxIC0gYjtcblx0Y29uc3QgYyA9IHYgLSB3O1xuXHRsZXQgZyA9IDA7XG5cblx0aWYgKGMgPCAxKSB7XG5cdFx0ZyA9ICh2IC0gYykgLyAoMSAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtod2JbMF0sIGMgKiAxMDAsIGcgKiAxMDBdO1xufTtcblxuY29udmVydC5hcHBsZS5yZ2IgPSBmdW5jdGlvbiAoYXBwbGUpIHtcblx0cmV0dXJuIFsoYXBwbGVbMF0gLyA2NV81MzUpICogMjU1LCAoYXBwbGVbMV0gLyA2NV81MzUpICogMjU1LCAoYXBwbGVbMl0gLyA2NV81MzUpICogMjU1XTtcbn07XG5cbmNvbnZlcnQucmdiLmFwcGxlID0gZnVuY3Rpb24gKHJnYikge1xuXHRyZXR1cm4gWyhyZ2JbMF0gLyAyNTUpICogNjVfNTM1LCAocmdiWzFdIC8gMjU1KSAqIDY1XzUzNSwgKHJnYlsyXSAvIDI1NSkgKiA2NV81MzVdO1xufTtcblxuY29udmVydC5ncmF5LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbYXJnc1swXSAvIDEwMCAqIDI1NSwgYXJnc1swXSAvIDEwMCAqIDI1NSwgYXJnc1swXSAvIDEwMCAqIDI1NV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHNsID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0cmV0dXJuIFswLCAwLCBhcmdzWzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5oc3YgPSBjb252ZXJ0LmdyYXkuaHNsO1xuXG5jb252ZXJ0LmdyYXkuaHdiID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAxMDAsIGdyYXlbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmNteWsgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gWzAsIDAsIDAsIGdyYXlbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmxhYiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbZ3JheVswXSwgMCwgMF07XG59O1xuXG5jb252ZXJ0LmdyYXkuaGV4ID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRjb25zdCB2YWx1ZSA9IE1hdGgucm91bmQoZ3JheVswXSAvIDEwMCAqIDI1NSkgJiAweEZGO1xuXHRjb25zdCBpbnRlZ2VyID0gKHZhbHVlIDw8IDE2KSArICh2YWx1ZSA8PCA4KSArIHZhbHVlO1xuXHQvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cblxuXHRjb25zdCBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc2xpY2Uoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LnJnYi5ncmF5ID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCB2YWx1ZSA9IChyZ2JbMF0gKyByZ2JbMV0gKyByZ2JbMl0pIC8gMztcblx0cmV0dXJuIFt2YWx1ZSAvIDI1NSAqIDEwMF07XG59O1xuIiwiaW1wb3J0IGNvbnZlcnNpb25zIGZyb20gJy4vY29udmVyc2lvbnMuanMnO1xuaW1wb3J0IHJvdXRlIGZyb20gJy4vcm91dGUuanMnO1xuXG5jb25zdCBjb252ZXJ0ID0ge307XG5cbmNvbnN0IG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuZnVuY3Rpb24gd3JhcFJhdyhmbikge1xuXHRjb25zdCB3cmFwcGVkRm4gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdGNvbnN0IGFyZzAgPSBhcmdzWzBdO1xuXHRcdGlmIChhcmcwID09PSB1bmRlZmluZWQgfHwgYXJnMCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZzA7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZzAubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IGFyZzA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKGFyZ3MpO1xuXHR9O1xuXG5cdC8vIFByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxuZnVuY3Rpb24gd3JhcFJvdW5kZWQoZm4pIHtcblx0Y29uc3Qgd3JhcHBlZEZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBhcmcwID0gYXJnc1swXTtcblxuXHRcdGlmIChhcmcwID09PSB1bmRlZmluZWQgfHwgYXJnMCA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZzA7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZzAubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IGFyZzA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0ID0gZm4oYXJncyk7XG5cblx0XHQvLyBXZSdyZSBhc3N1bWluZyB0aGUgcmVzdWx0IGlzIGFuIGFycmF5IGhlcmUuXG5cdFx0Ly8gc2VlIG5vdGljZSBpbiBjb252ZXJzaW9ucy5qczsgZG9uJ3QgdXNlIGJveCB0eXBlc1xuXHRcdC8vIGluIGNvbnZlcnNpb24gZnVuY3Rpb25zLlxuXHRcdGlmICh0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0Jykge1xuXHRcdFx0Zm9yIChsZXQge2xlbmd0aH0gPSByZXN1bHQsIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Ly8gUHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5mb3IgKGNvbnN0IGZyb21Nb2RlbCBvZiBtb2RlbHMpIHtcblx0Y29udmVydFtmcm9tTW9kZWxdID0ge307XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbZnJvbU1vZGVsXSwgJ2NoYW5uZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmNoYW5uZWxzfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdsYWJlbHMnLCB7dmFsdWU6IGNvbnZlcnNpb25zW2Zyb21Nb2RlbF0ubGFiZWxzfSk7XG5cblx0Y29uc3Qgcm91dGVzID0gcm91dGUoZnJvbU1vZGVsKTtcblx0Y29uc3Qgcm91dGVNb2RlbHMgPSBPYmplY3Qua2V5cyhyb3V0ZXMpO1xuXG5cdGZvciAoY29uc3QgdG9Nb2RlbCBvZiByb3V0ZU1vZGVscykge1xuXHRcdGNvbnN0IGZuID0gcm91dGVzW3RvTW9kZWxdO1xuXG5cdFx0Y29udmVydFtmcm9tTW9kZWxdW3RvTW9kZWxdID0gd3JhcFJvdW5kZWQoZm4pO1xuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXS5yYXcgPSB3cmFwUmF3KGZuKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0O1xuIiwiaW1wb3J0IGNvbnZlcnNpb25zIGZyb20gJy4vY29udmVyc2lvbnMuanMnO1xuXG4vKlxuXHRUaGlzIGZ1bmN0aW9uIHJvdXRlcyBhIG1vZGVsIHRvIGFsbCBvdGhlciBtb2RlbHMuXG5cblx0YWxsIGZ1bmN0aW9ucyB0aGF0IGFyZSByb3V0ZWQgaGF2ZSBhIHByb3BlcnR5IGAuY29udmVyc2lvbmAgYXR0YWNoZWRcblx0dG8gdGhlIHJldHVybmVkIHN5bnRoZXRpYyBmdW5jdGlvbi4gVGhpcyBwcm9wZXJ0eSBpcyBhbiBhcnJheVxuXHRvZiBzdHJpbmdzLCBlYWNoIHdpdGggdGhlIHN0ZXBzIGluIGJldHdlZW4gdGhlICdmcm9tJyBhbmQgJ3RvJ1xuXHRjb2xvciBtb2RlbHMgKGluY2x1c2l2ZSkuXG5cblx0Y29udmVyc2lvbnMgdGhhdCBhcmUgbm90IHBvc3NpYmxlIHNpbXBseSBhcmUgbm90IGluY2x1ZGVkLlxuKi9cblxuZnVuY3Rpb24gYnVpbGRHcmFwaCgpIHtcblx0Y29uc3QgZ3JhcGggPSB7fTtcblx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL29iamVjdC1rZXlzLXZzLWZvci1pbi13aXRoLWNsb3N1cmUvM1xuXHRjb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9ucyk7XG5cblx0Zm9yIChsZXQge2xlbmd0aH0gPSBtb2RlbHMsIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRncmFwaFttb2RlbHNbaV1dID0ge1xuXHRcdFx0Ly8gaHR0cDovL2pzcGVyZi5jb20vMS12cy1pbmZpbml0eVxuXHRcdFx0Ly8gbWljcm8tb3B0LCBidXQgdGhpcyBpcyBzaW1wbGUuXG5cdFx0XHRkaXN0YW5jZTogLTEsXG5cdFx0XHRwYXJlbnQ6IG51bGwsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQnJlYWR0aC1maXJzdF9zZWFyY2hcbmZ1bmN0aW9uIGRlcml2ZUJGUyhmcm9tTW9kZWwpIHtcblx0Y29uc3QgZ3JhcGggPSBidWlsZEdyYXBoKCk7XG5cdGNvbnN0IHF1ZXVlID0gW2Zyb21Nb2RlbF07IC8vIFVuc2hpZnQgLT4gcXVldWUgLT4gcG9wXG5cblx0Z3JhcGhbZnJvbU1vZGVsXS5kaXN0YW5jZSA9IDA7XG5cblx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRjb25zdCBjdXJyZW50ID0gcXVldWUucG9wKCk7XG5cdFx0Y29uc3QgYWRqYWNlbnRzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnNbY3VycmVudF0pO1xuXG5cdFx0Zm9yIChsZXQge2xlbmd0aH0gPSBhZGphY2VudHMsIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGFkamFjZW50ID0gYWRqYWNlbnRzW2ldO1xuXHRcdFx0Y29uc3Qgbm9kZSA9IGdyYXBoW2FkamFjZW50XTtcblxuXHRcdFx0aWYgKG5vZGUuZGlzdGFuY2UgPT09IC0xKSB7XG5cdFx0XHRcdG5vZGUuZGlzdGFuY2UgPSBncmFwaFtjdXJyZW50XS5kaXN0YW5jZSArIDE7XG5cdFx0XHRcdG5vZGUucGFyZW50ID0gY3VycmVudDtcblx0XHRcdFx0cXVldWUudW5zaGlmdChhZGphY2VudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGdyYXBoO1xufVxuXG5mdW5jdGlvbiBsaW5rKGZyb20sIHRvKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoYXJncykge1xuXHRcdHJldHVybiB0byhmcm9tKGFyZ3MpKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpIHtcblx0Y29uc3QgcGF0aCA9IFtncmFwaFt0b01vZGVsXS5wYXJlbnQsIHRvTW9kZWxdO1xuXHRsZXQgZm4gPSBjb252ZXJzaW9uc1tncmFwaFt0b01vZGVsXS5wYXJlbnRdW3RvTW9kZWxdO1xuXG5cdGxldCBjdXIgPSBncmFwaFt0b01vZGVsXS5wYXJlbnQ7XG5cdHdoaWxlIChncmFwaFtjdXJdLnBhcmVudCkge1xuXHRcdHBhdGgudW5zaGlmdChncmFwaFtjdXJdLnBhcmVudCk7XG5cdFx0Zm4gPSBsaW5rKGNvbnZlcnNpb25zW2dyYXBoW2N1cl0ucGFyZW50XVtjdXJdLCBmbik7XG5cdFx0Y3VyID0gZ3JhcGhbY3VyXS5wYXJlbnQ7XG5cdH1cblxuXHRmbi5jb252ZXJzaW9uID0gcGF0aDtcblx0cmV0dXJuIGZuO1xufVxuXG5mdW5jdGlvbiByb3V0ZShmcm9tTW9kZWwpIHtcblx0Y29uc3QgZ3JhcGggPSBkZXJpdmVCRlMoZnJvbU1vZGVsKTtcblx0Y29uc3QgY29udmVyc2lvbiA9IHt9O1xuXG5cdGNvbnN0IG1vZGVscyA9IE9iamVjdC5rZXlzKGdyYXBoKTtcblx0Zm9yIChsZXQge2xlbmd0aH0gPSBtb2RlbHMsIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCB0b01vZGVsID0gbW9kZWxzW2ldO1xuXHRcdGNvbnN0IG5vZGUgPSBncmFwaFt0b01vZGVsXTtcblxuXHRcdGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gTm8gcG9zc2libGUgY29udmVyc2lvbiwgb3IgdGhpcyBub2RlIGlzIHRoZSBzb3VyY2UgbW9kZWwuXG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb252ZXJzaW9uW3RvTW9kZWxdID0gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpO1xuXHR9XG5cblx0cmV0dXJuIGNvbnZlcnNpb247XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlO1xuIiwiY29uc3QgY29sb3JzID0ge1xuXHRhbGljZWJsdWU6IFsyNDAsIDI0OCwgMjU1XSxcblx0YW50aXF1ZXdoaXRlOiBbMjUwLCAyMzUsIDIxNV0sXG5cdGFxdWE6IFswLCAyNTUsIDI1NV0sXG5cdGFxdWFtYXJpbmU6IFsxMjcsIDI1NSwgMjEyXSxcblx0YXp1cmU6IFsyNDAsIDI1NSwgMjU1XSxcblx0YmVpZ2U6IFsyNDUsIDI0NSwgMjIwXSxcblx0YmlzcXVlOiBbMjU1LCAyMjgsIDE5Nl0sXG5cdGJsYWNrOiBbMCwgMCwgMF0sXG5cdGJsYW5jaGVkYWxtb25kOiBbMjU1LCAyMzUsIDIwNV0sXG5cdGJsdWU6IFswLCAwLCAyNTVdLFxuXHRibHVldmlvbGV0OiBbMTM4LCA0MywgMjI2XSxcblx0YnJvd246IFsxNjUsIDQyLCA0Ml0sXG5cdGJ1cmx5d29vZDogWzIyMiwgMTg0LCAxMzVdLFxuXHRjYWRldGJsdWU6IFs5NSwgMTU4LCAxNjBdLFxuXHRjaGFydHJldXNlOiBbMTI3LCAyNTUsIDBdLFxuXHRjaG9jb2xhdGU6IFsyMTAsIDEwNSwgMzBdLFxuXHRjb3JhbDogWzI1NSwgMTI3LCA4MF0sXG5cdGNvcm5mbG93ZXJibHVlOiBbMTAwLCAxNDksIDIzN10sXG5cdGNvcm5zaWxrOiBbMjU1LCAyNDgsIDIyMF0sXG5cdGNyaW1zb246IFsyMjAsIDIwLCA2MF0sXG5cdGN5YW46IFswLCAyNTUsIDI1NV0sXG5cdGRhcmtibHVlOiBbMCwgMCwgMTM5XSxcblx0ZGFya2N5YW46IFswLCAxMzksIDEzOV0sXG5cdGRhcmtnb2xkZW5yb2Q6IFsxODQsIDEzNCwgMTFdLFxuXHRkYXJrZ3JheTogWzE2OSwgMTY5LCAxNjldLFxuXHRkYXJrZ3JlZW46IFswLCAxMDAsIDBdLFxuXHRkYXJrZ3JleTogWzE2OSwgMTY5LCAxNjldLFxuXHRkYXJra2hha2k6IFsxODksIDE4MywgMTA3XSxcblx0ZGFya21hZ2VudGE6IFsxMzksIDAsIDEzOV0sXG5cdGRhcmtvbGl2ZWdyZWVuOiBbODUsIDEwNywgNDddLFxuXHRkYXJrb3JhbmdlOiBbMjU1LCAxNDAsIDBdLFxuXHRkYXJrb3JjaGlkOiBbMTUzLCA1MCwgMjA0XSxcblx0ZGFya3JlZDogWzEzOSwgMCwgMF0sXG5cdGRhcmtzYWxtb246IFsyMzMsIDE1MCwgMTIyXSxcblx0ZGFya3NlYWdyZWVuOiBbMTQzLCAxODgsIDE0M10sXG5cdGRhcmtzbGF0ZWJsdWU6IFs3MiwgNjEsIDEzOV0sXG5cdGRhcmtzbGF0ZWdyYXk6IFs0NywgNzksIDc5XSxcblx0ZGFya3NsYXRlZ3JleTogWzQ3LCA3OSwgNzldLFxuXHRkYXJrdHVycXVvaXNlOiBbMCwgMjA2LCAyMDldLFxuXHRkYXJrdmlvbGV0OiBbMTQ4LCAwLCAyMTFdLFxuXHRkZWVwcGluazogWzI1NSwgMjAsIDE0N10sXG5cdGRlZXBza3libHVlOiBbMCwgMTkxLCAyNTVdLFxuXHRkaW1ncmF5OiBbMTA1LCAxMDUsIDEwNV0sXG5cdGRpbWdyZXk6IFsxMDUsIDEwNSwgMTA1XSxcblx0ZG9kZ2VyYmx1ZTogWzMwLCAxNDQsIDI1NV0sXG5cdGZpcmVicmljazogWzE3OCwgMzQsIDM0XSxcblx0ZmxvcmFsd2hpdGU6IFsyNTUsIDI1MCwgMjQwXSxcblx0Zm9yZXN0Z3JlZW46IFszNCwgMTM5LCAzNF0sXG5cdGZ1Y2hzaWE6IFsyNTUsIDAsIDI1NV0sXG5cdGdhaW5zYm9ybzogWzIyMCwgMjIwLCAyMjBdLFxuXHRnaG9zdHdoaXRlOiBbMjQ4LCAyNDgsIDI1NV0sXG5cdGdvbGQ6IFsyNTUsIDIxNSwgMF0sXG5cdGdvbGRlbnJvZDogWzIxOCwgMTY1LCAzMl0sXG5cdGdyYXk6IFsxMjgsIDEyOCwgMTI4XSxcblx0Z3JlZW46IFswLCAxMjgsIDBdLFxuXHRncmVlbnllbGxvdzogWzE3MywgMjU1LCA0N10sXG5cdGdyZXk6IFsxMjgsIDEyOCwgMTI4XSxcblx0aG9uZXlkZXc6IFsyNDAsIDI1NSwgMjQwXSxcblx0aG90cGluazogWzI1NSwgMTA1LCAxODBdLFxuXHRpbmRpYW5yZWQ6IFsyMDUsIDkyLCA5Ml0sXG5cdGluZGlnbzogWzc1LCAwLCAxMzBdLFxuXHRpdm9yeTogWzI1NSwgMjU1LCAyNDBdLFxuXHRraGFraTogWzI0MCwgMjMwLCAxNDBdLFxuXHRsYXZlbmRlcjogWzIzMCwgMjMwLCAyNTBdLFxuXHRsYXZlbmRlcmJsdXNoOiBbMjU1LCAyNDAsIDI0NV0sXG5cdGxhd25ncmVlbjogWzEyNCwgMjUyLCAwXSxcblx0bGVtb25jaGlmZm9uOiBbMjU1LCAyNTAsIDIwNV0sXG5cdGxpZ2h0Ymx1ZTogWzE3MywgMjE2LCAyMzBdLFxuXHRsaWdodGNvcmFsOiBbMjQwLCAxMjgsIDEyOF0sXG5cdGxpZ2h0Y3lhbjogWzIyNCwgMjU1LCAyNTVdLFxuXHRsaWdodGdvbGRlbnJvZHllbGxvdzogWzI1MCwgMjUwLCAyMTBdLFxuXHRsaWdodGdyYXk6IFsyMTEsIDIxMSwgMjExXSxcblx0bGlnaHRncmVlbjogWzE0NCwgMjM4LCAxNDRdLFxuXHRsaWdodGdyZXk6IFsyMTEsIDIxMSwgMjExXSxcblx0bGlnaHRwaW5rOiBbMjU1LCAxODIsIDE5M10sXG5cdGxpZ2h0c2FsbW9uOiBbMjU1LCAxNjAsIDEyMl0sXG5cdGxpZ2h0c2VhZ3JlZW46IFszMiwgMTc4LCAxNzBdLFxuXHRsaWdodHNreWJsdWU6IFsxMzUsIDIwNiwgMjUwXSxcblx0bGlnaHRzbGF0ZWdyYXk6IFsxMTksIDEzNiwgMTUzXSxcblx0bGlnaHRzbGF0ZWdyZXk6IFsxMTksIDEzNiwgMTUzXSxcblx0bGlnaHRzdGVlbGJsdWU6IFsxNzYsIDE5NiwgMjIyXSxcblx0bGlnaHR5ZWxsb3c6IFsyNTUsIDI1NSwgMjI0XSxcblx0bGltZTogWzAsIDI1NSwgMF0sXG5cdGxpbWVncmVlbjogWzUwLCAyMDUsIDUwXSxcblx0bGluZW46IFsyNTAsIDI0MCwgMjMwXSxcblx0bWFnZW50YTogWzI1NSwgMCwgMjU1XSxcblx0bWFyb29uOiBbMTI4LCAwLCAwXSxcblx0bWVkaXVtYXF1YW1hcmluZTogWzEwMiwgMjA1LCAxNzBdLFxuXHRtZWRpdW1ibHVlOiBbMCwgMCwgMjA1XSxcblx0bWVkaXVtb3JjaGlkOiBbMTg2LCA4NSwgMjExXSxcblx0bWVkaXVtcHVycGxlOiBbMTQ3LCAxMTIsIDIxOV0sXG5cdG1lZGl1bXNlYWdyZWVuOiBbNjAsIDE3OSwgMTEzXSxcblx0bWVkaXVtc2xhdGVibHVlOiBbMTIzLCAxMDQsIDIzOF0sXG5cdG1lZGl1bXNwcmluZ2dyZWVuOiBbMCwgMjUwLCAxNTRdLFxuXHRtZWRpdW10dXJxdW9pc2U6IFs3MiwgMjA5LCAyMDRdLFxuXHRtZWRpdW12aW9sZXRyZWQ6IFsxOTksIDIxLCAxMzNdLFxuXHRtaWRuaWdodGJsdWU6IFsyNSwgMjUsIDExMl0sXG5cdG1pbnRjcmVhbTogWzI0NSwgMjU1LCAyNTBdLFxuXHRtaXN0eXJvc2U6IFsyNTUsIDIyOCwgMjI1XSxcblx0bW9jY2FzaW46IFsyNTUsIDIyOCwgMTgxXSxcblx0bmF2YWpvd2hpdGU6IFsyNTUsIDIyMiwgMTczXSxcblx0bmF2eTogWzAsIDAsIDEyOF0sXG5cdG9sZGxhY2U6IFsyNTMsIDI0NSwgMjMwXSxcblx0b2xpdmU6IFsxMjgsIDEyOCwgMF0sXG5cdG9saXZlZHJhYjogWzEwNywgMTQyLCAzNV0sXG5cdG9yYW5nZTogWzI1NSwgMTY1LCAwXSxcblx0b3JhbmdlcmVkOiBbMjU1LCA2OSwgMF0sXG5cdG9yY2hpZDogWzIxOCwgMTEyLCAyMTRdLFxuXHRwYWxlZ29sZGVucm9kOiBbMjM4LCAyMzIsIDE3MF0sXG5cdHBhbGVncmVlbjogWzE1MiwgMjUxLCAxNTJdLFxuXHRwYWxldHVycXVvaXNlOiBbMTc1LCAyMzgsIDIzOF0sXG5cdHBhbGV2aW9sZXRyZWQ6IFsyMTksIDExMiwgMTQ3XSxcblx0cGFwYXlhd2hpcDogWzI1NSwgMjM5LCAyMTNdLFxuXHRwZWFjaHB1ZmY6IFsyNTUsIDIxOCwgMTg1XSxcblx0cGVydTogWzIwNSwgMTMzLCA2M10sXG5cdHBpbms6IFsyNTUsIDE5MiwgMjAzXSxcblx0cGx1bTogWzIyMSwgMTYwLCAyMjFdLFxuXHRwb3dkZXJibHVlOiBbMTc2LCAyMjQsIDIzMF0sXG5cdHB1cnBsZTogWzEyOCwgMCwgMTI4XSxcblx0cmViZWNjYXB1cnBsZTogWzEwMiwgNTEsIDE1M10sXG5cdHJlZDogWzI1NSwgMCwgMF0sXG5cdHJvc3licm93bjogWzE4OCwgMTQzLCAxNDNdLFxuXHRyb3lhbGJsdWU6IFs2NSwgMTA1LCAyMjVdLFxuXHRzYWRkbGVicm93bjogWzEzOSwgNjksIDE5XSxcblx0c2FsbW9uOiBbMjUwLCAxMjgsIDExNF0sXG5cdHNhbmR5YnJvd246IFsyNDQsIDE2NCwgOTZdLFxuXHRzZWFncmVlbjogWzQ2LCAxMzksIDg3XSxcblx0c2Vhc2hlbGw6IFsyNTUsIDI0NSwgMjM4XSxcblx0c2llbm5hOiBbMTYwLCA4MiwgNDVdLFxuXHRzaWx2ZXI6IFsxOTIsIDE5MiwgMTkyXSxcblx0c2t5Ymx1ZTogWzEzNSwgMjA2LCAyMzVdLFxuXHRzbGF0ZWJsdWU6IFsxMDYsIDkwLCAyMDVdLFxuXHRzbGF0ZWdyYXk6IFsxMTIsIDEyOCwgMTQ0XSxcblx0c2xhdGVncmV5OiBbMTEyLCAxMjgsIDE0NF0sXG5cdHNub3c6IFsyNTUsIDI1MCwgMjUwXSxcblx0c3ByaW5nZ3JlZW46IFswLCAyNTUsIDEyN10sXG5cdHN0ZWVsYmx1ZTogWzcwLCAxMzAsIDE4MF0sXG5cdHRhbjogWzIxMCwgMTgwLCAxNDBdLFxuXHR0ZWFsOiBbMCwgMTI4LCAxMjhdLFxuXHR0aGlzdGxlOiBbMjE2LCAxOTEsIDIxNl0sXG5cdHRvbWF0bzogWzI1NSwgOTksIDcxXSxcblx0dHVycXVvaXNlOiBbNjQsIDIyNCwgMjA4XSxcblx0dmlvbGV0OiBbMjM4LCAxMzAsIDIzOF0sXG5cdHdoZWF0OiBbMjQ1LCAyMjIsIDE3OV0sXG5cdHdoaXRlOiBbMjU1LCAyNTUsIDI1NV0sXG5cdHdoaXRlc21va2U6IFsyNDUsIDI0NSwgMjQ1XSxcblx0eWVsbG93OiBbMjU1LCAyNTUsIDBdLFxuXHR5ZWxsb3dncmVlbjogWzE1NCwgMjA1LCA1MF0sXG59XG5cbmZvciAoY29uc3Qga2V5IGluIGNvbG9ycykgT2JqZWN0LmZyZWV6ZShjb2xvcnNba2V5XSk7XG5leHBvcnQgZGVmYXVsdCBPYmplY3QuZnJlZXplKGNvbG9ycyk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxuY29uc3QgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRjb25zdCBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0Y29uc3QgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdGNvbnN0IGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyL3ZhbHVlIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpOyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5sZXQgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy92aXNfc3RyX2RlbW8udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=