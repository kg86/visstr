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
    const prevOcc = [];
    const lpf = [];
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
    const res = [];
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
    const res = [];
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
    const res = [];
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
    const res = [];
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
    constructor(canvas, font_size = 32, font_type = "Courier") {
        this.canvas = canvas;
        this.font_size = font_size;
        this.font_size_half = this.font_size / 2;
        this.font_type = font_type;
        this.ctx = canvas.getContext("2d");
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
        return r.style === "str"
            ? this.font_size
            : Math.round(this.font_size * 0.5);
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
                rpx.style = r.style.split(",")[0] + ",line";
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
    drawInputStr(input_str) {
        const index = ["i"];
        for (let i = 0; i < input_str.length; i++)
            index.push("" + i);
        const r = {
            style: "str",
            color: "#000000",
            beg: -1,
            end: input_str.length - 1,
            str: index,
        };
        this.drawRange(r, this.str_y - this.font_size - this.font_size_half);
        const chars = ["Str"];
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
        rss.forEach((rs) => rs.forEach((r) => (range_bound = [
            Math.min(range_bound[0], r.beg),
            Math.max(range_bound[1], r.end),
        ])));
        this.str_x = this.font_size + Math.abs(range_bound[0]) * this.font_size;
        this.canvas.width = (range_bound[1] - range_bound[0] + 2) * this.font_size;
        this.canvas.height =
            this.str_y +
                this.font_size_half +
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
        this.ctx.font = this.font_size + "px " + this.font_type;
        this.drawInputStr(input_str);
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
            const is_str = typeof range[2] !== "undefined" && typeof range[2] !== "number";
            const step = typeof range[2] === "number" ? range[2] : undefined;
            const str = typeof range[2] !== "number" ? range[2] : undefined;
            return {
                style: is_str ? "str" : style,
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
const draw = (_e) => {
    // get font size
    const font_size = parseInt(radioValue("[name=font_size]"));
    // get line style
    let range_style = radioValue("[name=line_style]");
    const line_style_right = radioValue("[name=line_style_right]");
    range_style += line_style_right.length === 0 ? "" : "," + line_style_right;
    const visualize = radioValue("[name=visualize]");
    // get input string
    const elm = document.querySelector("#input_str");
    const input_str = elm.value;
    // get canvas
    const canvas = document.querySelector("#canvas");
    // canvas.width = window.innerWidth - 50
    const visStr = new vis_str_1.VisStr(canvas, font_size);
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
        ranges_group = ranges_group.concat(visStr.nonOverlapRangesSimple(rangesp));
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUSxRQUFRLFFBQVE7QUFDcEM7O0FBRUEsWUFBWSxRQUFRLFFBQVEsUUFBUTtBQUNwQzs7QUFFQSxZQUFZLFFBQVEsUUFBUSxPQUFPO0FBQ25DOztBQUVBLFlBQVksUUFBUSxRQUFRLE9BQU87QUFDbkM7O0FBRUEsWUFBWSxRQUFRLFFBQVEsT0FBTztBQUNuQzs7QUFFQSxZQUFZLFFBQVEsUUFBUSxPQUFPO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwRUFBMEU7O0FBRTFFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCxFQUFFLFNBQVMsRUFBRTtBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsYUFBYSxhQUFhO0FBQzFDOztBQUVBO0FBQ0EsZ0JBQWdCLGFBQWEsYUFBYTtBQUMxQzs7QUFFQTtBQUNBLGdCQUFnQixhQUFhLGFBQWE7QUFDMUM7O0FBRUE7QUFDQSxnQkFBZ0IsYUFBYSxhQUFhO0FBQzFDOztBQUVBO0FBQ0EsZ0JBQWdCLGFBQWEsYUFBYTtBQUMxQzs7QUFFQTtBQUNBLGdCQUFnQixhQUFhO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlFQUFlLHFCQUFxQixFOzs7Ozs7VUN4SnBDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUM1QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQSxFOzs7VUNQQSx5Rjs7O1VDQUE7VUFDQTtVQUNBLHNEQUFzRCxpQkFBaUI7VUFDdkUsZ0RBQWdELGFBQWE7VUFDN0QsRTs7OztVRUpBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlzc3RyLy4vc3JjL3N0cmxpYi50cyIsIndlYnBhY2s6Ly92aXNzdHIvLi9zcmMvdmlzX3N0ci50cyIsIndlYnBhY2s6Ly92aXNzdHIvLi9zcmMvdmlzX3N0cl9kZW1vLnRzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2NvbnZlcnNpb25zLmpzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L2luZGV4LmpzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1jb252ZXJ0L3JvdXRlLmpzIiwid2VicGFjazovL3Zpc3N0ci8uL25vZGVfbW9kdWxlcy9jb2xvci1uYW1lL2luZGV4LmpzIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92aXNzdHIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Zpc3N0ci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmlzc3RyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSYW5nZVNpbXBsZSwgUmFuZ2VMaW5lIH0gZnJvbSBcIi4vdmlzX3N0clwiO1xuXG5leHBvcnQgY29uc3QgaXNQYWxpbmRyb21lID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aCAvIDI7IGkrKykge1xuICAgIGlmIChzdHJbaV0gIT0gc3RyW3N0ci5sZW5ndGggLSBpIC0gMV0pIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtUGFsaW5kcm9tZXMgPSAoc3RyOiBzdHJpbmcpOiBSYW5nZUxpbmVbXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBjb25zdCByZXM6IFJhbmdlTGluZVtdID0gW107XG4gIGZvciAobGV0IGxlbiA9IDE7IGxlbiA8PSBuOyBsZW4rKykge1xuICAgIGZvciAobGV0IGJlZyA9IDA7IGJlZyArIGxlbiA8PSBuOyBiZWcrKykge1xuICAgICAgaWYgKGlzUGFsaW5kcm9tZShzdHIuc3Vic3RyaW5nKGJlZywgYmVnICsgbGVuKSkpXG4gICAgICAgIHJlcy5wdXNoKFtiZWcsIGJlZyArIGxlbiAtIDFdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBmbGF0ID0gPFQ+KGFycjogVFtdW10pOiBUW10gPT4ge1xuICByZXR1cm4gYXJyLnJlZHVjZSgoYWNtLCB4KSA9PiBhY20uY29uY2F0KHgpLCBbXSBhcyBUW10pO1xufTtcblxuZXhwb3J0IGNvbnN0IHN1YnN0cmluZ3MgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBjb25zdCByZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPD0gbjsgaisrKSByZXMuYWRkKHN0ci5zdWJzdHJpbmcoaSwgaikpO1xuICB9XG4gIHJldHVybiBbLi4ucmVzLmtleXMoKV07XG59O1xuXG5leHBvcnQgY29uc3QgZmluZEFsbCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgY29uc3QgbSA9IHBhdC5sZW5ndGg7XG4gIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICBsZXQgcG9zID0gc3RyLmluZGV4T2YocGF0KTtcbiAgd2hpbGUgKHBvcyAhPT0gLTEpIHtcbiAgICByZXMucHVzaChbcG9zLCBwb3MgKyBtIC0gMV0pO1xuICAgIHBvcyA9IHN0ci5pbmRleE9mKHBhdCwgcG9zICsgMSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBsY3AgPSAoc3RyOiBzdHJpbmcsIGk6IG51bWJlciwgajogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gIGxldCBtYXRjaF9sZW4gPSAwO1xuICB3aGlsZSAoaSArIG1hdGNoX2xlbiA8IG4gJiYgaiArIG1hdGNoX2xlbiA8IG4pIHtcbiAgICBpZiAoc3RyW2kgKyBtYXRjaF9sZW5dID09IHN0cltqICsgbWF0Y2hfbGVuXSkgbWF0Y2hfbGVuKys7XG4gICAgZWxzZSBicmVhaztcbiAgfVxuICByZXR1cm4gbWF0Y2hfbGVuO1xufTtcblxuZXhwb3J0IGNvbnN0IHByZXZPY2NMUEYgPSAoc3RyOiBzdHJpbmcpOiBbbnVtYmVyW10sIG51bWJlcltdXSA9PiB7XG4gIGNvbnN0IHByZXZPY2MgPSBbXTtcbiAgY29uc3QgbHBmID0gW107XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGxldCBwb2NjeCA9IC0xO1xuICAgIGxldCBscGZ4ID0gMDtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGk7IGorKykge1xuICAgICAgY29uc3QgbCA9IGxjcChzdHIsIGksIGopO1xuICAgICAgaWYgKGxwZnggPCBsKSB7XG4gICAgICAgIGxwZnggPSBsO1xuICAgICAgICBwb2NjeCA9IGo7XG4gICAgICB9XG4gICAgfVxuICAgIHByZXZPY2MucHVzaChwb2NjeCk7XG4gICAgbHBmLnB1c2gobHBmeCk7XG4gIH1cbiAgcmV0dXJuIFtwcmV2T2NjLCBscGZdO1xufTtcblxuZXhwb3J0IGNvbnN0IGVudW1QcmV2T2NjTFBGID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gIGNvbnN0IFtwcmV2T2NjLCBscGZdID0gcHJldk9jY0xQRihzdHIpO1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtcbiAgICBbWy0xLCBuIC0gMSwgW1wib2NjXCJdLmNvbmNhdChwcmV2T2NjLm1hcCgoeCkgPT4geC50b1N0cmluZygpKSldXSxcbiAgICBbWy0xLCBuIC0gMSwgW1wibGVuXCJdLmNvbmNhdChscGYubWFwKCh4KSA9PiB4LnRvU3RyaW5nKCkpKV1dLFxuICBdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZPY2MubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobHBmW2ldID4gMCkge1xuICAgICAgcmVzLnB1c2goW1xuICAgICAgICBbaSwgaSArIGxwZltpXSAtIDFdLFxuICAgICAgICBbcHJldk9jY1tpXSwgcHJldk9jY1tpXSArIGxwZltpXSAtIDFdLFxuICAgICAgXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgaXNTcXVhcmUgPSAoczogc3RyaW5nLCBiZWc6IG51bWJlciwgcDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcDsgaSsrKSB7XG4gICAgaWYgKHNbYmVnICsgaV0gIT0gc1tiZWcgKyBwICsgaV0pIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtU3F1YXJlcyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgY29uc3QgbiA9IHMubGVuZ3RoO1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgZm9yIChsZXQgcCA9IDE7IHAgPCBuOyBwKyspIHtcbiAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCAyICogcDsgb2Zmc2V0KyspIHtcbiAgICAgIGZvciAobGV0IGJlZyA9IG9mZnNldDsgYmVnIDwgbiAtIDIgKiBwICsgMTsgYmVnICs9IDIgKiBwKSB7XG4gICAgICAgIGlmIChpc1NxdWFyZShzLCBiZWcsIHApKSB7XG4gICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgMiAqIHAgLSAxLCBwXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBpc1JpZ2h0bW9zdFNxdWFyZSA9IChcbiAgczogc3RyaW5nLFxuICBiZWc6IG51bWJlcixcbiAgcDogbnVtYmVyLFxuKTogYm9vbGVhbiA9PiB7XG4gIGlmICghaXNTcXVhcmUocywgYmVnLCBwKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gIXMuaW5jbHVkZXMocy5zdWJzdHIoYmVnLCAyICogcCksIGJlZyArIDEpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTGVmdG1vc3RTcXVhcmUgPSAoXG4gIHM6IHN0cmluZyxcbiAgYmVnOiBudW1iZXIsXG4gIHA6IG51bWJlcixcbik6IGJvb2xlYW4gPT4ge1xuICBpZiAoIWlzU3F1YXJlKHMsIGJlZywgcCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICFzLnN1YnN0cigwLCBiZWcgKyAyICogcCAtIDEpLmluY2x1ZGVzKHMuc3Vic3RyKGJlZywgMiAqIHApKTtcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtUmlnaHRtb3N0U3F1YXJlcyA9IChzOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgY29uc3QgbiA9IHMubGVuZ3RoO1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgZm9yIChsZXQgcCA9IDE7IHAgPCBuOyBwKyspIHtcbiAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCAyICogcDsgb2Zmc2V0KyspIHtcbiAgICAgIGZvciAobGV0IGJlZyA9IG9mZnNldDsgYmVnIDwgbiAtIDIgKiBwICsgMTsgYmVnICs9IDIgKiBwKSB7XG4gICAgICAgIGlmIChpc1JpZ2h0bW9zdFNxdWFyZShzLCBiZWcsIHApKSB7XG4gICAgICAgICAgcmVzLnB1c2goW2JlZywgYmVnICsgMiAqIHAgLSAxLCBwXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBlbnVtTGVmdG1vc3RTcXVhcmVzID0gKHM6IHN0cmluZyk6IFJhbmdlU2ltcGxlW10gPT4ge1xuICBjb25zdCBuID0gcy5sZW5ndGg7XG4gIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICBmb3IgKGxldCBwID0gMTsgcCA8IG47IHArKykge1xuICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IDIgKiBwOyBvZmZzZXQrKykge1xuICAgICAgZm9yIChsZXQgYmVnID0gb2Zmc2V0OyBiZWcgPCBuIC0gMiAqIHAgKyAxOyBiZWcgKz0gMiAqIHApIHtcbiAgICAgICAgaWYgKGlzTGVmdG1vc3RTcXVhcmUocywgYmVnLCBwKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtiZWcsIGJlZyArIDIgKiBwIC0gMSwgcF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgaXNSdW4gPSAoczogc3RyaW5nLCBiZWc6IG51bWJlciwgcDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XG4gIGlmIChiZWcgPiAwICYmIHNbYmVnIC0gMV0gPT0gc1tiZWcgKyBwIC0gMV0pIHJldHVybiBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwOyBpKyspIHtcbiAgICBpZiAoc1tiZWcgKyBpXSAhPSBzW2JlZyArIHAgKyBpXSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGVudW1SdW5zID0gKHM6IHN0cmluZyk6IFJhbmdlU2ltcGxlW10gPT4ge1xuICBjb25zdCBuID0gcy5sZW5ndGg7XG4gIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICBjb25zdCBybWFwID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGZvciAobGV0IHAgPSAxOyBwIDwgbjsgcCsrKSB7XG4gICAgZm9yIChsZXQgYmVnID0gMDsgYmVnICsgMiAqIHAgPD0gbjsgYmVnKyspIHtcbiAgICAgIGlmIChpc1J1bihzLCBiZWcsIHApKSB7XG4gICAgICAgIGxldCBtYXRjaCA9IDIgKiBwO1xuICAgICAgICB3aGlsZSAobWF0Y2ggPCBuICYmIHNbYmVnICsgKG1hdGNoICUgcCldID09IHNbYmVnICsgbWF0Y2hdKSB7XG4gICAgICAgICAgbWF0Y2grKztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXkgPSBiZWcgKyBcIixcIiArIChiZWcgKyBtYXRjaCAtIDEpO1xuICAgICAgICBpZiAoIXJtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICByZXMucHVzaChbYmVnLCBiZWcgKyBtYXRjaCAtIDEsIHBdKTtcbiAgICAgICAgICBybWFwLmFkZChrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgbGVmdEV4dGVuc2lvbnMgPSAoc3RyOiBzdHJpbmcsIHBhdDogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCByZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgY29uc3QgZnJvbUlkeCA9IDE7XG4gIGxldCBwb3MgPSBzdHIuaW5kZXhPZihwYXQsIGZyb21JZHgpO1xuICB3aGlsZSAocG9zICE9PSAtMSkge1xuICAgIHJlcy5hZGQoc3RyW3BvcyAtIDFdKTtcbiAgICBwb3MgPSBzdHIuaW5kZXhPZihwYXQsIHBvcyArIDEpO1xuICB9XG4gIHJldHVybiBbLi4ucmVzLmtleXMoKV07XG59O1xuXG5leHBvcnQgY29uc3QgcmV2ZXJzZSA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBzdHIuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG59O1xuXG5leHBvcnQgY29uc3QgcmlnaHRFeHRlbnNpb25zID0gKHN0cjogc3RyaW5nLCBwYXQ6IHN0cmluZyk6IHN0cmluZ1tdID0+IHtcbiAgY29uc3QgcnN0ciA9IHJldmVyc2Uoc3RyKTtcbiAgY29uc3QgcnBhdCA9IHJldmVyc2UocGF0KTtcbiAgcmV0dXJuIGxlZnRFeHRlbnNpb25zKHJzdHIsIHJwYXQpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTGVmdE1heGltYWwgPSAoc3RyOiBzdHJpbmcsIHBhdDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBsZWZ0RXh0ZW5zaW9ucyhzdHIsIHBhdCkubGVuZ3RoID4gMTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1JpZ2h0TWF4aW1hbCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIHJpZ2h0RXh0ZW5zaW9ucyhzdHIsIHBhdCkubGVuZ3RoID4gMTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc01heFJlcGVhdCA9IChzdHI6IHN0cmluZywgcGF0OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGlzTGVmdE1heGltYWwoc3RyLCBwYXQpICYmIGlzUmlnaHRNYXhpbWFsKHN0ciwgcGF0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBsejc3ID0gKFxuICBzdHI6IHN0cmluZyxcbiAgc2hvd19mYWN0b3JpZDogbnVtYmVyID0gMSxcbik6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBjb25zdCBbb2NjcywgbGVuc10gPSBwcmV2T2NjTFBGKHN0cik7XG4gIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOykge1xuICAgIGxldCByYW5nZXM6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgICBpZiAob2Njc1tpXSA9PT0gLTEpIHtcbiAgICAgIHJhbmdlcyA9IFtbaSwgaSwgW3N0cltpXV1dXTtcbiAgICAgIGkgKz0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2VzID0gW1xuICAgICAgICBbb2Njc1tpXSwgb2Njc1tpXSArIGxlbnNbaV0gLSAxXSxcbiAgICAgICAgW2ksIGkgKyBsZW5zW2ldIC0gMV0sXG4gICAgICBdO1xuICAgICAgaSArPSBsZW5zW2ldO1xuICAgIH1cbiAgICBpZiAoc2hvd19mYWN0b3JpZCA+PSAwKSB7XG4gICAgICBjb25zdCBsYXN0X2VuZCA9IHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV1bMV07XG4gICAgICByYW5nZXMucHVzaChbbGFzdF9lbmQgKyAxLCBsYXN0X2VuZCArIDEsIFtcImZcIiArIHNob3dfZmFjdG9yaWRdXSk7XG4gICAgICBzaG93X2ZhY3RvcmlkKys7XG4gICAgfVxuICAgIHJlcy5wdXNoKHJhbmdlcyk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBsejc4ID0gKHN0cjogc3RyaW5nLCBzaG93X2ZhY3RvcmlkID0gMSk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIGNvbnN0IGQgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7KSB7XG4gICAgbGV0IGogPSBpICsgMTtcbiAgICB3aGlsZSAoaiA8PSBzdHIubGVuZ3RoICYmIGQuaGFzKHN0ci5zdWJzdHJpbmcoaSwgaikpKSB7XG4gICAgICBqKys7XG4gICAgfVxuICAgIGNvbnN0IHJvdzogUmFuZ2VTaW1wbGVbXSA9IFtdO1xuICAgIGlmIChqIC0gaSA+IDEpIHtcbiAgICAgIGNvbnN0IHByZXYgPSBkLmdldChzdHIuc3Vic3RyaW5nKGksIGogLSAxKSkgYXMgbnVtYmVyO1xuICAgICAgcm93LnB1c2goW3ByZXYsIHByZXYgKyAoaiAtIGkgLSAyKV0pO1xuICAgICAgcm93LnB1c2goW2ksIGogLSAyXSk7XG4gICAgfVxuICAgIGlmIChqIDwgc3RyLmxlbmd0aCkge1xuICAgICAgcm93LnB1c2goW2ogLSAxLCBqLCBbc3RyW2ogLSAxXSwgXCJmXCIgKyBzaG93X2ZhY3RvcmlkXV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3cucHVzaChbaiAtIDEsIGogLSAxLCBbXCJmXCIgKyBzaG93X2ZhY3RvcmlkXV0pO1xuICAgIH1cbiAgICBzaG93X2ZhY3RvcmlkKys7XG4gICAgcmVzLnB1c2gocm93KTtcbiAgICBkLnNldChzdHIuc3Vic3RyaW5nKGksIGopLCBpKTtcbiAgICBpID0gajtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTHluZG9uID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGxlc3N0aGFuID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdHIubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGoyID0gKGkgKyBqKSAlIHN0ci5sZW5ndGg7XG4gICAgICBpZiAoc3RyW2pdID4gc3RyW2oyXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgZWxzZSBpZiAoc3RyW2pdIDwgc3RyW2oyXSkge1xuICAgICAgICBsZXNzdGhhbiA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWxlc3N0aGFuKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgZW51bUx5bmRvbiA9IChzdHI6IHN0cmluZyk6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIGNvbnN0IHJlczogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gIGZvciAobGV0IGxlbiA9IDE7IGxlbiA8PSBzdHIubGVuZ3RoOyBsZW4rKykge1xuICAgIGNvbnN0IGdyb3VwOiBSYW5nZVNpbXBsZVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgKyBsZW4gPD0gc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdWIgPSBzdHIuc3Vic3RyKGksIGxlbik7XG4gICAgICBpZiAoaXNMeW5kb24oc3ViKSkgZ3JvdXAucHVzaChbaSwgaSArIGxlbiAtIDFdKTtcbiAgICB9XG4gICAgaWYgKGdyb3VwLmxlbmd0aCA+IDApIHJlcy5wdXNoKGdyb3VwKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuLy8gRHV2YWwncyBhbGdvcml0aG1cbi8vIGZpbmQgbG9uZ2VzdCBseW5kb24gZmFjdG9yIHdoaWNoIHN0YXJ0cyBhdCBiZWcgaW4gc3RyLlxuLy8gcmV0dXJuIFtsZW4sIHJlcGVhdF0sIHdoZXJlXG4vLyBsZW4gaXMgdGhlIGxlbmd0aCBvZiB0aGUgZmFjdG9yLFxuLy8gcmVwZWF0IGlzIHRoZSBtYXhpbXVtIHJlcGVhdCBvZiB0aGUgZmFjdG9yLlxuZXhwb3J0IGNvbnN0IGZpbmRMb25nZXN0THluZG9uRmFjdG9yID0gKFxuICBzdHI6IHN0cmluZyxcbiAgYmVnOiBudW1iZXIsXG4pOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgbGV0IGkgPSBiZWc7XG4gIGxldCBlbmQgPSBiZWcgKyAxO1xuICB3aGlsZSAoZW5kIDwgc3RyLmxlbmd0aCAmJiBzdHJbaV0gPD0gc3RyW2VuZF0pIHtcbiAgICBpZiAoc3RyW2ldID09PSBzdHJbZW5kXSkge1xuICAgICAgaSsrO1xuICAgICAgZW5kKys7XG4gICAgfSBlbHNlIGlmIChzdHJbaV0gPCBzdHJbZW5kXSkge1xuICAgICAgLy8gc3RyW2JlZy4uLmVuZF0gaXMgTHluZG9uIHN0cmluZ1xuICAgICAgaSA9IGJlZztcbiAgICAgIGVuZCsrO1xuICAgIH1cbiAgfVxuICAvLyBzdHJbYmVnLi4uZW5kLTFdIGlzIHRoZSBsb25nZXN0IEx5bmRvbiBwcmVmaXggb2Ygc3RyW2JlZy4uLl0uXG4gIGNvbnN0IGxlbiA9IGVuZCAtIGk7XG4gIGNvbnN0IHJlcGVhdCA9IE1hdGguZmxvb3IoKGVuZCAtIGJlZykgLyAoZW5kIC0gaSkpO1xuICByZXR1cm4gW2xlbiwgcmVwZWF0XTtcbn07XG5cbmV4cG9ydCBjb25zdCBseW5kb25GYWN0b3JpemF0aW9uID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXTtcbiAgbGV0IGJlZyA9IDA7XG5cbiAgd2hpbGUgKGJlZyA8IHN0ci5sZW5ndGgpIHtcbiAgICBjb25zdCBmYWN0b3IgPSBmaW5kTG9uZ2VzdEx5bmRvbkZhY3RvcihzdHIsIGJlZyk7XG4gICAgY29uc3QgbGVuX2ZhY3RvciA9IGZhY3RvclswXSAqIGZhY3RvclsxXTtcbiAgICByZXMucHVzaChbW2JlZywgYmVnICsgbGVuX2ZhY3RvciAtIDEsIGZhY3RvclswXV1dIGFzIFJhbmdlU2ltcGxlW10pO1xuICAgIGJlZyArPSBsZW5fZmFjdG9yO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgbHluZG9uQXJyYXkgPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGZhY3RvciA9IGZpbmRMb25nZXN0THluZG9uRmFjdG9yKHN0ciwgaSk7XG4gICAgcmVzLnB1c2goW1tpLCBpICsgZmFjdG9yWzBdIC0gMV1dIGFzIFJhbmdlU2ltcGxlW10pO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG4vLyByZXBsYWNlIHRoZSBjaGFyYWN0ZXJzIHRvIGVmZmVjdGl2ZSBhbHBoYWJldCBbMCwgc2lnbWEtMV1cbi8vIHNpZ21hIGlzIHRoZSBudW1iZXIgb2YgZGlzdGluY3QgY2hhcmFjdGVycyBvZiBnaXZlbiBzdHJpbmdcbi8vIHNpZ21hIG11c3QgYmUgbGVzcyB0aGFuIDEwXG5leHBvcnQgY29uc3QgcmVwbGFjZUVmZmVjdGl2ZUFscGhhYmV0ID0gKHN0cjogc3RyaW5nKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBjaGFycyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykgY2hhcnMuYWRkKHN0cltpXSk7XG4gIGNvbnN0IGFyciA9IEFycmF5LmZyb20oY2hhcnMudmFsdWVzKCkpO1xuICBhcnIuc29ydCgpO1xuICBjb25zdCByZXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBhcnIubWFwKChjLCBpKSA9PiByZXAuc2V0KGMsIGkudG9TdHJpbmcoKSkpO1xuICBjb25zdCByZXBzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSByZXBzLnB1c2gocmVwLmdldChzdHJbaV0pIGFzIHN0cmluZyk7XG4gIHJldHVybiByZXBzO1xufTtcblxuZXhwb3J0IGNvbnN0IHN1ZmZpeEFycmF5ID0gKHN0cjogc3RyaW5nKTogbnVtYmVyW10gPT4ge1xuICBjb25zdCBzdWZmaXhlcyA9IFsuLi5BcnJheShzdHIubGVuZ3RoKS5rZXlzKCldLm1hcCgoaSkgPT4gc3RyLnN1YnN0cihpKSk7XG4gIHN1ZmZpeGVzLnNvcnQoKTtcbiAgcmV0dXJuIHN1ZmZpeGVzLm1hcCgocykgPT4gc3RyLmxlbmd0aCAtIHMubGVuZ3RoKTtcbn07XG5cbmV4cG9ydCBjb25zdCByYW5rQXJyYXkgPSAoc3RyOiBzdHJpbmcsIHNhPzogbnVtYmVyW10pID0+IHtcbiAgaWYgKHNhID09PSB1bmRlZmluZWQpIHNhID0gc3VmZml4QXJyYXkoc3RyKTtcbiAgY29uc3QgcmFuayA9IEFycmF5KHN0ci5sZW5ndGgpO1xuICBzYS5mb3JFYWNoKChwb3MsIHIpID0+IChyYW5rW3Bvc10gPSByKSk7XG4gIHJldHVybiByYW5rO1xufTtcblxuLy8gbmV4dCBzbWFsbGVyIHN1ZmZpeGVzXG5leHBvcnQgY29uc3QgbnNzQXJyYXkgPSAoc3RyOiBzdHJpbmcsIHJhbms/OiBudW1iZXJbXSkgPT4ge1xuICBpZiAocmFuayA9PT0gdW5kZWZpbmVkKSByYW5rID0gcmFua0FycmF5KHN0cik7XG4gIGNvbnN0IG4gPSByYW5rLmxlbmd0aDtcbiAgY29uc3QgbnNzYSA9IG5ldyBBcnJheShuKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICBsZXQgbnNzID0gbjtcbiAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBuOyBqKyspIHtcbiAgICAgIGlmIChyYW5rW2ldID4gcmFua1tqXSkge1xuICAgICAgICBuc3MgPSBqO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgbnNzYVtpXSA9IG5zcztcbiAgfVxuICByZXR1cm4gbnNzYTtcbn07XG5cbi8vIHByZXZpb3VzIHNtYWxsZXIgc3VmZml4ZXNcbmV4cG9ydCBjb25zdCBwcmV2QXJyYXkgPSAoc3RyOiBzdHJpbmcsIHJhbms/OiBudW1iZXJbXSkgPT4ge1xuICBpZiAocmFuayA9PT0gdW5kZWZpbmVkKSByYW5rID0gcmFua0FycmF5KHN0cik7XG4gIGNvbnN0IG4gPSByYW5rLmxlbmd0aDtcbiAgY29uc3QgcHNzYSA9IG5ldyBBcnJheShuKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICBsZXQgcHNzID0gLTE7XG4gICAgZm9yIChsZXQgaiA9IGkgLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgaWYgKHJhbmtbaV0gPiByYW5rW2pdKSB7XG4gICAgICAgIHBzcyA9IGo7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBwc3NhW2ldID0gcHNzO1xuICB9XG4gIHJldHVybiBwc3NhO1xufTtcblxuZXhwb3J0IGNvbnN0IG5leHRTbWFsbGVyU3VmZml4ZXMgPSAoc3RyOiBzdHJpbmcpOiBSYW5nZVNpbXBsZVtdW10gPT4ge1xuICBjb25zdCBuc3NhID0gbnNzQXJyYXkoc3RyKTtcbiAgY29uc3QgcmVzOiBSYW5nZVNpbXBsZVtdW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBncm91cDogUmFuZ2VTaW1wbGVbXSA9IFtbaSwgbnNzYVtpXV1dO1xuICAgIGlmIChncm91cC5sZW5ndGggPiAwKSByZXMucHVzaChncm91cCk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCBjb25zdCBwcmV2U21hbGxlclN1ZmZpeGVzID0gKHN0cjogc3RyaW5nKTogUmFuZ2VTaW1wbGVbXVtdID0+IHtcbiAgY29uc3QgcHNzYSA9IHByZXZBcnJheShzdHIpO1xuICBjb25zdCByZXM6IFJhbmdlU2ltcGxlW11bXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGdyb3VwOiBSYW5nZVNpbXBsZVtdID0gW1twc3NhW2ldLCBpXV07XG4gICAgaWYgKGdyb3VwLmxlbmd0aCA+IDApIHJlcy5wdXNoKGdyb3VwKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IGNvbnN0IGVudW1JZiA9IChcbiAgc3RyOiBzdHJpbmcsXG4gIGNoZWNrOiAoczogc3RyaW5nLCBwOiBzdHJpbmcpID0+IGJvb2xlYW4sXG4pOiBSYW5nZVNpbXBsZVtdID0+IHtcbiAgcmV0dXJuIGZsYXQoZW51bUlmR3JvdXAoc3RyLCBjaGVjaykpO1xufTtcblxuZXhwb3J0IGNvbnN0IGVudW1JZkdyb3VwID0gKFxuICBzdHI6IHN0cmluZyxcbiAgY2hlY2s6IChzOiBzdHJpbmcsIHA6IHN0cmluZykgPT4gYm9vbGVhbixcbik6IFJhbmdlU2ltcGxlW11bXSA9PiB7XG4gIHJldHVybiBzdWJzdHJpbmdzKHN0cilcbiAgICAuZmlsdGVyKChwKSA9PiBjaGVjayhzdHIsIHApKVxuICAgIC5tYXAoKHApID0+IGZpbmRBbGwoc3RyLCBwKSk7XG59O1xuIiwiaW1wb3J0IGNvbnZlcnQgZnJvbSBcImNvbG9yLWNvbnZlcnRcIjtcblxuLyoqIFRoZSBzaW1wbGUgcmFuZ2UgcmVwcmVzZW50YXRpb24gZm9yIHN0cmluZ3MgKi9cbmV4cG9ydCB0eXBlIFJhbmdlU3RyID0gW251bWJlciwgbnVtYmVyLCBzdHJpbmdbXV07XG4vKiogVGhlIHNpbXBsZSByYW5nZSByZXByZXNlbnRhdGlvbiBmb3IgbGluZSAqL1xuZXhwb3J0IHR5cGUgUmFuZ2VMaW5lID0gW251bWJlciwgbnVtYmVyLCBudW1iZXI/XTtcbi8qKiBUaGUgc2ltcGxlIHJhbmdlIHJlcHJlc2VudGF0aW9uICovXG5leHBvcnQgdHlwZSBSYW5nZVNpbXBsZSA9IFJhbmdlU3RyIHwgUmFuZ2VMaW5lO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlIHtcbiAgLyoqIFRoZSBzdHlsZSB0byBkcmF3IHJhbmdlLiBJdCBpcyBlaXRoZXIgb2YgW1wibGluZVwiLCBcImN1cnZlXCIsIFwiYXJyb3dcIiwgXCJzdHJcIl0uIElmIFwic3RyXCIgaXMgY2hvc2VuLCB0aGUgb3B0aW5hbCBwYXJhbWV0ZXIgYHN0cmAgbXVzdCBiZSBnaXZlbi4gRm9yIG90aGVyIHN0eWxlcywgeW91IGNhbiBzZXQgbGVmdCBzdHlsZSBhbmQgcmlnaHQgc3R5bGUgbGllIFwibGluZSxhcnJvd1wiLiAqL1xuICBzdHlsZTogc3RyaW5nO1xuICAvKiogVGhlIGNvbG9yIHRvIGRyYXcgcmFuZ2UsIGUuZy4gXCIjMDAwMDAwXCIgZm9yIGJsYWNrLiAqL1xuICBjb2xvcjogc3RyaW5nO1xuICAvKiogVGhlIGJlZ2lubmluZyBpbmRleCBvZiB0aGUgcmFuZ2UuICovXG4gIGJlZzogbnVtYmVyO1xuICAvKiogVGhlIGVuZGluZyBpbmRleCBvZiB0aGUgcmFuZ2UuIE5vdGUgdGhhdCBpbmRleGVzIGFyZSBpbmNsdXNpdmUuICovXG4gIGVuZDogbnVtYmVyO1xuICAvKiogVGhlIHN0ZXAgb2YgdGhlIHJhbmdlIFtgYmVnYCwgYGVuZGBdLiBGb3IgZXhhbXBsZSwgYSByYW5nZSBbYGJlZ2AsIGBlbmRgLCBgc3RlcGBdID0gWzEsIDgsIDNdIHJlcHJlc2VudHMgY29udGludW91cyByYW5nZXMgW1tgYmVnYCwgYGVuZGBdXT1bWzEsIDNdLCBbNCwgNl0sIFs3LCA4XV0gKi9cbiAgc3RlcD86IG51bWJlcjtcbiAgLyoqIFRoZSBzdHJpbmdzIG9mIHRoZSByYW5nZS4gSXRzIGxlbmd0aCBtdXN0IGJlIGVxdWFsIHRvIHRoZSBsZW5ndGggb2YgdGhlIHJhbmdlIGBlbmRgIC0gYGJlZ2AgKyAxICovXG4gIHN0cj86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlUHgge1xuICAvKiogVGhlIHN0eWxlIHRvIGRyYXcgcmFuZ2UuIEl0IGlzIGVpdGhlciBvZiBbXCJsaW5lXCIsIFwiY3VydmVcIiwgXCJhcnJvd1wiLCBcInN0clwiXS4gSWYgXCJzdHJcIiBpcyBjaG9zZW4sIHRoZSBvcHRpbmFsIHBhcmFtZXRlciBgc3RyYCBtdXN0IGJlIGdpdmVuLiBGb3Igb3RoZXIgc3R5bGVzLCB5b3UgY2FuIHNldCBsZWZ0IHN0eWxlIGFuZCByaWdodCBzdHlsZSBsaWUgXCJsaW5lLGFycm93XCIuICovXG4gIHN0eWxlOiBzdHJpbmc7XG4gIC8qKiBUaGUgY29sb3IgdG8gZHJhdyByYW5nZSwgZS5nLiBcIiMwMDAwMDBcIiBmb3IgYmxhY2suICovXG4gIGNvbG9yOiBzdHJpbmc7XG4gIC8qKiBUaGUgeC1jb29yZGluYXRlIHdoaWNoIGJlZ2lucyB0aGUgcmFuZ2UuICovXG4gIHhfYmVnOiBudW1iZXI7XG4gIC8qKiBUaGUgeC1jb29yZGluYXRlIHdoaWNoIGVuZHMgdGhlIHJhbmdlLiAqL1xuICB4X2VuZDogbnVtYmVyO1xuICAvKiogVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgcmFuZ2UuICovXG4gIHk6IG51bWJlcjtcbiAgLyoqIFRoZSBzdHJpbmdzIG9mIHRoZSByYW5nZS4gSXRzIGxlbmd0aCBtdXN0IGJlIGVxdWFsIHRvIHRoZSBsZW5ndGggb2YgdGhlIHJhbmdlIGBlbmRgIC0gYGJlZ2AgKyAxICovXG4gIHN0cj86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgY2xhc3MgVmlzU3RyIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIHN0cl94OiBudW1iZXI7XG4gIHByaXZhdGUgc3RyX3k6IG51bWJlcjtcbiAgcHJpdmF0ZSBmb250X3NpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBmb250X3NpemVfaGFsZjogbnVtYmVyO1xuICBwcml2YXRlIGZvbnRfdHlwZTogc3RyaW5nO1xuICAvKiogVGhlIG9mZnNldCB0byBzdGFydCBkcmF3aW5nIGEgcmFuZ2UgZnJvbSBhIGNlbnRlciBwb3NpdGlvbiBvZiBhbiBpbmRleC4gKi9cbiAgcHJpdmF0ZSByYW5nZV9iZWdfb2Zmc2V0OiBudW1iZXI7XG4gIHByaXZhdGUgcmFuZ2VfZW5kX29mZnNldDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gY2FudmFzIEhUTUxDYW52YXNFbGVtZW50XG4gICAqIEBwYXJhbSBmb250X3NpemUgZm9udCBzaXplXG4gICAqIEBwYXJhbSBmb250X3R5cGUgZm9udCBuYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICAgIGZvbnRfc2l6ZSA9IDMyLFxuICAgIGZvbnRfdHlwZSA9IFwiQ291cmllclwiLFxuICApIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmZvbnRfc2l6ZSA9IGZvbnRfc2l6ZTtcbiAgICB0aGlzLmZvbnRfc2l6ZV9oYWxmID0gdGhpcy5mb250X3NpemUgLyAyO1xuICAgIHRoaXMuZm9udF90eXBlID0gZm9udF90eXBlO1xuICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgdGhpcy5zdHJfeCA9IHRoaXMuZm9udF9zaXplO1xuICAgIHRoaXMuc3RyX3kgPSB0aGlzLmZvbnRfc2l6ZSAqIDIgKyB0aGlzLmZvbnRfc2l6ZV9oYWxmO1xuICAgIHRoaXMucmFuZ2VfYmVnX29mZnNldCA9IC10aGlzLmZvbnRfc2l6ZSAvIDQ7XG4gICAgdGhpcy5yYW5nZV9lbmRfb2Zmc2V0ID0gdGhpcy5mb250X3NpemUgLyA0O1xuICB9XG5cbiAgLyoqIENsZWFyIHRoZSBjYW52YXMuICovXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB4LWNvb3JkaW5hdGUgd2hpY2ggaXMgYSBiZWdpbm5pbmcgb2YgYSByYW5nZS5cbiAgICpcbiAgICogQHBhcmFtIGlkeCBpbmRleCBvZiBhIHJhbmdlXG4gICAqIEByZXR1cm4gVGhlIHgtY29vcmRpbmF0ZSBvZiBhIHJhbmdlIGJlZ2lubmluZyBhdCBgaWR4YFxuICAgKi9cbiAgcmFuZ2VCZWcoaWR4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0cl94ICsgdGhpcy5mb250X3NpemUgKiBpZHggKyB0aGlzLnJhbmdlX2JlZ19vZmZzZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeC1jb29yZGluYXRlIHdoaWNoIGlzIGEgZW5kaW5nIG9mIGEgcmFuZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBpZHggaW5kZXggb2YgYSByYW5nZVxuICAgKiBAcmV0dXJuIFRoZSB4LWNvb3JkaW5hdGUgb2YgYSByYW5nZSBlbmRpbmcgYXQgYGlkeGBcbiAgICovXG4gIHJhbmdlRW5kKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdHJfeCArIHRoaXMuZm9udF9zaXplICogaWR4ICsgdGhpcy5yYW5nZV9lbmRfb2Zmc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgaGVpZ2h0IG9mIGEgZ2l2ZW4gcmFuZ2UuXG4gICAqIEBwYXJhbSByIEEgcmFuZ2UuXG4gICAqL1xuICByYW5nZUhlaWdodChyOiBSYW5nZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHIuc3R5bGUgPT09IFwic3RyXCJcbiAgICAgID8gdGhpcy5mb250X3NpemVcbiAgICAgIDogTWF0aC5yb3VuZCh0aGlzLmZvbnRfc2l6ZSAqIDAuNSk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGEgcmFuZ2Ugbm90IHRvIGRyYXcgc3RyaW5ncywgc3BsaXQgaXQgdG8gdGhyZWUgcGFydHMgbGVmdCwgY2VudGVyLCBhbmQgcmlnaHQuXG4gICAqIEBwYXJhbSBycHggR2l2ZW4gcmFuZ2UgdG8gc3BsaXQuXG4gICAqL1xuICBzcGxpdFJhbmdlUHgocnB4OiBSYW5nZVB4KTogUmFuZ2VQeFtdIHtcbiAgICBjb25zdCBzdHlsZXMgPSBycHguc3R5bGUuc3BsaXQoXCIsXCIpO1xuXG4gICAgY29uc3QgcmwgPSBPYmplY3QuYXNzaWduKHt9LCBycHgpO1xuICAgIGNvbnN0IHJjID0gT2JqZWN0LmFzc2lnbih7fSwgcnB4KTtcbiAgICBjb25zdCByciA9IE9iamVjdC5hc3NpZ24oe30sIHJweCk7XG4gICAgcmwueF9lbmQgPSBycHgueF9iZWcgKyB0aGlzLmN1cnZlX2QoKTtcbiAgICBybC5zdHlsZSA9IHN0eWxlc1swXTtcblxuICAgIHJyLnhfYmVnID0gcnB4LnhfZW5kO1xuICAgIHJyLnhfZW5kID0gcnB4LnhfZW5kIC0gdGhpcy5jdXJ2ZV9kKCk7XG4gICAgcnIuc3R5bGUgPSBzdHlsZXMubGVuZ3RoID4gMSA/IHN0eWxlc1sxXSA6IHN0eWxlc1swXTtcblxuICAgIHJjLnhfYmVnID0gcmwueF9lbmQ7XG4gICAgcmMueF9lbmQgPSByci54X2VuZDtcbiAgICByYy5zdHlsZSA9IFwibGluZVwiO1xuICAgIHJldHVybiBbcmwsIHJjLCBycl07XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBjdXJ2ZSBhcyBhIHBhcnQgb2YgYSByYW5nZS5cbiAgICogQHBhcmFtIHJweCBBIHBhcnQgb2YgYSByYW5nZS5cbiAgICovXG4gIGRyYXdDdXJ2ZVBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHgubW92ZVRvKHJweC54X2JlZywgcnB4LnkgLSB0aGlzLmN1cnZlX2QoKSk7XG4gICAgdGhpcy5jdHgucXVhZHJhdGljQ3VydmVUbyhycHgueF9iZWcsIHJweC55LCBycHgueF9lbmQsIHJweC55KTtcbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGxlbmd0aCBvZiBhIGJlZ2lubmluZyAob3IgZW5kaW5nKSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBjdXJ2ZV9kKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZm9udF9zaXplX2hhbGYgLyAyO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgbGluZSBhcyBhIHBhcnQgb2YgYSByYW5nZS5cbiAgICogQHBhcmFtIHJweCBBIHBhcnQgb2YgYSByYW5nZS5cbiAgICovXG4gIGRyYXdMaW5lUHhQYXJ0KHJweDogUmFuZ2VQeCkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyhycHgueF9iZWcsIHJweC55KTtcbiAgICB0aGlzLmN0eC5saW5lVG8ocnB4LnhfZW5kLCBycHgueSk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBhcnJvdyBhcyBhIHBhcnQgb2YgYSByYW5nZS5cbiAgICogQHBhcmFtIHJweCBBIHBhcnQgb2YgYSByYW5nZS5cbiAgICovXG4gIGRyYXdBcnJvd1B4UGFydChycHg6IFJhbmdlUHgpIHtcbiAgICBjb25zdCBkeCA9IHRoaXMuY3VydmVfZCgpICogKHJweC54X2JlZyA8IHJweC54X2VuZCA/IC0xIDogKzEpO1xuICAgIHRoaXMuZHJhd0xpbmVQeFBhcnQocnB4KTtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLmN0eC5tb3ZlVG8ocnB4LnhfZW5kICsgZHggLyAyLCBycHgueSArIGR4IC8gMik7XG4gICAgdGhpcy5jdHgubGluZVRvKHJweC54X2VuZCArIGR4LCBycHgueSk7XG4gICAgdGhpcy5jdHgubGluZVRvKHJweC54X2VuZCArIGR4IC8gMiwgcnB4LnkgLSBkeCAvIDIpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgcmFuZ2UgYXMgYSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqIEBwYXJhbSBycHggQSBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAqL1xuICBkcmF3UmFuZ2VQeFBhcnQocnB4OiBSYW5nZVB4KSB7XG4gICAgaWYgKHJweC5zdHlsZSA9PSBcImxpbmVcIikge1xuICAgICAgdGhpcy5kcmF3TGluZVB4UGFydChycHgpO1xuICAgIH0gZWxzZSBpZiAocnB4LnN0eWxlID09IFwiY3VydmVcIikge1xuICAgICAgdGhpcy5kcmF3Q3VydmVQYXJ0KHJweCk7XG4gICAgfSBlbHNlIGlmIChycHguc3R5bGUgPT0gXCJhcnJvd1wiKSB7XG4gICAgICB0aGlzLmRyYXdBcnJvd1B4UGFydChycHgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHJhbmdlLlxuICAgKiBAcGFyYW0gcnB4IEEgcmFuZ2UgdG8gZHJhdy5cbiAgICovXG4gIGRyYXdSYW5nZVB4KHJweDogUmFuZ2VQeCkge1xuICAgIGlmIChycHguc3R5bGUgPT0gXCJsaW5lXCIpIHtcbiAgICAgIHRoaXMuZHJhd0xpbmVQeFBhcnQocnB4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgW3JsLCByYywgcnJdID0gdGhpcy5zcGxpdFJhbmdlUHgocnB4KTtcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHhQYXJ0KHJsKTtcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHhQYXJ0KHJjKTtcbiAgICAgIHRoaXMuZHJhd1JhbmdlUHhQYXJ0KHJyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBzdHJpbmdzLlxuICAgKiBAcGFyYW0gciBBIHJhbmdlIHRvIGRyYXcgc3RyaW5ncy5cbiAgICogQHBhcmFtIHkgVGhlIHktY29vcmluYXRlIHRvIGRyYXcgcmFuZ2UgYHJgLlxuICAgKi9cbiAgZHJhd1N0cihyOiBSYW5nZSwgeTogbnVtYmVyKSB7XG4gICAgY29uc3QgcnN0ciA9IHIuc3RyIGFzIHN0cmluZ1tdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYyA9IHJzdHJbaV07XG4gICAgICBjb25zdCBjeCA9IHRoaXMuc3RyX3ggKyAoci5iZWcgKyBpKSAqIHRoaXMuZm9udF9zaXplO1xuICAgICAgdGhpcy5jdHguZmlsbFRleHQoYywgY3gsIHkgKyB0aGlzLmZvbnRfc2l6ZSAqIDAuMywgdGhpcy5mb250X3NpemUpO1xuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmN0eC5yZWN0KFxuICAgICAgICBjeCAtIHRoaXMuZm9udF9zaXplX2hhbGYsXG4gICAgICAgIHkgLSB0aGlzLmZvbnRfc2l6ZV9oYWxmLFxuICAgICAgICB0aGlzLmZvbnRfc2l6ZSxcbiAgICAgICAgdGhpcy5mb250X3NpemUsXG4gICAgICApO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgcmFuZ2UuXG4gICAqIEBwYXJhbSByIEEgcmFuZ2UgdG8gZHJhdy5cbiAgICogQHBhcmFtIHkgQSB5LWNvb3JkaW5hdGUgdG8gZHJhdyBgcmAuXG4gICAqL1xuICBkcmF3UmFuZ2UocjogUmFuZ2UsIHk6IG51bWJlcikge1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gci5jb2xvcjtcbiAgICBjb25zdCBycHggPSB7XG4gICAgICB4X2JlZzogdGhpcy5yYW5nZUJlZyhyLmJlZyksXG4gICAgICB4X2VuZDogdGhpcy5yYW5nZUVuZChyLmVuZCksXG4gICAgICB5OiB5LFxuICAgICAgc3R5bGU6IHIuc3R5bGUsXG4gICAgICBjb2xvcjogci5jb2xvcixcbiAgICAgIHN0cjogci5zdHIsXG4gICAgfTtcbiAgICBpZiAoci5zdHlsZSA9PSBcInN0clwiKSB7XG4gICAgICB0aGlzLmRyYXdTdHIociwgeSk7XG4gICAgfSBlbHNlIGlmIChyLnN0ZXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kcmF3UmFuZ2VQeChycHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBjdXIgPSByLmJlZyArIHIuc3RlcCAtIDE7IGN1ciA8IHIuZW5kOyBjdXIgKz0gci5zdGVwKSB7XG4gICAgICAgIHJweC54X2VuZCA9IHRoaXMuc3RyX3ggKyB0aGlzLmZvbnRfc2l6ZSAqIGN1ciArIHRoaXMuZm9udF9zaXplX2hhbGY7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KTtcbiAgICAgICAgcnB4LnhfYmVnID0gcnB4LnhfZW5kO1xuICAgICAgfVxuICAgICAgaWYgKChyLmVuZCAtIHIuYmVnICsgMSkgJSByLnN0ZXAgPT09IDApIHtcbiAgICAgICAgcnB4LnhfZW5kID0gdGhpcy5yYW5nZUVuZChyLmVuZCk7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoZXJlIGlzIGFuIHVuY29tcGxldGUgcmFuZ2UuXG4gICAgICAgIHJweC54X2VuZCA9IHRoaXMuc3RyX3ggKyB0aGlzLmZvbnRfc2l6ZSAqIHIuZW5kICsgdGhpcy5mb250X3NpemVfaGFsZjtcbiAgICAgICAgcnB4LnN0eWxlID0gci5zdHlsZS5zcGxpdChcIixcIilbMF0gKyBcIixsaW5lXCI7XG4gICAgICAgIHRoaXMuZHJhd1JhbmdlUHgocnB4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRHJhdyByYW5nZXMuXG4gICAqIEBwYXJhbSByYW5nZV9yb3dzIFJhbmdlcyB0byBkcmF3LlxuICAgKi9cbiAgZHJhd1JhbmdlcyhyYW5nZV9yb3dzOiBSYW5nZVtdW10pIHtcbiAgICBsZXQgeXB4ID0gdGhpcy5zdHJfeTtcbiAgICBmb3IgKGNvbnN0IHJhbmdlcyBvZiByYW5nZV9yb3dzKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heCguLi5yYW5nZXMubWFwKChyKSA9PiB0aGlzLnJhbmdlSGVpZ2h0KHIpKSk7XG4gICAgICBmb3IgKGNvbnN0IHJhbmdlIG9mIHJhbmdlcykge1xuICAgICAgICB0aGlzLmRyYXdSYW5nZShyYW5nZSwgeXB4ICsgaGVpZ2h0IC8gMik7XG4gICAgICB9XG4gICAgICB5cHggKz0gaGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGFuIGlucHV0IHN0cmluZy5cbiAgICovXG4gIGRyYXdJbnB1dFN0cihpbnB1dF9zdHI6IHN0cmluZykge1xuICAgIGNvbnN0IGluZGV4ID0gW1wiaVwiXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0X3N0ci5sZW5ndGg7IGkrKykgaW5kZXgucHVzaChcIlwiICsgaSk7XG4gICAgY29uc3QgciA9IHtcbiAgICAgIHN0eWxlOiBcInN0clwiLFxuICAgICAgY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgYmVnOiAtMSxcbiAgICAgIGVuZDogaW5wdXRfc3RyLmxlbmd0aCAtIDEsXG4gICAgICBzdHI6IGluZGV4LFxuICAgIH07XG4gICAgdGhpcy5kcmF3UmFuZ2UociwgdGhpcy5zdHJfeSAtIHRoaXMuZm9udF9zaXplIC0gdGhpcy5mb250X3NpemVfaGFsZik7XG4gICAgY29uc3QgY2hhcnMgPSBbXCJTdHJcIl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dF9zdHIubGVuZ3RoOyBpKyspXG4gICAgICBjaGFycy5wdXNoKGlucHV0X3N0ci5zdWJzdHJpbmcoaSwgaSArIDEpKTtcbiAgICByLnN0ciA9IGNoYXJzO1xuICAgIHRoaXMuZHJhd1JhbmdlKHIsIHRoaXMuc3RyX3kgLSB0aGlzLmZvbnRfc2l6ZV9oYWxmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGEgZ2l2ZW4gc3RyaW5nIGFuZCByYW5nZXMuXG4gICAqIEBwYXJhbSBpbnB1dF9zdHIgSW5wdXQgc3RyaW5nIHRvIGRyYXcuXG4gICAqIEBwYXJhbSByc3MgVGhlIHJhbmdlcyB0byBkcmF3IHdoaWNoIGFyZSByZWxhdGVkIHRvIGEgZ2l2ZW4gc3RyaW5nIGBpbnB1dF9zdHJgXG4gICAqL1xuICBkcmF3KGlucHV0X3N0cjogc3RyaW5nLCByc3M6IFJhbmdlW11bXSkge1xuICAgIGxldCByYW5nZV9ib3VuZCA9IFstMSwgaW5wdXRfc3RyLmxlbmd0aCAtIDFdO1xuICAgIHJzcy5mb3JFYWNoKChycykgPT5cbiAgICAgIHJzLmZvckVhY2goXG4gICAgICAgIChyKSA9PlxuICAgICAgICAgIChyYW5nZV9ib3VuZCA9IFtcbiAgICAgICAgICAgIE1hdGgubWluKHJhbmdlX2JvdW5kWzBdLCByLmJlZyksXG4gICAgICAgICAgICBNYXRoLm1heChyYW5nZV9ib3VuZFsxXSwgci5lbmQpLFxuICAgICAgICAgIF0pLFxuICAgICAgKSxcbiAgICApO1xuICAgIHRoaXMuc3RyX3ggPSB0aGlzLmZvbnRfc2l6ZSArIE1hdGguYWJzKHJhbmdlX2JvdW5kWzBdKSAqIHRoaXMuZm9udF9zaXplO1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gKHJhbmdlX2JvdW5kWzFdIC0gcmFuZ2VfYm91bmRbMF0gKyAyKSAqIHRoaXMuZm9udF9zaXplO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9XG4gICAgICB0aGlzLnN0cl95ICtcbiAgICAgIHRoaXMuZm9udF9zaXplX2hhbGYgK1xuICAgICAgcnNzLnJlZHVjZShcbiAgICAgICAgKGFjbSwgcnMpID0+IGFjbSArIE1hdGgubWF4KC4uLnJzLm1hcCgocikgPT4gdGhpcy5yYW5nZUhlaWdodChyKSkpLFxuICAgICAgICAwLFxuICAgICAgKTtcblxuICAgIC8vIERQSSBzZXR0aW5nc1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gICAgdGhpcy5jYW52YXMud2lkdGggKj0gZHByO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCAqPSBkcHI7XG4gICAgdGhpcy5jdHguc2NhbGUoZHByLCBkcHIpO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGggLyBkcHIgKyBcInB4XCI7XG5cbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLyBkcHIgKyBcInB4XCI7XG4gICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAzO1xuICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLmZvbnRfc2l6ZSArIFwicHggXCIgKyB0aGlzLmZvbnRfdHlwZTtcbiAgICB0aGlzLmRyYXdJbnB1dFN0cihpbnB1dF9zdHIpO1xuICAgIHRoaXMuZHJhd1Jhbmdlcyhyc3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgZ3JvdXAgdGhhdCBlYWNoIGNvbnRhaW5zIGEgc2luZ2xlIHJhbmdlLlxuICAgKiBAcGFyYW0gcmFuZ2VzIFRoZSByYW5nZSBsaXN0LlxuICAgKi9cbiAgbWFrZVNpbmdsZUdyb3VwcyhyYW5nZXM6IFJhbmdlW10pOiBSYW5nZVtdW10ge1xuICAgIHJldHVybiByYW5nZXMubWFwKChyYW5nZSkgPT4gW3JhbmdlXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBncm91cGVkIHJhbmdlcyB0aGF0IGVhY2ggY29udGFpbnMgbm9uIG92ZXJsYXBwaW5nIHJhbmdlcy5cbiAgICogQHBhcmFtIFRzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gcmFuZ2VmIFRoZSBmdW5jdGlvbiB0byByZXR1cm4gdGhlIHR1cGxlIGJlZ2lubmluZyBpbmRleCBhbmQgZW5kaW5nIGluZGV4IG9mIGEgZ2l2ZW4gcmFuZ2UgYFRzW2ldYC5cbiAgICovXG4gIG5vbk92ZXJsYXBPYmpzPFQ+KFRzOiBUW10sIHJhbmdlZjogKGFyZzA6IFQpID0+IG51bWJlcltdKTogVFtdW10ge1xuICAgIGlmIChUcy5sZW5ndGggPD0gMCkgcmV0dXJuIFtdO1xuICAgIGNvbnN0IGVuZHMgPSBUcy5tYXAoKHQpID0+IHJhbmdlZih0KVsxXSk7XG4gICAgY29uc3QgbiA9IE1hdGgubWF4KC4uLmVuZHMpICsgMTtcbiAgICBjb25zdCB1c2VkID0gbmV3IEFycmF5PGJvb2xlYW4+KG4pO1xuICAgIHVzZWQuZmlsbChmYWxzZSk7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgbGV0IHJvd3M6IFRbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgdCBvZiBUcykge1xuICAgICAgLy8gY2hlY2sgd2hldGhlciBvciBub3QgYSByYW5nZSBjYW4gYmUgaW5zZXJ0ZWQgdG8gdGhlIGN1cnJlbnQgcm93LlxuICAgICAgbGV0IHVzZWRfYW55ID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gcmFuZ2VmKHQpWzBdOyBpIDw9IHJhbmdlZih0KVsxXTsgaSsrKSB7XG4gICAgICAgIHVzZWRfYW55ID0gdXNlZF9hbnkgfHwgdXNlZFtpXTtcbiAgICAgIH1cbiAgICAgIGlmICh1c2VkX2FueSkge1xuICAgICAgICByZXMucHVzaChyb3dzKTtcbiAgICAgICAgcm93cyA9IFt0XTtcbiAgICAgICAgdXNlZC5maWxsKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd3MucHVzaCh0KTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSByYW5nZWYodClbMF07IGkgPD0gcmFuZ2VmKHQpWzFdOyBpKyspIHtcbiAgICAgICAgdXNlZFtpXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyb3dzLmxlbmd0aCA+IDApIHJlcy5wdXNoKHJvd3MpO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGdyb3VwZWQgcmFuZ2VzIHRoYXQgZWFjaCBjb250YWlucyBub24gb3ZlcmxhcHBpbmcgcmFuZ2VzLlxuICAgKiBAcGFyYW0gcnMgVGhlIHJhbmdlIGxpc3QuXG4gICAqL1xuICBub25PdmVybGFwUmFuZ2VzKHJzOiBSYW5nZVtdKTogUmFuZ2VbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5ub25PdmVybGFwT2JqczxSYW5nZT4ocnMsIChyKSA9PiBbci5iZWcsIHIuZW5kXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBncm91cGVkIHJhbmdlcyB0aGF0IGVhY2ggY29udGFpbnMgbm9uIG92ZXJsYXBwaW5nIHJhbmdlcy5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKi9cbiAgbm9uT3ZlcmxhcFJhbmdlc1NpbXBsZShyczogUmFuZ2VTaW1wbGVbXSk6IFJhbmdlU2ltcGxlW11bXSB7XG4gICAgcmV0dXJuIHRoaXMubm9uT3ZlcmxhcE9ianM8UmFuZ2VTaW1wbGU+KHJzLCAoeCkgPT4gW3hbMF0sIHhbMV1dKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHJhbmdlIGxpc3QgYHJzYCBzcGVjaWZpZWQgd2l0aCB0aGUgc3R5bGUgYHN0eWxlYC5cbiAgICogQHBhcmFtIHJzIFRoZSByYW5nZSBsaXN0LlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIHN0eWxlIG9mIHRoZSByYW5nZXMgYHJzYCB0byBkcmF3LlxuICAgKi9cbiAgbWFrZUdyb3VwUmFuZ2VzQXV0b0NvbG9yKHJzOiBSYW5nZVNpbXBsZVtdW10sIHN0eWxlOiBzdHJpbmcpOiBSYW5nZVtdW10ge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gXCIjXCIgKyBjb252ZXJ0Lmhzdi5oZXgoWyhpICogMzYwKSAvIHJzLmxlbmd0aCwgODAsIDgwXSk7XG4gICAgICByZXMucHVzaCh0aGlzLm1ha2VSYW5nZXMocnNbaV0sIHN0eWxlLCBjb2xvcikpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmFuZ2UgbGlzdCBgcnNgIHNwZWNpZmllZCB3aXRoIHN0eWxlIGBzdHlsZWAgYW5kIGBjb2xvcmAuXG4gICAqIEBwYXJhbSByYW5nZXMgVGhlIHJhbmdlIGxpc3QuXG4gICAqIEBwYXJhbSBzdHlsZSBUaGUgc3R5bGUgb2YgdGhlIHJhbmdlcyBgcnNgIHRvIGRyYXcuXG4gICAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3Igb2YgdGhlIHJhbmdlcyBgcnNgIHRvIGRyYXcuXG4gICAqL1xuICBtYWtlUmFuZ2VzKHJhbmdlczogUmFuZ2VTaW1wbGVbXSwgc3R5bGU6IHN0cmluZywgY29sb3I6IHN0cmluZyk6IFJhbmdlW10ge1xuICAgIHJldHVybiByYW5nZXMubWFwKChyYW5nZSkgPT4ge1xuICAgICAgY29uc3QgaXNfc3RyID1cbiAgICAgICAgdHlwZW9mIHJhbmdlWzJdICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiByYW5nZVsyXSAhPT0gXCJudW1iZXJcIjtcbiAgICAgIGNvbnN0IHN0ZXAgPSB0eXBlb2YgcmFuZ2VbMl0gPT09IFwibnVtYmVyXCIgPyByYW5nZVsyXSA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IHN0ciA9IHR5cGVvZiByYW5nZVsyXSAhPT0gXCJudW1iZXJcIiA/IHJhbmdlWzJdIDogdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3R5bGU6IGlzX3N0ciA/IFwic3RyXCIgOiBzdHlsZSxcbiAgICAgICAgY29sb3IsXG4gICAgICAgIGJlZzogcmFuZ2VbMF0sXG4gICAgICAgIGVuZDogcmFuZ2VbMV0sXG4gICAgICAgIHN0ZXAsXG4gICAgICAgIHN0cixcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSByYW5nZSBsaXN0IGByc2Agc3BlY2lmaWVkIHdpdGggdGhlIHN0eWxlIGBzdHlsZWAuXG4gICAqIEBwYXJhbSBycyBUaGUgcmFuZ2UgbGlzdC5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBzdHlsZSBvZiB0aGUgcmFuZ2VzIGByc2AgdG8gZHJhdy5cbiAgICovXG4gIG1ha2VSYW5nZXNBdXRvQ29sb3IocnM6IFJhbmdlU2ltcGxlW10sIHN0eWxlOiBzdHJpbmcpOiBSYW5nZVtdIHtcbiAgICByZXR1cm4gcnMubWFwKChyYW5nZSwgaSkgPT4gKHtcbiAgICAgIHN0eWxlLFxuICAgICAgY29sb3I6IFwiI1wiICsgY29udmVydC5oc3YuaGV4KFsoaSAqIDM2MCkgLyBycy5sZW5ndGgsIDgwLCA4MF0pLFxuICAgICAgYmVnOiByYW5nZVswXSxcbiAgICAgIGVuZDogcmFuZ2VbMV0sXG4gICAgfSkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSYW5nZSwgUmFuZ2VTaW1wbGUsIFZpc1N0ciB9IGZyb20gXCIuL3Zpc19zdHJcIjtcbmltcG9ydCAqIGFzIHN0cmxpYiBmcm9tIFwiLi9zdHJsaWJcIjtcblxuY29uc3QgcmFkaW9WYWx1ZSA9IChzZWxlY3Rvcjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgbGV0IHJlcyA9IFwiXCI7XG4gIGNvbnN0IGVsbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KHNlbGVjdG9yKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbG1zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVsbXNbaV0uY2hlY2tlZCkgcmVzID0gZWxtc1tpXS52YWx1ZTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuY29uc3QgZHJhdyA9IChfZTogRXZlbnQpID0+IHtcbiAgLy8gZ2V0IGZvbnQgc2l6ZVxuICBjb25zdCBmb250X3NpemUgPSBwYXJzZUludChyYWRpb1ZhbHVlKFwiW25hbWU9Zm9udF9zaXplXVwiKSk7XG4gIC8vIGdldCBsaW5lIHN0eWxlXG4gIGxldCByYW5nZV9zdHlsZSA9IHJhZGlvVmFsdWUoXCJbbmFtZT1saW5lX3N0eWxlXVwiKTtcbiAgY29uc3QgbGluZV9zdHlsZV9yaWdodCA9IHJhZGlvVmFsdWUoXCJbbmFtZT1saW5lX3N0eWxlX3JpZ2h0XVwiKTtcblxuICByYW5nZV9zdHlsZSArPSBsaW5lX3N0eWxlX3JpZ2h0Lmxlbmd0aCA9PT0gMCA/IFwiXCIgOiBcIixcIiArIGxpbmVfc3R5bGVfcmlnaHQ7XG4gIGNvbnN0IHZpc3VhbGl6ZSA9IHJhZGlvVmFsdWUoXCJbbmFtZT12aXN1YWxpemVdXCIpO1xuXG4gIC8vIGdldCBpbnB1dCBzdHJpbmdcbiAgY29uc3QgZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dF9zdHJcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgY29uc3QgaW5wdXRfc3RyID0gZWxtLnZhbHVlO1xuXG4gIC8vIGdldCBjYW52YXNcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gIC8vIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gNTBcbiAgY29uc3QgdmlzU3RyID0gbmV3IFZpc1N0cihjYW52YXMsIGZvbnRfc2l6ZSk7XG5cbiAgLy8gY29tcHV0ZSByYW5nZXNcbiAgbGV0IHJhbmdlc3A6IFJhbmdlU2ltcGxlW10gPSBbXTtcbiAgbGV0IHJhbmdlc19ncm91cDogUmFuZ2VTaW1wbGVbXVtdID0gW107XG4gIGxldCByYW5nZXM6IFJhbmdlW11bXSA9IFtdO1xuXG4gIGNvbnN0IHNob3dfZWZmZWN0aXZlX2FscGhhYmV0ID0gKFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWZmZWN0aXZlX2FscGhhYmV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgKS5jaGVja2VkO1xuICBjb25zdCBzaG93X3JhbmtfYXJyYXkgPSAoXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5rX2FycmF5XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgKS5jaGVja2VkO1xuXG4gIGlmIChzaG93X2VmZmVjdGl2ZV9hbHBoYWJldCkge1xuICAgIHJhbmdlc19ncm91cC5wdXNoKFtcbiAgICAgIFtcbiAgICAgICAgLTEsXG4gICAgICAgIGlucHV0X3N0ci5sZW5ndGggLSAxLFxuICAgICAgICBbXCJlU3RyXCIsIC4uLnN0cmxpYi5yZXBsYWNlRWZmZWN0aXZlQWxwaGFiZXQoaW5wdXRfc3RyKV0sXG4gICAgICBdLFxuICAgIF0gYXMgUmFuZ2VTaW1wbGVbXSk7XG4gIH1cbiAgaWYgKHNob3dfcmFua19hcnJheSkge1xuICAgIHJhbmdlc19ncm91cC5wdXNoKFtcbiAgICAgIFstMSwgaW5wdXRfc3RyLmxlbmd0aCAtIDEsIFtcInJhbmtcIiwgLi4uc3RybGliLnJhbmtBcnJheShpbnB1dF9zdHIpXV0sXG4gICAgXSBhcyBSYW5nZVNpbXBsZVtdKTtcbiAgfVxuXG4gIGlmIChcbiAgICB2aXN1YWxpemUgPT09IFwicnVuc1wiIHx8XG4gICAgdmlzdWFsaXplID09PSBcInBhbGluZHJvbWVzXCIgfHxcbiAgICB2aXN1YWxpemUgPT09IFwic3F1YXJlc1wiIHx8XG4gICAgdmlzdWFsaXplID09PSBcInJtb3N0c3F1YXJlc1wiIHx8XG4gICAgdmlzdWFsaXplID09PSBcImxtb3N0c3F1YXJlc1wiXG4gICkge1xuICAgIGlmICh2aXN1YWxpemUgPT09IFwicnVuc1wiKSB7XG4gICAgICByYW5nZXNwID0gc3RybGliLmVudW1SdW5zKGlucHV0X3N0cikgYXMgUmFuZ2VTaW1wbGVbXTtcbiAgICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJwYWxpbmRyb21lc1wiKSB7XG4gICAgICByYW5nZXNwID0gc3RybGliLmVudW1QYWxpbmRyb21lcyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW107XG4gICAgfSBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwic3F1YXJlc1wiKSB7XG4gICAgICByYW5nZXNwID0gc3RybGliLmVudW1TcXVhcmVzKGlucHV0X3N0cikgYXMgUmFuZ2VTaW1wbGVbXTtcbiAgICB9IGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJybW9zdHNxdWFyZXNcIikge1xuICAgICAgcmFuZ2VzcCA9IHN0cmxpYi5lbnVtUmlnaHRtb3N0U3F1YXJlcyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW107XG4gICAgfSBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwibG1vc3RzcXVhcmVzXCIpIHtcbiAgICAgIHJhbmdlc3AgPSBzdHJsaWIuZW51bUxlZnRtb3N0U3F1YXJlcyhpbnB1dF9zdHIpIGFzIFJhbmdlU2ltcGxlW107XG4gICAgfVxuICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQodmlzU3RyLm5vbk92ZXJsYXBSYW5nZXNTaW1wbGUocmFuZ2VzcCkpO1xuICAgIHJhbmdlcyA9IHZpc1N0ci5tYWtlR3JvdXBSYW5nZXNBdXRvQ29sb3IocmFuZ2VzX2dyb3VwLCByYW5nZV9zdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZpc3VhbGl6ZSA9PT0gXCJscGZcIilcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoc3RybGliLmVudW1QcmV2T2NjTFBGKGlucHV0X3N0cikpO1xuICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJsZWZ0X21heGltYWxcIilcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoXG4gICAgICAgIHN0cmxpYi5lbnVtSWZHcm91cChpbnB1dF9zdHIsIHN0cmxpYi5pc0xlZnRNYXhpbWFsKSxcbiAgICAgICk7XG4gICAgZWxzZSBpZiAodmlzdWFsaXplID09PSBcInJpZ2h0X21heGltYWxcIilcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoXG4gICAgICAgIHN0cmxpYi5lbnVtSWZHcm91cChpbnB1dF9zdHIsIHN0cmxpYi5pc1JpZ2h0TWF4aW1hbCksXG4gICAgICApO1xuICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJtYXhfcmVwZWF0XCIpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KFxuICAgICAgICBzdHJsaWIuZW51bUlmR3JvdXAoaW5wdXRfc3RyLCBzdHJsaWIuaXNNYXhSZXBlYXQpLFxuICAgICAgKTtcbiAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwibHo3N1wiKVxuICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChzdHJsaWIubHo3NyhpbnB1dF9zdHIpKTtcbiAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwibHo3OFwiKVxuICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChzdHJsaWIubHo3OChpbnB1dF9zdHIpKTtcbiAgICBlbHNlIGlmICh2aXN1YWxpemUgPT09IFwibHluZG9uX2ZhY3Rvcml6YXRpb25cIilcbiAgICAgIHJhbmdlc19ncm91cCA9IHJhbmdlc19ncm91cC5jb25jYXQoc3RybGliLmx5bmRvbkZhY3Rvcml6YXRpb24oaW5wdXRfc3RyKSk7XG4gICAgZWxzZSBpZiAodmlzdWFsaXplID09PSBcImx5bmRvbl9hcnJheVwiKVxuICAgICAgcmFuZ2VzX2dyb3VwID0gcmFuZ2VzX2dyb3VwLmNvbmNhdChzdHJsaWIubHluZG9uQXJyYXkoaW5wdXRfc3RyKSk7XG4gICAgZWxzZSBpZiAodmlzdWFsaXplID09PSBcImVudW1fbHluZG9uXCIpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KHN0cmxpYi5lbnVtTHluZG9uKGlucHV0X3N0cikpO1xuICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJwcmV2X3NtYWxsZXJfc3VmZml4XCIpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KHN0cmxpYi5wcmV2U21hbGxlclN1ZmZpeGVzKGlucHV0X3N0cikpO1xuICAgIGVsc2UgaWYgKHZpc3VhbGl6ZSA9PT0gXCJuZXh0X3NtYWxsZXJfc3VmZml4XCIpXG4gICAgICByYW5nZXNfZ3JvdXAgPSByYW5nZXNfZ3JvdXAuY29uY2F0KHN0cmxpYi5uZXh0U21hbGxlclN1ZmZpeGVzKGlucHV0X3N0cikpO1xuICAgIHJhbmdlcyA9IHZpc1N0ci5tYWtlR3JvdXBSYW5nZXNBdXRvQ29sb3IocmFuZ2VzX2dyb3VwLCByYW5nZV9zdHlsZSk7XG4gICAgcmFuZ2VzID0gc3RybGliLmZsYXQocmFuZ2VzLm1hcCgoeCkgPT4gdmlzU3RyLm5vbk92ZXJsYXBSYW5nZXMoeCkpKTtcbiAgfVxuXG4gIHZpc1N0ci5kcmF3KGlucHV0X3N0ciwgcmFuZ2VzKTtcbn07XG5cbmNvbnN0IHNlbGVjdG9yQWRkRXZlbnQgPSAoXG4gIHNlbGVjdG9yOiBzdHJpbmcsXG4gIGV2ZW50OiBzdHJpbmcsXG4gIGZ1bmM6IEV2ZW50TGlzdGVuZXIsXG4pID0+IHtcbiAgY29uc3QgZWxtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oc2VsZWN0b3IpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpKyspIHtcbiAgICBlbG1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xuICB9XG59O1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICBjb25zdCBpbnB1dF9zdHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0X3N0clwiKSBhcyBIVE1MRWxlbWVudDtcbiAgaW5wdXRfc3RyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBkcmF3KTtcbiAgaW5wdXRfc3RyLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9wZXJ0eWNoYW5nZVwiLCBkcmF3KTtcblxuICAvLyBhZGQgZXZlbnQgZm9yIHJhZGlvIGJ1dHRvbnNcbiAgc2VsZWN0b3JBZGRFdmVudChcIltuYW1lPWZvbnRfc2l6ZV1cIiwgXCJjbGlja1wiLCBkcmF3KTtcbiAgc2VsZWN0b3JBZGRFdmVudChcIltuYW1lPWxpbmVfc3R5bGVdXCIsIFwiY2xpY2tcIiwgZHJhdyk7XG4gIHNlbGVjdG9yQWRkRXZlbnQoXCJbbmFtZT1saW5lX3N0eWxlX3JpZ2h0XVwiLCBcImNsaWNrXCIsIGRyYXcpO1xuICBzZWxlY3RvckFkZEV2ZW50KFwiW25hbWU9dmlzdWFsaXplXVwiLCBcImNsaWNrXCIsIGRyYXcpO1xuICBzZWxlY3RvckFkZEV2ZW50KFwiW3R5cGU9Y2hlY2tib3hdXCIsIFwiY2xpY2tcIiwgZHJhdyk7XG5cbiAgLy8gZHJhdyBpbml0aWFsbHkuXG4gIGlucHV0X3N0ci5kaXNwYXRjaEV2ZW50KFxuICAgIG5ldyBDdXN0b21FdmVudChcInByb3BlcnR5Y2hhbmdlXCIsIHsgZGV0YWlsOiBcImluaXQgZXZlbnRcIiB9KSxcbiAgKTtcbn07XG5cbm1haW4oKTtcbiIsIi8qIE1JVCBsaWNlbnNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1taXhlZC1vcGVyYXRvcnMgKi9cbmltcG9ydCBjc3NLZXl3b3JkcyBmcm9tICdjb2xvci1uYW1lJztcblxuLy8gTk9URTogY29udmVyc2lvbnMgc2hvdWxkIG9ubHkgcmV0dXJuIHByaW1pdGl2ZSB2YWx1ZXMgKGkuZS4gYXJyYXlzLCBvclxuLy8gICAgICAgdmFsdWVzIHRoYXQgZ2l2ZSBjb3JyZWN0IGB0eXBlb2ZgIHJlc3VsdHMpLlxuLy8gICAgICAgZG8gbm90IHVzZSBib3ggdmFsdWVzIHR5cGVzIChpLmUuIE51bWJlcigpLCBTdHJpbmcoKSwgZXRjLilcblxuY29uc3QgcmV2ZXJzZUtleXdvcmRzID0ge307XG5mb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhjc3NLZXl3b3JkcykpIHtcblx0cmV2ZXJzZUtleXdvcmRzW2Nzc0tleXdvcmRzW2tleV1dID0ga2V5O1xufVxuXG5jb25zdCBjb252ZXJ0ID0ge1xuXHRyZ2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAncmdiJ30sXG5cdGhzbDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdoc2wnfSxcblx0aHN2OiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzdid9LFxuXHRod2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHdiJ30sXG5cdGNteWs6IHtjaGFubmVsczogNCwgbGFiZWxzOiAnY215ayd9LFxuXHR4eXo6IHtjaGFubmVsczogMywgbGFiZWxzOiAneHl6J30sXG5cdGxhYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsYWInfSxcblx0b2tsYWI6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ29rbCcsICdva2EnLCAnb2tiJ119LFxuXHRsY2g6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGNoJ30sXG5cdG9rbGNoOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydva2wnLCAnb2tjJywgJ29raCddfSxcblx0aGV4OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydoZXgnXX0sXG5cdGtleXdvcmQ6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2tleXdvcmQnXX0sXG5cdGFuc2kxNjoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTE2J119LFxuXHRhbnNpMjU2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMjU2J119LFxuXHRoY2c6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ2gnLCAnYycsICdnJ119LFxuXHRhcHBsZToge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsncjE2JywgJ2cxNicsICdiMTYnXX0sXG5cdGdyYXk6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2dyYXknXX0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb252ZXJ0O1xuXG4vLyBMQUIgZih0KSBjb25zdGFudFxuY29uc3QgTEFCX0ZUID0gKDYgLyAyOSkgKiogMztcblxuLy8gU1JHQiBub24tbGluZWFyIHRyYW5zZm9ybSBmdW5jdGlvbnNcbmZ1bmN0aW9uIHNyZ2JOb25saW5lYXJUcmFuc2Zvcm0oYykge1xuXHRjb25zdCBjYyA9IGMgPiAwLjAwM18xMzBfOFxuXHRcdD8gKCgxLjA1NSAqIChjICoqICgxIC8gMi40KSkpIC0gMC4wNTUpXG5cdFx0OiBjICogMTIuOTI7XG5cdHJldHVybiBNYXRoLm1pbihNYXRoLm1heCgwLCBjYyksIDEpO1xufVxuXG5mdW5jdGlvbiBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KGMpIHtcblx0cmV0dXJuIGMgPiAwLjA0MF80NSA/ICgoKGMgKyAwLjA1NSkgLyAxLjA1NSkgKiogMi40KSA6IChjIC8gMTIuOTIpO1xufVxuXG4vLyBIaWRlIC5jaGFubmVscyBhbmQgLmxhYmVscyBwcm9wZXJ0aWVzXG5mb3IgKGNvbnN0IG1vZGVsIG9mIE9iamVjdC5rZXlzKGNvbnZlcnQpKSB7XG5cdGlmICghKCdjaGFubmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHR9XG5cblx0aWYgKCEoJ2xhYmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWwgbGFiZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHR9XG5cblx0aWYgKGNvbnZlcnRbbW9kZWxdLmxhYmVscy5sZW5ndGggIT09IGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjaGFubmVsIGFuZCBsYWJlbCBjb3VudHMgbWlzbWF0Y2g6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHRjb25zdCB7Y2hhbm5lbHMsIGxhYmVsc30gPSBjb252ZXJ0W21vZGVsXTtcblx0ZGVsZXRlIGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzO1xuXHRkZWxldGUgY29udmVydFttb2RlbF0ubGFiZWxzO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY2hhbm5lbHN9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbbW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBsYWJlbHN9KTtcbn1cblxuY29udmVydC5yZ2IuaHNsID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXHRjb25zdCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcblx0Y29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG5cdGNvbnN0IGRlbHRhID0gbWF4IC0gbWluO1xuXHRsZXQgaDtcblx0bGV0IHM7XG5cblx0c3dpdGNoIChtYXgpIHtcblx0XHRjYXNlIG1pbjoge1xuXHRcdFx0aCA9IDA7XG5cblx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGNhc2Ugcjoge1xuXHRcdFx0aCA9IChnIC0gYikgLyBkZWx0YTtcblxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSBnOiB7XG5cdFx0XHRoID0gMiArIChiIC0gcikgLyBkZWx0YTtcblxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSBiOiB7XG5cdFx0XHRoID0gNCArIChyIC0gZykgLyBkZWx0YTtcblxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHQvLyBObyBkZWZhdWx0XG5cdH1cblxuXHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0Y29uc3QgbCA9IChtaW4gKyBtYXgpIC8gMjtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRzID0gMDtcblx0fSBlbHNlIGlmIChsIDw9IDAuNSkge1xuXHRcdHMgPSBkZWx0YSAvIChtYXggKyBtaW4pO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBkZWx0YSAvICgyIC0gbWF4IC0gbWluKTtcblx0fVxuXG5cdHJldHVybiBbaCwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5oc3YgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGxldCByZGlmO1xuXHRsZXQgZ2RpZjtcblx0bGV0IGJkaWY7XG5cdGxldCBoO1xuXHRsZXQgcztcblxuXHRjb25zdCByID0gcmdiWzBdIC8gMjU1O1xuXHRjb25zdCBnID0gcmdiWzFdIC8gMjU1O1xuXHRjb25zdCBiID0gcmdiWzJdIC8gMjU1O1xuXHRjb25zdCB2ID0gTWF0aC5tYXgociwgZywgYik7XG5cdGNvbnN0IGRpZmYgPSB2IC0gTWF0aC5taW4ociwgZywgYik7XG5cdGNvbnN0IGRpZmZjID0gZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gKHYgLSBjKSAvIDYgLyBkaWZmICsgMSAvIDI7XG5cdH07XG5cblx0aWYgKGRpZmYgPT09IDApIHtcblx0XHRoID0gMDtcblx0XHRzID0gMDtcblx0fSBlbHNlIHtcblx0XHRzID0gZGlmZiAvIHY7XG5cdFx0cmRpZiA9IGRpZmZjKHIpO1xuXHRcdGdkaWYgPSBkaWZmYyhnKTtcblx0XHRiZGlmID0gZGlmZmMoYik7XG5cblx0XHRzd2l0Y2ggKHYpIHtcblx0XHRcdGNhc2Ugcjoge1xuXHRcdFx0XHRoID0gYmRpZiAtIGdkaWY7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGNhc2UgZzoge1xuXHRcdFx0XHRoID0gKDEgLyAzKSArIHJkaWYgLSBiZGlmO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRjYXNlIGI6IHtcblx0XHRcdFx0aCA9ICgyIC8gMykgKyBnZGlmIC0gcmRpZjtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHQvLyBObyBkZWZhdWx0XG5cdFx0fVxuXG5cdFx0aWYgKGggPCAwKSB7XG5cdFx0XHRoICs9IDE7XG5cdFx0fSBlbHNlIGlmIChoID4gMSkge1xuXHRcdFx0aCAtPSAxO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBbXG5cdFx0aCAqIDM2MCxcblx0XHRzICogMTAwLFxuXHRcdHYgKiAxMDAsXG5cdF07XG59O1xuXG5jb252ZXJ0LnJnYi5od2IgPSBmdW5jdGlvbiAocmdiKSB7XG5cdGNvbnN0IHIgPSByZ2JbMF07XG5cdGNvbnN0IGcgPSByZ2JbMV07XG5cdGxldCBiID0gcmdiWzJdO1xuXHRjb25zdCBoID0gY29udmVydC5yZ2IuaHNsKHJnYilbMF07XG5cdGNvbnN0IHcgPSAxIC8gMjU1ICogTWF0aC5taW4ociwgTWF0aC5taW4oZywgYikpO1xuXG5cdGIgPSAxIC0gMSAvIDI1NSAqIE1hdGgubWF4KHIsIE1hdGgubWF4KGcsIGIpKTtcblxuXHRyZXR1cm4gW2gsIHcgKiAxMDAsIGIgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2Iub2tsYWIgPSBmdW5jdGlvbiAocmdiKSB7XG5cdC8vIEFzc3VtZSBzUkdCXG5cdGNvbnN0IHIgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KHJnYlswXSAvIDI1NSk7XG5cdGNvbnN0IGcgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KHJnYlsxXSAvIDI1NSk7XG5cdGNvbnN0IGIgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtSW52KHJnYlsyXSAvIDI1NSk7XG5cblx0Y29uc3QgbHAgPSBNYXRoLmNicnQoMC40MTJfMjIxXzQ3MF84ICogciArIDAuNTM2XzMzMl81MzZfMyAqIGcgKyAwLjA1MV80NDVfOTkyXzkgKiBiKTtcblx0Y29uc3QgbXAgPSBNYXRoLmNicnQoMC4yMTFfOTAzXzQ5OF8yICogciArIDAuNjgwXzY5OV81NDVfMSAqIGcgKyAwLjEwN18zOTZfOTU2XzYgKiBiKTtcblx0Y29uc3Qgc3AgPSBNYXRoLmNicnQoMC4wODhfMzAyXzQ2MV85ICogciArIDAuMjgxXzcxOF84MzdfNiAqIGcgKyAwLjYyOV85NzhfNzAwXzUgKiBiKTtcblxuXHRjb25zdCBsID0gMC4yMTBfNDU0XzI1NV8zICogbHAgKyAwLjc5M182MTdfNzg1ICogbXAgLSAwLjAwNF8wNzJfMDQ2XzggKiBzcDtcblx0Y29uc3QgYWEgPSAxLjk3N185OThfNDk1XzEgKiBscCAtIDIuNDI4XzU5Ml8yMDUgKiBtcCArIDAuNDUwXzU5M183MDlfOSAqIHNwO1xuXHRjb25zdCBiYiA9IDAuMDI1XzkwNF8wMzdfMSAqIGxwICsgMC43ODJfNzcxXzc2Nl8yICogbXAgLSAwLjgwOF82NzVfNzY2ICogc3A7XG5cblx0cmV0dXJuIFtsICogMTAwLCBhYSAqIDEwMCwgYmIgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuY215ayA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblxuXHRjb25zdCBrID0gTWF0aC5taW4oMSAtIHIsIDEgLSBnLCAxIC0gYik7XG5cdGNvbnN0IGMgPSAoMSAtIHIgLSBrKSAvICgxIC0gaykgfHwgMDtcblx0Y29uc3QgbSA9ICgxIC0gZyAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHRjb25zdCB5ID0gKDEgLSBiIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cblx0cmV0dXJuIFtjICogMTAwLCBtICogMTAwLCB5ICogMTAwLCBrICogMTAwXTtcbn07XG5cbmZ1bmN0aW9uIGNvbXBhcmF0aXZlRGlzdGFuY2UoeCwgeSkge1xuXHQvKlxuXHRcdFNlZSBodHRwczovL2VuLm0ud2lraXBlZGlhLm9yZy93aWtpL0V1Y2xpZGVhbl9kaXN0YW5jZSNTcXVhcmVkX0V1Y2xpZGVhbl9kaXN0YW5jZVxuXHQqL1xuXHRyZXR1cm4gKFxuXHRcdCgoeFswXSAtIHlbMF0pICoqIDIpICtcblx0XHQoKHhbMV0gLSB5WzFdKSAqKiAyKSArXG5cdFx0KCh4WzJdIC0geVsyXSkgKiogMilcblx0KTtcbn1cblxuY29udmVydC5yZ2Iua2V5d29yZCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgcmV2ZXJzZWQgPSByZXZlcnNlS2V5d29yZHNbcmdiXTtcblx0aWYgKHJldmVyc2VkKSB7XG5cdFx0cmV0dXJuIHJldmVyc2VkO1xuXHR9XG5cblx0bGV0IGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cdGxldCBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG5cblx0Zm9yIChjb25zdCBrZXl3b3JkIG9mIE9iamVjdC5rZXlzKGNzc0tleXdvcmRzKSkge1xuXHRcdGNvbnN0IHZhbHVlID0gY3NzS2V5d29yZHNba2V5d29yZF07XG5cblx0XHQvLyBDb21wdXRlIGNvbXBhcmF0aXZlIGRpc3RhbmNlXG5cdFx0Y29uc3QgZGlzdGFuY2UgPSBjb21wYXJhdGl2ZURpc3RhbmNlKHJnYiwgdmFsdWUpO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgaXRzIGxlc3MsIGlmIHNvIHNldCBhcyBjbG9zZXN0XG5cdFx0aWYgKGRpc3RhbmNlIDwgY3VycmVudENsb3Nlc3REaXN0YW5jZSkge1xuXHRcdFx0Y3VycmVudENsb3Nlc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuXHRcdFx0Y3VycmVudENsb3Nlc3RLZXl3b3JkID0ga2V5d29yZDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3VycmVudENsb3Nlc3RLZXl3b3JkO1xufTtcblxuY29udmVydC5rZXl3b3JkLnJnYiA9IGZ1bmN0aW9uIChrZXl3b3JkKSB7XG5cdHJldHVybiBbLi4uY3NzS2V5d29yZHNba2V5d29yZF1dO1xufTtcblxuY29udmVydC5yZ2IueHl6ID0gZnVuY3Rpb24gKHJnYikge1xuXHQvLyBBc3N1bWUgc1JHQlxuXHRjb25zdCByID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybUludihyZ2JbMF0gLyAyNTUpO1xuXHRjb25zdCBnID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybUludihyZ2JbMV0gLyAyNTUpO1xuXHRjb25zdCBiID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybUludihyZ2JbMl0gLyAyNTUpO1xuXG5cdGNvbnN0IHggPSAociAqIDAuNDEyXzQ1Nl80KSArIChnICogMC4zNTdfNTc2XzEpICsgKGIgKiAwLjE4MF80MzdfNSk7XG5cdGNvbnN0IHkgPSAociAqIDAuMjEyXzY3Ml85KSArIChnICogMC43MTVfMTUyXzIpICsgKGIgKiAwLjA3Ml8xNzUpO1xuXHRjb25zdCB6ID0gKHIgKiAwLjAxOV8zMzNfOSkgKyAoZyAqIDAuMTE5XzE5MikgKyAoYiAqIDAuOTUwXzMwNF8xKTtcblxuXHRyZXR1cm4gW3ggKiAxMDAsIHkgKiAxMDAsIHogKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IubGFiID0gZnVuY3Rpb24gKHJnYikge1xuXHRjb25zdCB4eXogPSBjb252ZXJ0LnJnYi54eXoocmdiKTtcblx0bGV0IHggPSB4eXpbMF07XG5cdGxldCB5ID0geHl6WzFdO1xuXHRsZXQgeiA9IHh5elsyXTtcblxuXHR4IC89IDk1LjA0Nztcblx0eSAvPSAxMDA7XG5cdHogLz0gMTA4Ljg4MztcblxuXHR4ID0geCA+IExBQl9GVCA/ICh4ICoqICgxIC8gMykpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuXHR5ID0geSA+IExBQl9GVCA/ICh5ICoqICgxIC8gMykpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IExBQl9GVCA/ICh6ICoqICgxIC8gMykpIDogKDcuNzg3ICogeikgKyAoMTYgLyAxMTYpO1xuXG5cdGNvbnN0IGwgPSAoMTE2ICogeSkgLSAxNjtcblx0Y29uc3QgYSA9IDUwMCAqICh4IC0geSk7XG5cdGNvbnN0IGIgPSAyMDAgKiAoeSAtIHopO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LmhzbC5yZ2IgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IGggPSBoc2xbMF0gLyAzNjA7XG5cdGNvbnN0IHMgPSBoc2xbMV0gLyAxMDA7XG5cdGNvbnN0IGwgPSBoc2xbMl0gLyAxMDA7XG5cdGxldCB0Mztcblx0bGV0IHZhbHVlO1xuXG5cdGlmIChzID09PSAwKSB7XG5cdFx0dmFsdWUgPSBsICogMjU1O1xuXHRcdHJldHVybiBbdmFsdWUsIHZhbHVlLCB2YWx1ZV07XG5cdH1cblxuXHRjb25zdCB0MiA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG5cblx0Y29uc3QgdDEgPSAyICogbCAtIHQyO1xuXG5cdGNvbnN0IHJnYiA9IFswLCAwLCAwXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHR0MyA9IGggKyAxIC8gMyAqIC0oaSAtIDEpO1xuXHRcdGlmICh0MyA8IDApIHtcblx0XHRcdHQzKys7XG5cdFx0fVxuXG5cdFx0aWYgKHQzID4gMSkge1xuXHRcdFx0dDMtLTtcblx0XHR9XG5cblx0XHRpZiAoNiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsdWUgPSB0MSArICh0MiAtIHQxKSAqIDYgKiB0Mztcblx0XHR9IGVsc2UgaWYgKDIgKiB0MyA8IDEpIHtcblx0XHRcdHZhbHVlID0gdDI7XG5cdFx0fSBlbHNlIGlmICgzICogdDMgPCAyKSB7XG5cdFx0XHR2YWx1ZSA9IHQxICsgKHQyIC0gdDEpICogKDIgLyAzIC0gdDMpICogNjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWUgPSB0MTtcblx0XHR9XG5cblx0XHRyZ2JbaV0gPSB2YWx1ZSAqIDI1NTtcblx0fVxuXG5cdHJldHVybiByZ2I7XG59O1xuXG5jb252ZXJ0LmhzbC5oc3YgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdGNvbnN0IGggPSBoc2xbMF07XG5cdGxldCBzID0gaHNsWzFdIC8gMTAwO1xuXHRsZXQgbCA9IGhzbFsyXSAvIDEwMDtcblx0bGV0IHNtaW4gPSBzO1xuXHRjb25zdCBsbWluID0gTWF0aC5tYXgobCwgMC4wMSk7XG5cblx0bCAqPSAyO1xuXHRzICo9IChsIDw9IDEpID8gbCA6IDIgLSBsO1xuXHRzbWluICo9IGxtaW4gPD0gMSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0Y29uc3QgdiA9IChsICsgcykgLyAyO1xuXHRjb25zdCBzdiA9IGwgPT09IDAgPyAoMiAqIHNtaW4pIC8gKGxtaW4gKyBzbWluKSA6ICgyICogcykgLyAobCArIHMpO1xuXG5cdHJldHVybiBbaCwgc3YgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YucmdiID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBoID0gaHN2WzBdIC8gNjA7XG5cdGNvbnN0IHMgPSBoc3ZbMV0gLyAxMDA7XG5cdGxldCB2ID0gaHN2WzJdIC8gMTAwO1xuXHRjb25zdCBoaSA9IE1hdGguZmxvb3IoaCkgJSA2O1xuXG5cdGNvbnN0IGYgPSBoIC0gTWF0aC5mbG9vcihoKTtcblx0Y29uc3QgcCA9IDI1NSAqIHYgKiAoMSAtIHMpO1xuXHRjb25zdCBxID0gMjU1ICogdiAqICgxIC0gKHMgKiBmKSk7XG5cdGNvbnN0IHQgPSAyNTUgKiB2ICogKDEgLSAocyAqICgxIC0gZikpKTtcblx0diAqPSAyNTU7XG5cblx0c3dpdGNoIChoaSkge1xuXHRcdGNhc2UgMDoge1xuXHRcdFx0cmV0dXJuIFt2LCB0LCBwXTtcblx0XHR9XG5cblx0XHRjYXNlIDE6IHtcblx0XHRcdHJldHVybiBbcSwgdiwgcF07XG5cdFx0fVxuXG5cdFx0Y2FzZSAyOiB7XG5cdFx0XHRyZXR1cm4gW3AsIHYsIHRdO1xuXHRcdH1cblxuXHRcdGNhc2UgMzoge1xuXHRcdFx0cmV0dXJuIFtwLCBxLCB2XTtcblx0XHR9XG5cblx0XHRjYXNlIDQ6IHtcblx0XHRcdHJldHVybiBbdCwgcCwgdl07XG5cdFx0fVxuXG5cdFx0Y2FzZSA1OiB7XG5cdFx0XHRyZXR1cm4gW3YsIHAsIHFdO1xuXHRcdH1cblx0fVxufTtcblxuY29udmVydC5oc3YuaHNsID0gZnVuY3Rpb24gKGhzdikge1xuXHRjb25zdCBoID0gaHN2WzBdO1xuXHRjb25zdCBzID0gaHN2WzFdIC8gMTAwO1xuXHRjb25zdCB2ID0gaHN2WzJdIC8gMTAwO1xuXHRjb25zdCB2bWluID0gTWF0aC5tYXgodiwgMC4wMSk7XG5cdGxldCBzbDtcblx0bGV0IGw7XG5cblx0bCA9ICgyIC0gcykgKiB2O1xuXHRjb25zdCBsbWluID0gKDIgLSBzKSAqIHZtaW47XG5cdHNsID0gcyAqIHZtaW47XG5cdHNsIC89IChsbWluIDw9IDEpID8gbG1pbiA6IDIgLSBsbWluO1xuXHRzbCA9IHNsIHx8IDA7XG5cdGwgLz0gMjtcblxuXHRyZXR1cm4gW2gsIHNsICogMTAwLCBsICogMTAwXTtcbn07XG5cbi8vIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy1jb2xvci8jaHdiLXRvLXJnYlxuY29udmVydC5od2IucmdiID0gZnVuY3Rpb24gKGh3Yikge1xuXHRjb25zdCBoID0gaHdiWzBdIC8gMzYwO1xuXHRsZXQgd2ggPSBod2JbMV0gLyAxMDA7XG5cdGxldCBibCA9IGh3YlsyXSAvIDEwMDtcblx0Y29uc3QgcmF0aW8gPSB3aCArIGJsO1xuXHRsZXQgZjtcblxuXHQvLyBXaCArIGJsIGNhbnQgYmUgPiAxXG5cdGlmIChyYXRpbyA+IDEpIHtcblx0XHR3aCAvPSByYXRpbztcblx0XHRibCAvPSByYXRpbztcblx0fVxuXG5cdGNvbnN0IGkgPSBNYXRoLmZsb29yKDYgKiBoKTtcblx0Y29uc3QgdiA9IDEgLSBibDtcblx0ZiA9IDYgKiBoIC0gaTtcblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRpZiAoKGkgJiAweDAxKSAhPT0gMCkge1xuXHRcdGYgPSAxIC0gZjtcblx0fVxuXG5cdGNvbnN0IG4gPSB3aCArIGYgKiAodiAtIHdoKTsgLy8gTGluZWFyIGludGVycG9sYXRpb25cblxuXHRsZXQgcjtcblx0bGV0IGc7XG5cdGxldCBiO1xuXHQvKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSxuby1tdWx0aS1zcGFjZXMsIGRlZmF1bHQtY2FzZS1sYXN0ICovXG5cdHN3aXRjaCAoaSkge1xuXHRcdGRlZmF1bHQ6XG5cdFx0Y2FzZSA2OlxuXHRcdGNhc2UgMDogeyByID0gdjsgIGcgPSBuOyAgYiA9IHdoOyBicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIDE6IHsgciA9IG47ICBnID0gdjsgIGIgPSB3aDsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSAyOiB7IHIgPSB3aDsgZyA9IHY7ICBiID0gbjsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSAzOiB7IHIgPSB3aDsgZyA9IG47ICBiID0gdjsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSA0OiB7IHIgPSBuOyAgZyA9IHdoOyBiID0gdjsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSA1OiB7IHIgPSB2OyAgZyA9IHdoOyBiID0gbjsgYnJlYWs7XG5cdFx0fVxuXHR9XG5cdC8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMtcGVyLWxpbmUsbm8tbXVsdGktc3BhY2VzLCBkZWZhdWx0LWNhc2UtbGFzdCAqL1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0LmNteWsucmdiID0gZnVuY3Rpb24gKGNteWspIHtcblx0Y29uc3QgYyA9IGNteWtbMF0gLyAxMDA7XG5cdGNvbnN0IG0gPSBjbXlrWzFdIC8gMTAwO1xuXHRjb25zdCB5ID0gY215a1syXSAvIDEwMDtcblx0Y29uc3QgayA9IGNteWtbM10gLyAxMDA7XG5cblx0Y29uc3QgciA9IDEgLSBNYXRoLm1pbigxLCBjICogKDEgLSBrKSArIGspO1xuXHRjb25zdCBnID0gMSAtIE1hdGgubWluKDEsIG0gKiAoMSAtIGspICsgayk7XG5cdGNvbnN0IGIgPSAxIC0gTWF0aC5taW4oMSwgeSAqICgxIC0gaykgKyBrKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoucmdiID0gZnVuY3Rpb24gKHh5eikge1xuXHRjb25zdCB4ID0geHl6WzBdIC8gMTAwO1xuXHRjb25zdCB5ID0geHl6WzFdIC8gMTAwO1xuXHRjb25zdCB6ID0geHl6WzJdIC8gMTAwO1xuXHRsZXQgcjtcblx0bGV0IGc7XG5cdGxldCBiO1xuXG5cdHIgPSAoeCAqIDMuMjQwXzQ1NF8yKSArICh5ICogLTEuNTM3XzEzOF81KSArICh6ICogLTAuNDk4XzUzMV80KTtcblx0ZyA9ICh4ICogLTAuOTY5XzI2NikgKyAoeSAqIDEuODc2XzAxMF84KSArICh6ICogMC4wNDFfNTU2KTtcblx0YiA9ICh4ICogMC4wNTVfNjQzXzQpICsgKHkgKiAtMC4yMDRfMDI1XzkpICsgKHogKiAxLjA1N18yMjVfMik7XG5cblx0Ly8gQXNzdW1lIHNSR0Jcblx0ciA9IHNyZ2JOb25saW5lYXJUcmFuc2Zvcm0ocik7XG5cdGcgPSBzcmdiTm9ubGluZWFyVHJhbnNmb3JtKGcpO1xuXHRiID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybShiKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoubGFiID0gZnVuY3Rpb24gKHh5eikge1xuXHRsZXQgeCA9IHh5elswXTtcblx0bGV0IHkgPSB4eXpbMV07XG5cdGxldCB6ID0geHl6WzJdO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gTEFCX0ZUID8gKHggKiogKDEgLyAzKSkgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gTEFCX0ZUID8gKHkgKiogKDEgLyAzKSkgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gTEFCX0ZUID8gKHogKiogKDEgLyAzKSkgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0Y29uc3QgbCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRjb25zdCBhID0gNTAwICogKHggLSB5KTtcblx0Y29uc3QgYiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQueHl6Lm9rbGFiID0gZnVuY3Rpb24gKHh5eikge1xuXHRjb25zdCB4ID0geHl6WzBdIC8gMTAwO1xuXHRjb25zdCB5ID0geHl6WzFdIC8gMTAwO1xuXHRjb25zdCB6ID0geHl6WzJdIC8gMTAwO1xuXG5cdGNvbnN0IGxwID0gTWF0aC5jYnJ0KDAuODE4XzkzM18wMTBfMSAqIHggKyAwLjM2MV84NjZfNzQyXzQgKiB5IC0gMC4xMjhfODU5XzcxM183ICogeik7XG5cdGNvbnN0IG1wID0gTWF0aC5jYnJ0KDAuMDMyXzk4NF81NDNfNiAqIHggKyAwLjkyOV8zMTFfODcxXzUgKiB5ICsgMC4wMzZfMTQ1XzYzOF83ICogeik7XG5cdGNvbnN0IHNwID0gTWF0aC5jYnJ0KDAuMDQ4XzIwMF8zMDFfOCAqIHggKyAwLjI2NF8zNjZfMjY5XzEgKiB5ICsgMC42MzNfODUxXzcwNyAqIHopO1xuXG5cdGNvbnN0IGwgPSAwLjIxMF80NTRfMjU1XzMgKiBscCArIDAuNzkzXzYxN183ODUgKiBtcCAtIDAuMDA0XzA3Ml8wNDZfOCAqIHNwO1xuXHRjb25zdCBhID0gMS45NzdfOTk4XzQ5NV8xICogbHAgLSAyLjQyOF81OTJfMjA1ICogbXAgKyAwLjQ1MF81OTNfNzA5XzkgKiBzcDtcblx0Y29uc3QgYiA9IDAuMDI1XzkwNF8wMzdfMSAqIGxwICsgMC43ODJfNzcxXzc2Nl8yICogbXAgLSAwLjgwOF82NzVfNzY2ICogc3A7XG5cblx0cmV0dXJuIFtsICogMTAwLCBhICogMTAwLCBiICogMTAwXTtcbn07XG5cbmNvbnZlcnQub2tsYWIub2tsY2ggPSBmdW5jdGlvbiAob2tsYWIpIHtcblx0cmV0dXJuIGNvbnZlcnQubGFiLmxjaChva2xhYik7XG59O1xuXG5jb252ZXJ0Lm9rbGFiLnh5eiA9IGZ1bmN0aW9uIChva2xhYikge1xuXHRjb25zdCBsbCA9IG9rbGFiWzBdIC8gMTAwO1xuXHRjb25zdCBhID0gb2tsYWJbMV0gLyAxMDA7XG5cdGNvbnN0IGIgPSBva2xhYlsyXSAvIDEwMDtcblxuXHRjb25zdCBsID0gKDAuOTk5Xzk5OV85OTggKiBsbCArIDAuMzk2XzMzN183OTIgKiBhICsgMC4yMTVfODAzXzc1OCAqIGIpICoqIDM7XG5cdGNvbnN0IG0gPSAoMS4wMDBfMDAwXzAwOCAqIGxsIC0gMC4xMDVfNTYxXzM0MiAqIGEgLSAwLjA2M184NTRfMTc1ICogYikgKiogMztcblx0Y29uc3QgcyA9ICgxLjAwMF8wMDBfMDU1ICogbGwgLSAwLjA4OV80ODRfMTgyICogYSAtIDEuMjkxXzQ4NV81MzggKiBiKSAqKiAzO1xuXG5cdGNvbnN0IHggPSAxLjIyN18wMTNfODUxICogbCAtIDAuNTU3Xzc5OV85OCAqIG0gKyAwLjI4MV8yNTZfMTQ5ICogcztcblx0Y29uc3QgeSA9IC0wLjA0MF81ODBfMTc4ICogbCArIDEuMTEyXzI1Nl84NyAqIG0gLSAwLjA3MV82NzZfNjc5ICogcztcblx0Y29uc3QgeiA9IC0wLjA3Nl8zODFfMjg1ICogbCAtIDAuNDIxXzQ4MV85NzggKiBtICsgMS41ODZfMTYzXzIyICogcztcblxuXHRyZXR1cm4gW3ggKiAxMDAsIHkgKiAxMDAsIHogKiAxMDBdO1xufTtcblxuY29udmVydC5va2xhYi5yZ2IgPSBmdW5jdGlvbiAob2tsYWIpIHtcblx0Y29uc3QgbGwgPSBva2xhYlswXSAvIDEwMDtcblx0Y29uc3QgYWEgPSBva2xhYlsxXSAvIDEwMDtcblx0Y29uc3QgYmIgPSBva2xhYlsyXSAvIDEwMDtcblxuXHRjb25zdCBsID0gKGxsICsgMC4zOTZfMzM3Xzc3N180ICogYWEgKyAwLjIxNV84MDNfNzU3XzMgKiBiYikgKiogMztcblx0Y29uc3QgbSA9IChsbCAtIDAuMTA1XzU2MV8zNDVfOCAqIGFhIC0gMC4wNjNfODU0XzE3Ml84ICogYmIpICoqIDM7XG5cdGNvbnN0IHMgPSAobGwgLSAwLjA4OV80ODRfMTc3XzUgKiBhYSAtIDEuMjkxXzQ4NV81NDggKiBiYikgKiogMztcblxuXHQvLyBBc3N1bWUgc1JHQlxuXHRjb25zdCByID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybSg0LjA3Nl83NDFfNjYyXzEgKiBsIC0gMy4zMDdfNzExXzU5MV8zICogbSArIDAuMjMwXzk2OV85MjlfMiAqIHMpO1xuXHRjb25zdCBnID0gc3JnYk5vbmxpbmVhclRyYW5zZm9ybSgtMS4yNjhfNDM4XzAwNF82ICogbCArIDIuNjA5Xzc1N180MDFfMSAqIG0gLSAwLjM0MV8zMTlfMzk2XzUgKiBzKTtcblx0Y29uc3QgYiA9IHNyZ2JOb25saW5lYXJUcmFuc2Zvcm0oLTAuMDA0XzE5Nl8wODZfMyAqIGwgLSAwLjcwM180MThfNjE0XzcgKiBtICsgMS43MDdfNjE0XzcwMSAqIHMpO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lm9rbGNoLm9rbGFiID0gZnVuY3Rpb24gKG9rbGNoKSB7XG5cdHJldHVybiBjb252ZXJ0LmxjaC5sYWIob2tsY2gpO1xufTtcblxuY29udmVydC5sYWIueHl6ID0gZnVuY3Rpb24gKGxhYikge1xuXHRjb25zdCBsID0gbGFiWzBdO1xuXHRjb25zdCBhID0gbGFiWzFdO1xuXHRjb25zdCBiID0gbGFiWzJdO1xuXHRsZXQgeDtcblx0bGV0IHk7XG5cdGxldCB6O1xuXG5cdHkgPSAobCArIDE2KSAvIDExNjtcblx0eCA9IGEgLyA1MDAgKyB5O1xuXHR6ID0geSAtIGIgLyAyMDA7XG5cblx0Y29uc3QgeTIgPSB5ICoqIDM7XG5cdGNvbnN0IHgyID0geCAqKiAzO1xuXHRjb25zdCB6MiA9IHogKiogMztcblx0eSA9IHkyID4gTEFCX0ZUID8geTIgOiAoeSAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR4ID0geDIgPiBMQUJfRlQgPyB4MiA6ICh4IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHogPSB6MiA+IExBQl9GVCA/IHoyIDogKHogLSAxNiAvIDExNikgLyA3Ljc4NztcblxuXHQvLyBJbGx1bWluYW50IEQ2NSBYWVogVHJpc3RyaW11bHVzIFZhbHVlc1xuXHQvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DSUVfMTkzMV9jb2xvcl9zcGFjZVxuXHR4ICo9IDk1LjA0Nztcblx0eSAqPSAxMDA7XG5cdHogKj0gMTA4Ljg4MztcblxuXHRyZXR1cm4gW3gsIHksIHpdO1xufTtcblxuY29udmVydC5sYWIubGNoID0gZnVuY3Rpb24gKGxhYikge1xuXHRjb25zdCBsID0gbGFiWzBdO1xuXHRjb25zdCBhID0gbGFiWzFdO1xuXHRjb25zdCBiID0gbGFiWzJdO1xuXHRsZXQgaDtcblxuXHRjb25zdCBociA9IE1hdGguYXRhbjIoYiwgYSk7XG5cdGggPSBociAqIDM2MCAvIDIgLyBNYXRoLlBJO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0Y29uc3QgYyA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcblxuXHRyZXR1cm4gW2wsIGMsIGhdO1xufTtcblxuY29udmVydC5sY2gubGFiID0gZnVuY3Rpb24gKGxjaCkge1xuXHRjb25zdCBsID0gbGNoWzBdO1xuXHRjb25zdCBjID0gbGNoWzFdO1xuXHRjb25zdCBoID0gbGNoWzJdO1xuXG5cdGNvbnN0IGhyID0gaCAvIDM2MCAqIDIgKiBNYXRoLlBJO1xuXHRjb25zdCBhID0gYyAqIE1hdGguY29zKGhyKTtcblx0Y29uc3QgYiA9IGMgKiBNYXRoLnNpbihocik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzLCBzYXR1cmF0aW9uID0gbnVsbCkge1xuXHRjb25zdCBbciwgZywgYl0gPSBhcmdzO1xuXHRsZXQgdmFsdWUgPSBzYXR1cmF0aW9uID09PSBudWxsID8gY29udmVydC5yZ2IuaHN2KGFyZ3MpWzJdIDogc2F0dXJhdGlvbjsgLy8gSHN2IC0+IGFuc2kxNiBvcHRpbWl6YXRpb25cblxuXHR2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUgLyA1MCk7XG5cblx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0cmV0dXJuIDMwO1xuXHR9XG5cblx0bGV0IGFuc2kgPSAzMFxuXHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0XHQrICgoTWF0aC5yb3VuZChiIC8gMjU1KSA8PCAyKVxuXHRcdHwgKE1hdGgucm91bmQoZyAvIDI1NSkgPDwgMSlcblx0XHR8IE1hdGgucm91bmQociAvIDI1NSkpO1xuXHRcdC8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuXG5cdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdGFuc2kgKz0gNjA7XG5cdH1cblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuaHN2LmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIE9wdGltaXphdGlvbiBoZXJlOyB3ZSBhbHJlYWR5IGtub3cgdGhlIHZhbHVlIGFuZCBkb24ndCBuZWVkIHRvIGdldFxuXHQvLyBpdCBjb252ZXJ0ZWQgZm9yIHVzLlxuXHRyZXR1cm4gY29udmVydC5yZ2IuYW5zaTE2KGNvbnZlcnQuaHN2LnJnYihhcmdzKSwgYXJnc1syXSk7XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMjU2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Y29uc3QgciA9IGFyZ3NbMF07XG5cdGNvbnN0IGcgPSBhcmdzWzFdO1xuXHRjb25zdCBiID0gYXJnc1syXTtcblxuXHQvLyBXZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0aWYgKHIgPj4gNCA9PT0gZyA+PiA0ICYmIGcgPj4gNCA9PT0gYiA+PiA0KSB7XG5cdFx0aWYgKHIgPCA4KSB7XG5cdFx0XHRyZXR1cm4gMTY7XG5cdFx0fVxuXG5cdFx0aWYgKHIgPiAyNDgpIHtcblx0XHRcdHJldHVybiAyMzE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGgucm91bmQoKChyIC0gOCkgLyAyNDcpICogMjQpICsgMjMyO1xuXHR9XG5cblx0Y29uc3QgYW5zaSA9IDE2XG5cdFx0KyAoMzYgKiBNYXRoLnJvdW5kKHIgLyAyNTUgKiA1KSlcblx0XHQrICg2ICogTWF0aC5yb3VuZChnIC8gMjU1ICogNSkpXG5cdFx0KyBNYXRoLnJvdW5kKGIgLyAyNTUgKiA1KTtcblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuYW5zaTE2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdGFyZ3MgPSBhcmdzWzBdO1xuXG5cdGxldCBjb2xvciA9IGFyZ3MgJSAxMDtcblxuXHQvLyBIYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChjb2xvciA9PT0gMCB8fCBjb2xvciA9PT0gNykge1xuXHRcdGlmIChhcmdzID4gNTApIHtcblx0XHRcdGNvbG9yICs9IDMuNTtcblx0XHR9XG5cblx0XHRjb2xvciA9IGNvbG9yIC8gMTAuNSAqIDI1NTtcblxuXHRcdHJldHVybiBbY29sb3IsIGNvbG9yLCBjb2xvcl07XG5cdH1cblxuXHRjb25zdCBtdWx0ID0gKE1hdGgudHJ1bmMoYXJncyA+IDUwKSArIDEpICogMC41O1xuXHQvKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cdGNvbnN0IHIgPSAoKGNvbG9yICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0Y29uc3QgZyA9ICgoKGNvbG9yID4+IDEpICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0Y29uc3QgYiA9ICgoKGNvbG9yID4+IDIpICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQuYW5zaTI1Ni5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRhcmdzID0gYXJnc1swXTtcblxuXHQvLyBIYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChhcmdzID49IDIzMikge1xuXHRcdGNvbnN0IGMgPSAoYXJncyAtIDIzMikgKiAxMCArIDg7XG5cdFx0cmV0dXJuIFtjLCBjLCBjXTtcblx0fVxuXG5cdGFyZ3MgLT0gMTY7XG5cblx0bGV0IHJlbTtcblx0Y29uc3QgciA9IE1hdGguZmxvb3IoYXJncyAvIDM2KSAvIDUgKiAyNTU7XG5cdGNvbnN0IGcgPSBNYXRoLmZsb29yKChyZW0gPSBhcmdzICUgMzYpIC8gNikgLyA1ICogMjU1O1xuXHRjb25zdCBiID0gKHJlbSAlIDYpIC8gNSAqIDI1NTtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5yZ2IuaGV4ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRjb25zdCBpbnRlZ2VyID0gKChNYXRoLnJvdW5kKGFyZ3NbMF0pICYgMHhGRikgPDwgMTYpXG5cdFx0KyAoKE1hdGgucm91bmQoYXJnc1sxXSkgJiAweEZGKSA8PCA4KVxuXHRcdCsgKE1hdGgucm91bmQoYXJnc1syXSkgJiAweEZGKTtcblx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cblx0Y29uc3Qgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnNsaWNlKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5oZXgucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Y29uc3QgbWF0Y2ggPSBhcmdzLnRvU3RyaW5nKDE2KS5tYXRjaCgvW2EtZlxcZF17Nn18W2EtZlxcZF17M30vaSk7XG5cdGlmICghbWF0Y2gpIHtcblx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHR9XG5cblx0bGV0IGNvbG9yU3RyaW5nID0gbWF0Y2hbMF07XG5cblx0aWYgKG1hdGNoWzBdLmxlbmd0aCA9PT0gMykge1xuXHRcdGNvbG9yU3RyaW5nID0gWy4uLmNvbG9yU3RyaW5nXS5tYXAoY2hhciA9PiBjaGFyICsgY2hhcikuam9pbignJyk7XG5cdH1cblxuXHRjb25zdCBpbnRlZ2VyID0gTnVtYmVyLnBhcnNlSW50KGNvbG9yU3RyaW5nLCAxNik7XG5cdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0Y29uc3QgciA9IChpbnRlZ2VyID4+IDE2KSAmIDB4RkY7XG5cdGNvbnN0IGcgPSAoaW50ZWdlciA+PiA4KSAmIDB4RkY7XG5cdGNvbnN0IGIgPSBpbnRlZ2VyICYgMHhGRjtcblx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhjZyA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgciA9IHJnYlswXSAvIDI1NTtcblx0Y29uc3QgZyA9IHJnYlsxXSAvIDI1NTtcblx0Y29uc3QgYiA9IHJnYlsyXSAvIDI1NTtcblx0Y29uc3QgbWF4ID0gTWF0aC5tYXgoTWF0aC5tYXgociwgZyksIGIpO1xuXHRjb25zdCBtaW4gPSBNYXRoLm1pbihNYXRoLm1pbihyLCBnKSwgYik7XG5cdGNvbnN0IGNocm9tYSA9IChtYXggLSBtaW4pO1xuXHRsZXQgaHVlO1xuXG5cdGNvbnN0IGdyYXlzY2FsZSA9IGNocm9tYSA8IDEgPyBtaW4gLyAoMSAtIGNocm9tYSkgOiAwO1xuXG5cdGlmIChjaHJvbWEgPD0gMCkge1xuXHRcdGh1ZSA9IDA7XG5cdH0gZWxzZSBpZiAobWF4ID09PSByKSB7XG5cdFx0aHVlID0gKChnIC0gYikgLyBjaHJvbWEpICUgNjtcblx0fSBlbHNlIGlmIChtYXggPT09IGcpIHtcblx0XHRodWUgPSAyICsgKGIgLSByKSAvIGNocm9tYTtcblx0fSBlbHNlIHtcblx0XHRodWUgPSA0ICsgKHIgLSBnKSAvIGNocm9tYTtcblx0fVxuXG5cdGh1ZSAvPSA2O1xuXHRodWUgJT0gMTtcblxuXHRyZXR1cm4gW2h1ZSAqIDM2MCwgY2hyb21hICogMTAwLCBncmF5c2NhbGUgKiAxMDBdO1xufTtcblxuY29udmVydC5oc2wuaGNnID0gZnVuY3Rpb24gKGhzbCkge1xuXHRjb25zdCBzID0gaHNsWzFdIC8gMTAwO1xuXHRjb25zdCBsID0gaHNsWzJdIC8gMTAwO1xuXG5cdGNvbnN0IGMgPSBsIDwgMC41ID8gKDIgKiBzICogbCkgOiAoMiAqIHMgKiAoMSAtIGwpKTtcblxuXHRsZXQgZiA9IDA7XG5cdGlmIChjIDwgMSkge1xuXHRcdGYgPSAobCAtIDAuNSAqIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHNsWzBdLCBjICogMTAwLCBmICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHN2LmhjZyA9IGZ1bmN0aW9uIChoc3YpIHtcblx0Y29uc3QgcyA9IGhzdlsxXSAvIDEwMDtcblx0Y29uc3QgdiA9IGhzdlsyXSAvIDEwMDtcblxuXHRjb25zdCBjID0gcyAqIHY7XG5cdGxldCBmID0gMDtcblxuXHRpZiAoYyA8IDEpIHtcblx0XHRmID0gKHYgLSBjKSAvICgxIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2hzdlswXSwgYyAqIDEwMCwgZiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5yZ2IgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdGNvbnN0IGggPSBoY2dbMF0gLyAzNjA7XG5cdGNvbnN0IGMgPSBoY2dbMV0gLyAxMDA7XG5cdGNvbnN0IGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0aWYgKGMgPT09IDApIHtcblx0XHRyZXR1cm4gW2cgKiAyNTUsIGcgKiAyNTUsIGcgKiAyNTVdO1xuXHR9XG5cblx0Y29uc3QgcHVyZSA9IFswLCAwLCAwXTtcblx0Y29uc3QgaGkgPSAoaCAlIDEpICogNjtcblx0Y29uc3QgdiA9IGhpICUgMTtcblx0Y29uc3QgdyA9IDEgLSB2O1xuXHRsZXQgbWcgPSAwO1xuXG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzLXBlci1saW5lICovXG5cdHN3aXRjaCAoTWF0aC5mbG9vcihoaSkpIHtcblx0XHRjYXNlIDA6IHtcblx0XHRcdHB1cmVbMF0gPSAxOyBwdXJlWzFdID0gdjsgcHVyZVsyXSA9IDA7IGJyZWFrO1xuXHRcdH1cblxuXHRcdGNhc2UgMToge1xuXHRcdFx0cHVyZVswXSA9IHc7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0Y2FzZSAyOiB7XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSB2OyBicmVhaztcblx0XHR9XG5cblx0XHRjYXNlIDM6IHtcblx0XHRcdHB1cmVbMF0gPSAwOyBwdXJlWzFdID0gdzsgcHVyZVsyXSA9IDE7IGJyZWFrO1xuXHRcdH1cblxuXHRcdGNhc2UgNDoge1xuXHRcdFx0cHVyZVswXSA9IHY7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0fVxuXG5cdFx0ZGVmYXVsdDoge1xuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gdztcblx0XHR9XG5cdH1cblx0LyogZXNsaW50LWVuYWJsZSBtYXgtc3RhdGVtZW50cy1wZXItbGluZSAqL1xuXG5cdG1nID0gKDEgLSBjKSAqIGc7XG5cblx0cmV0dXJuIFtcblx0XHQoYyAqIHB1cmVbMF0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzFdICsgbWcpICogMjU1LFxuXHRcdChjICogcHVyZVsyXSArIG1nKSAqIDI1NSxcblx0XTtcbn07XG5cbmNvbnZlcnQuaGNnLmhzdiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHRjb25zdCB2ID0gYyArIGcgKiAoMSAtIGMpO1xuXHRsZXQgZiA9IDA7XG5cblx0aWYgKHYgPiAwKSB7XG5cdFx0ZiA9IGMgLyB2O1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIGYgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHNsID0gZnVuY3Rpb24gKGhjZykge1xuXHRjb25zdCBjID0gaGNnWzFdIC8gMTAwO1xuXHRjb25zdCBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdGNvbnN0IGwgPSBnICogKDEgLSBjKSArIDAuNSAqIGM7XG5cdGxldCBzID0gMDtcblxuXHRpZiAobCA+IDAgJiYgbCA8IDAuNSkge1xuXHRcdHMgPSBjIC8gKDIgKiBsKTtcblx0fSBlbHNlIGlmIChsID49IDAuNSAmJiBsIDwgMSkge1xuXHRcdHMgPSBjIC8gKDIgKiAoMSAtIGwpKTtcblx0fVxuXG5cdHJldHVybiBbaGNnWzBdLCBzICogMTAwLCBsICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLmh3YiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0Y29uc3QgYyA9IGhjZ1sxXSAvIDEwMDtcblx0Y29uc3QgZyA9IGhjZ1syXSAvIDEwMDtcblx0Y29uc3QgdiA9IGMgKyBnICogKDEgLSBjKTtcblx0cmV0dXJuIFtoY2dbMF0sICh2IC0gYykgKiAxMDAsICgxIC0gdikgKiAxMDBdO1xufTtcblxuY29udmVydC5od2IuaGNnID0gZnVuY3Rpb24gKGh3Yikge1xuXHRjb25zdCB3ID0gaHdiWzFdIC8gMTAwO1xuXHRjb25zdCBiID0gaHdiWzJdIC8gMTAwO1xuXHRjb25zdCB2ID0gMSAtIGI7XG5cdGNvbnN0IGMgPSB2IC0gdztcblx0bGV0IGcgPSAwO1xuXG5cdGlmIChjIDwgMSkge1xuXHRcdGcgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHdiWzBdLCBjICogMTAwLCBnICogMTAwXTtcbn07XG5cbmNvbnZlcnQuYXBwbGUucmdiID0gZnVuY3Rpb24gKGFwcGxlKSB7XG5cdHJldHVybiBbKGFwcGxlWzBdIC8gNjVfNTM1KSAqIDI1NSwgKGFwcGxlWzFdIC8gNjVfNTM1KSAqIDI1NSwgKGFwcGxlWzJdIC8gNjVfNTM1KSAqIDI1NV07XG59O1xuXG5jb252ZXJ0LnJnYi5hcHBsZSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0cmV0dXJuIFsocmdiWzBdIC8gMjU1KSAqIDY1XzUzNSwgKHJnYlsxXSAvIDI1NSkgKiA2NV81MzUsIChyZ2JbMl0gLyAyNTUpICogNjVfNTM1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gW2FyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTVdO1xufTtcblxuY29udmVydC5ncmF5LmhzbCA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbMCwgMCwgYXJnc1swXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHN2ID0gY29udmVydC5ncmF5LmhzbDtcblxuY29udmVydC5ncmF5Lmh3YiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMTAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5jbXlrID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAwLCAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5sYWIgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gW2dyYXlbMF0sIDAsIDBdO1xufTtcblxuY29udmVydC5ncmF5LmhleCA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0Y29uc3QgdmFsdWUgPSBNYXRoLnJvdW5kKGdyYXlbMF0gLyAxMDAgKiAyNTUpICYgMHhGRjtcblx0Y29uc3QgaW50ZWdlciA9ICh2YWx1ZSA8PCAxNikgKyAodmFsdWUgPDwgOCkgKyB2YWx1ZTtcblx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cblx0Y29uc3Qgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnNsaWNlKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5yZ2IuZ3JheSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0Y29uc3QgdmFsdWUgPSAocmdiWzBdICsgcmdiWzFdICsgcmdiWzJdKSAvIDM7XG5cdHJldHVybiBbdmFsdWUgLyAyNTUgKiAxMDBdO1xufTtcbiIsImltcG9ydCBjb252ZXJzaW9ucyBmcm9tICcuL2NvbnZlcnNpb25zLmpzJztcbmltcG9ydCByb3V0ZSBmcm9tICcuL3JvdXRlLmpzJztcblxuY29uc3QgY29udmVydCA9IHt9O1xuXG5jb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9ucyk7XG5cbmZ1bmN0aW9uIHdyYXBSYXcoZm4pIHtcblx0Y29uc3Qgd3JhcHBlZEZuID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRjb25zdCBhcmcwID0gYXJnc1swXTtcblx0XHRpZiAoYXJnMCA9PT0gdW5kZWZpbmVkIHx8IGFyZzAgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmcwO1xuXHRcdH1cblxuXHRcdGlmIChhcmcwLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBhcmcwO1xuXHRcdH1cblxuXHRcdHJldHVybiBmbihhcmdzKTtcblx0fTtcblxuXHQvLyBQcmVzZXJ2ZSAuY29udmVyc2lvbiBwcm9wZXJ0eSBpZiB0aGVyZSBpcyBvbmVcblx0aWYgKCdjb252ZXJzaW9uJyBpbiBmbikge1xuXHRcdHdyYXBwZWRGbi5jb252ZXJzaW9uID0gZm4uY29udmVyc2lvbjtcblx0fVxuXG5cdHJldHVybiB3cmFwcGVkRm47XG59XG5cbmZ1bmN0aW9uIHdyYXBSb3VuZGVkKGZuKSB7XG5cdGNvbnN0IHdyYXBwZWRGbiA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0Y29uc3QgYXJnMCA9IGFyZ3NbMF07XG5cblx0XHRpZiAoYXJnMCA9PT0gdW5kZWZpbmVkIHx8IGFyZzAgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmcwO1xuXHRcdH1cblxuXHRcdGlmIChhcmcwLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBhcmcwO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdCA9IGZuKGFyZ3MpO1xuXG5cdFx0Ly8gV2UncmUgYXNzdW1pbmcgdGhlIHJlc3VsdCBpcyBhbiBhcnJheSBoZXJlLlxuXHRcdC8vIHNlZSBub3RpY2UgaW4gY29udmVyc2lvbnMuanM7IGRvbid0IHVzZSBib3ggdHlwZXNcblx0XHQvLyBpbiBjb252ZXJzaW9uIGZ1bmN0aW9ucy5cblx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAobGV0IHtsZW5ndGh9ID0gcmVzdWx0LCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdC8vIFByZXNlcnZlIC5jb252ZXJzaW9uIHByb3BlcnR5IGlmIHRoZXJlIGlzIG9uZVxuXHRpZiAoJ2NvbnZlcnNpb24nIGluIGZuKSB7XG5cdFx0d3JhcHBlZEZuLmNvbnZlcnNpb24gPSBmbi5jb252ZXJzaW9uO1xuXHR9XG5cblx0cmV0dXJuIHdyYXBwZWRGbjtcbn1cblxuZm9yIChjb25zdCBmcm9tTW9kZWwgb2YgbW9kZWxzKSB7XG5cdGNvbnZlcnRbZnJvbU1vZGVsXSA9IHt9O1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5jaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmxhYmVsc30pO1xuXG5cdGNvbnN0IHJvdXRlcyA9IHJvdXRlKGZyb21Nb2RlbCk7XG5cdGNvbnN0IHJvdXRlTW9kZWxzID0gT2JqZWN0LmtleXMocm91dGVzKTtcblxuXHRmb3IgKGNvbnN0IHRvTW9kZWwgb2Ygcm91dGVNb2RlbHMpIHtcblx0XHRjb25zdCBmbiA9IHJvdXRlc1t0b01vZGVsXTtcblxuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXSA9IHdyYXBSb3VuZGVkKGZuKTtcblx0XHRjb252ZXJ0W2Zyb21Nb2RlbF1bdG9Nb2RlbF0ucmF3ID0gd3JhcFJhdyhmbik7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29udmVydDtcbiIsImltcG9ydCBjb252ZXJzaW9ucyBmcm9tICcuL2NvbnZlcnNpb25zLmpzJztcblxuLypcblx0VGhpcyBmdW5jdGlvbiByb3V0ZXMgYSBtb2RlbCB0byBhbGwgb3RoZXIgbW9kZWxzLlxuXG5cdGFsbCBmdW5jdGlvbnMgdGhhdCBhcmUgcm91dGVkIGhhdmUgYSBwcm9wZXJ0eSBgLmNvbnZlcnNpb25gIGF0dGFjaGVkXG5cdHRvIHRoZSByZXR1cm5lZCBzeW50aGV0aWMgZnVuY3Rpb24uIFRoaXMgcHJvcGVydHkgaXMgYW4gYXJyYXlcblx0b2Ygc3RyaW5ncywgZWFjaCB3aXRoIHRoZSBzdGVwcyBpbiBiZXR3ZWVuIHRoZSAnZnJvbScgYW5kICd0bydcblx0Y29sb3IgbW9kZWxzIChpbmNsdXNpdmUpLlxuXG5cdGNvbnZlcnNpb25zIHRoYXQgYXJlIG5vdCBwb3NzaWJsZSBzaW1wbHkgYXJlIG5vdCBpbmNsdWRlZC5cbiovXG5cbmZ1bmN0aW9uIGJ1aWxkR3JhcGgoKSB7XG5cdGNvbnN0IGdyYXBoID0ge307XG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS9vYmplY3Qta2V5cy12cy1mb3ItaW4td2l0aC1jbG9zdXJlLzNcblx0Y29uc3QgbW9kZWxzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnMpO1xuXG5cdGZvciAobGV0IHtsZW5ndGh9ID0gbW9kZWxzLCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0Z3JhcGhbbW9kZWxzW2ldXSA9IHtcblx0XHRcdC8vIGh0dHA6Ly9qc3BlcmYuY29tLzEtdnMtaW5maW5pdHlcblx0XHRcdC8vIG1pY3JvLW9wdCwgYnV0IHRoaXMgaXMgc2ltcGxlLlxuXHRcdFx0ZGlzdGFuY2U6IC0xLFxuXHRcdFx0cGFyZW50OiBudWxsLFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gZ3JhcGg7XG59XG5cbi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JyZWFkdGgtZmlyc3Rfc2VhcmNoXG5mdW5jdGlvbiBkZXJpdmVCRlMoZnJvbU1vZGVsKSB7XG5cdGNvbnN0IGdyYXBoID0gYnVpbGRHcmFwaCgpO1xuXHRjb25zdCBxdWV1ZSA9IFtmcm9tTW9kZWxdOyAvLyBVbnNoaWZ0IC0+IHF1ZXVlIC0+IHBvcFxuXG5cdGdyYXBoW2Zyb21Nb2RlbF0uZGlzdGFuY2UgPSAwO1xuXG5cdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IHF1ZXVlLnBvcCgpO1xuXHRcdGNvbnN0IGFkamFjZW50cyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zW2N1cnJlbnRdKTtcblxuXHRcdGZvciAobGV0IHtsZW5ndGh9ID0gYWRqYWNlbnRzLCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBhZGphY2VudCA9IGFkamFjZW50c1tpXTtcblx0XHRcdGNvbnN0IG5vZGUgPSBncmFwaFthZGphY2VudF07XG5cblx0XHRcdGlmIChub2RlLmRpc3RhbmNlID09PSAtMSkge1xuXHRcdFx0XHRub2RlLmRpc3RhbmNlID0gZ3JhcGhbY3VycmVudF0uZGlzdGFuY2UgKyAxO1xuXHRcdFx0XHRub2RlLnBhcmVudCA9IGN1cnJlbnQ7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoYWRqYWNlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuZnVuY3Rpb24gbGluayhmcm9tLCB0bykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRyZXR1cm4gdG8oZnJvbShhcmdzKSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKSB7XG5cdGNvbnN0IHBhdGggPSBbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50LCB0b01vZGVsXTtcblx0bGV0IGZuID0gY29udmVyc2lvbnNbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50XVt0b01vZGVsXTtcblxuXHRsZXQgY3VyID0gZ3JhcGhbdG9Nb2RlbF0ucGFyZW50O1xuXHR3aGlsZSAoZ3JhcGhbY3VyXS5wYXJlbnQpIHtcblx0XHRwYXRoLnVuc2hpZnQoZ3JhcGhbY3VyXS5wYXJlbnQpO1xuXHRcdGZuID0gbGluayhjb252ZXJzaW9uc1tncmFwaFtjdXJdLnBhcmVudF1bY3VyXSwgZm4pO1xuXHRcdGN1ciA9IGdyYXBoW2N1cl0ucGFyZW50O1xuXHR9XG5cblx0Zm4uY29udmVyc2lvbiA9IHBhdGg7XG5cdHJldHVybiBmbjtcbn1cblxuZnVuY3Rpb24gcm91dGUoZnJvbU1vZGVsKSB7XG5cdGNvbnN0IGdyYXBoID0gZGVyaXZlQkZTKGZyb21Nb2RlbCk7XG5cdGNvbnN0IGNvbnZlcnNpb24gPSB7fTtcblxuXHRjb25zdCBtb2RlbHMgPSBPYmplY3Qua2V5cyhncmFwaCk7XG5cdGZvciAobGV0IHtsZW5ndGh9ID0gbW9kZWxzLCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgdG9Nb2RlbCA9IG1vZGVsc1tpXTtcblx0XHRjb25zdCBub2RlID0gZ3JhcGhbdG9Nb2RlbF07XG5cblx0XHRpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblx0XHRcdC8vIE5vIHBvc3NpYmxlIGNvbnZlcnNpb24sIG9yIHRoaXMgbm9kZSBpcyB0aGUgc291cmNlIG1vZGVsLlxuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29udmVyc2lvblt0b01vZGVsXSA9IHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKTtcblx0fVxuXG5cdHJldHVybiBjb252ZXJzaW9uO1xufVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZTtcbiIsImNvbnN0IGNvbG9ycyA9IHtcblx0YWxpY2VibHVlOiBbMjQwLCAyNDgsIDI1NV0sXG5cdGFudGlxdWV3aGl0ZTogWzI1MCwgMjM1LCAyMTVdLFxuXHRhcXVhOiBbMCwgMjU1LCAyNTVdLFxuXHRhcXVhbWFyaW5lOiBbMTI3LCAyNTUsIDIxMl0sXG5cdGF6dXJlOiBbMjQwLCAyNTUsIDI1NV0sXG5cdGJlaWdlOiBbMjQ1LCAyNDUsIDIyMF0sXG5cdGJpc3F1ZTogWzI1NSwgMjI4LCAxOTZdLFxuXHRibGFjazogWzAsIDAsIDBdLFxuXHRibGFuY2hlZGFsbW9uZDogWzI1NSwgMjM1LCAyMDVdLFxuXHRibHVlOiBbMCwgMCwgMjU1XSxcblx0Ymx1ZXZpb2xldDogWzEzOCwgNDMsIDIyNl0sXG5cdGJyb3duOiBbMTY1LCA0MiwgNDJdLFxuXHRidXJseXdvb2Q6IFsyMjIsIDE4NCwgMTM1XSxcblx0Y2FkZXRibHVlOiBbOTUsIDE1OCwgMTYwXSxcblx0Y2hhcnRyZXVzZTogWzEyNywgMjU1LCAwXSxcblx0Y2hvY29sYXRlOiBbMjEwLCAxMDUsIDMwXSxcblx0Y29yYWw6IFsyNTUsIDEyNywgODBdLFxuXHRjb3JuZmxvd2VyYmx1ZTogWzEwMCwgMTQ5LCAyMzddLFxuXHRjb3Juc2lsazogWzI1NSwgMjQ4LCAyMjBdLFxuXHRjcmltc29uOiBbMjIwLCAyMCwgNjBdLFxuXHRjeWFuOiBbMCwgMjU1LCAyNTVdLFxuXHRkYXJrYmx1ZTogWzAsIDAsIDEzOV0sXG5cdGRhcmtjeWFuOiBbMCwgMTM5LCAxMzldLFxuXHRkYXJrZ29sZGVucm9kOiBbMTg0LCAxMzQsIDExXSxcblx0ZGFya2dyYXk6IFsxNjksIDE2OSwgMTY5XSxcblx0ZGFya2dyZWVuOiBbMCwgMTAwLCAwXSxcblx0ZGFya2dyZXk6IFsxNjksIDE2OSwgMTY5XSxcblx0ZGFya2toYWtpOiBbMTg5LCAxODMsIDEwN10sXG5cdGRhcmttYWdlbnRhOiBbMTM5LCAwLCAxMzldLFxuXHRkYXJrb2xpdmVncmVlbjogWzg1LCAxMDcsIDQ3XSxcblx0ZGFya29yYW5nZTogWzI1NSwgMTQwLCAwXSxcblx0ZGFya29yY2hpZDogWzE1MywgNTAsIDIwNF0sXG5cdGRhcmtyZWQ6IFsxMzksIDAsIDBdLFxuXHRkYXJrc2FsbW9uOiBbMjMzLCAxNTAsIDEyMl0sXG5cdGRhcmtzZWFncmVlbjogWzE0MywgMTg4LCAxNDNdLFxuXHRkYXJrc2xhdGVibHVlOiBbNzIsIDYxLCAxMzldLFxuXHRkYXJrc2xhdGVncmF5OiBbNDcsIDc5LCA3OV0sXG5cdGRhcmtzbGF0ZWdyZXk6IFs0NywgNzksIDc5XSxcblx0ZGFya3R1cnF1b2lzZTogWzAsIDIwNiwgMjA5XSxcblx0ZGFya3Zpb2xldDogWzE0OCwgMCwgMjExXSxcblx0ZGVlcHBpbms6IFsyNTUsIDIwLCAxNDddLFxuXHRkZWVwc2t5Ymx1ZTogWzAsIDE5MSwgMjU1XSxcblx0ZGltZ3JheTogWzEwNSwgMTA1LCAxMDVdLFxuXHRkaW1ncmV5OiBbMTA1LCAxMDUsIDEwNV0sXG5cdGRvZGdlcmJsdWU6IFszMCwgMTQ0LCAyNTVdLFxuXHRmaXJlYnJpY2s6IFsxNzgsIDM0LCAzNF0sXG5cdGZsb3JhbHdoaXRlOiBbMjU1LCAyNTAsIDI0MF0sXG5cdGZvcmVzdGdyZWVuOiBbMzQsIDEzOSwgMzRdLFxuXHRmdWNoc2lhOiBbMjU1LCAwLCAyNTVdLFxuXHRnYWluc2Jvcm86IFsyMjAsIDIyMCwgMjIwXSxcblx0Z2hvc3R3aGl0ZTogWzI0OCwgMjQ4LCAyNTVdLFxuXHRnb2xkOiBbMjU1LCAyMTUsIDBdLFxuXHRnb2xkZW5yb2Q6IFsyMTgsIDE2NSwgMzJdLFxuXHRncmF5OiBbMTI4LCAxMjgsIDEyOF0sXG5cdGdyZWVuOiBbMCwgMTI4LCAwXSxcblx0Z3JlZW55ZWxsb3c6IFsxNzMsIDI1NSwgNDddLFxuXHRncmV5OiBbMTI4LCAxMjgsIDEyOF0sXG5cdGhvbmV5ZGV3OiBbMjQwLCAyNTUsIDI0MF0sXG5cdGhvdHBpbms6IFsyNTUsIDEwNSwgMTgwXSxcblx0aW5kaWFucmVkOiBbMjA1LCA5MiwgOTJdLFxuXHRpbmRpZ286IFs3NSwgMCwgMTMwXSxcblx0aXZvcnk6IFsyNTUsIDI1NSwgMjQwXSxcblx0a2hha2k6IFsyNDAsIDIzMCwgMTQwXSxcblx0bGF2ZW5kZXI6IFsyMzAsIDIzMCwgMjUwXSxcblx0bGF2ZW5kZXJibHVzaDogWzI1NSwgMjQwLCAyNDVdLFxuXHRsYXduZ3JlZW46IFsxMjQsIDI1MiwgMF0sXG5cdGxlbW9uY2hpZmZvbjogWzI1NSwgMjUwLCAyMDVdLFxuXHRsaWdodGJsdWU6IFsxNzMsIDIxNiwgMjMwXSxcblx0bGlnaHRjb3JhbDogWzI0MCwgMTI4LCAxMjhdLFxuXHRsaWdodGN5YW46IFsyMjQsIDI1NSwgMjU1XSxcblx0bGlnaHRnb2xkZW5yb2R5ZWxsb3c6IFsyNTAsIDI1MCwgMjEwXSxcblx0bGlnaHRncmF5OiBbMjExLCAyMTEsIDIxMV0sXG5cdGxpZ2h0Z3JlZW46IFsxNDQsIDIzOCwgMTQ0XSxcblx0bGlnaHRncmV5OiBbMjExLCAyMTEsIDIxMV0sXG5cdGxpZ2h0cGluazogWzI1NSwgMTgyLCAxOTNdLFxuXHRsaWdodHNhbG1vbjogWzI1NSwgMTYwLCAxMjJdLFxuXHRsaWdodHNlYWdyZWVuOiBbMzIsIDE3OCwgMTcwXSxcblx0bGlnaHRza3libHVlOiBbMTM1LCAyMDYsIDI1MF0sXG5cdGxpZ2h0c2xhdGVncmF5OiBbMTE5LCAxMzYsIDE1M10sXG5cdGxpZ2h0c2xhdGVncmV5OiBbMTE5LCAxMzYsIDE1M10sXG5cdGxpZ2h0c3RlZWxibHVlOiBbMTc2LCAxOTYsIDIyMl0sXG5cdGxpZ2h0eWVsbG93OiBbMjU1LCAyNTUsIDIyNF0sXG5cdGxpbWU6IFswLCAyNTUsIDBdLFxuXHRsaW1lZ3JlZW46IFs1MCwgMjA1LCA1MF0sXG5cdGxpbmVuOiBbMjUwLCAyNDAsIDIzMF0sXG5cdG1hZ2VudGE6IFsyNTUsIDAsIDI1NV0sXG5cdG1hcm9vbjogWzEyOCwgMCwgMF0sXG5cdG1lZGl1bWFxdWFtYXJpbmU6IFsxMDIsIDIwNSwgMTcwXSxcblx0bWVkaXVtYmx1ZTogWzAsIDAsIDIwNV0sXG5cdG1lZGl1bW9yY2hpZDogWzE4NiwgODUsIDIxMV0sXG5cdG1lZGl1bXB1cnBsZTogWzE0NywgMTEyLCAyMTldLFxuXHRtZWRpdW1zZWFncmVlbjogWzYwLCAxNzksIDExM10sXG5cdG1lZGl1bXNsYXRlYmx1ZTogWzEyMywgMTA0LCAyMzhdLFxuXHRtZWRpdW1zcHJpbmdncmVlbjogWzAsIDI1MCwgMTU0XSxcblx0bWVkaXVtdHVycXVvaXNlOiBbNzIsIDIwOSwgMjA0XSxcblx0bWVkaXVtdmlvbGV0cmVkOiBbMTk5LCAyMSwgMTMzXSxcblx0bWlkbmlnaHRibHVlOiBbMjUsIDI1LCAxMTJdLFxuXHRtaW50Y3JlYW06IFsyNDUsIDI1NSwgMjUwXSxcblx0bWlzdHlyb3NlOiBbMjU1LCAyMjgsIDIyNV0sXG5cdG1vY2Nhc2luOiBbMjU1LCAyMjgsIDE4MV0sXG5cdG5hdmFqb3doaXRlOiBbMjU1LCAyMjIsIDE3M10sXG5cdG5hdnk6IFswLCAwLCAxMjhdLFxuXHRvbGRsYWNlOiBbMjUzLCAyNDUsIDIzMF0sXG5cdG9saXZlOiBbMTI4LCAxMjgsIDBdLFxuXHRvbGl2ZWRyYWI6IFsxMDcsIDE0MiwgMzVdLFxuXHRvcmFuZ2U6IFsyNTUsIDE2NSwgMF0sXG5cdG9yYW5nZXJlZDogWzI1NSwgNjksIDBdLFxuXHRvcmNoaWQ6IFsyMTgsIDExMiwgMjE0XSxcblx0cGFsZWdvbGRlbnJvZDogWzIzOCwgMjMyLCAxNzBdLFxuXHRwYWxlZ3JlZW46IFsxNTIsIDI1MSwgMTUyXSxcblx0cGFsZXR1cnF1b2lzZTogWzE3NSwgMjM4LCAyMzhdLFxuXHRwYWxldmlvbGV0cmVkOiBbMjE5LCAxMTIsIDE0N10sXG5cdHBhcGF5YXdoaXA6IFsyNTUsIDIzOSwgMjEzXSxcblx0cGVhY2hwdWZmOiBbMjU1LCAyMTgsIDE4NV0sXG5cdHBlcnU6IFsyMDUsIDEzMywgNjNdLFxuXHRwaW5rOiBbMjU1LCAxOTIsIDIwM10sXG5cdHBsdW06IFsyMjEsIDE2MCwgMjIxXSxcblx0cG93ZGVyYmx1ZTogWzE3NiwgMjI0LCAyMzBdLFxuXHRwdXJwbGU6IFsxMjgsIDAsIDEyOF0sXG5cdHJlYmVjY2FwdXJwbGU6IFsxMDIsIDUxLCAxNTNdLFxuXHRyZWQ6IFsyNTUsIDAsIDBdLFxuXHRyb3N5YnJvd246IFsxODgsIDE0MywgMTQzXSxcblx0cm95YWxibHVlOiBbNjUsIDEwNSwgMjI1XSxcblx0c2FkZGxlYnJvd246IFsxMzksIDY5LCAxOV0sXG5cdHNhbG1vbjogWzI1MCwgMTI4LCAxMTRdLFxuXHRzYW5keWJyb3duOiBbMjQ0LCAxNjQsIDk2XSxcblx0c2VhZ3JlZW46IFs0NiwgMTM5LCA4N10sXG5cdHNlYXNoZWxsOiBbMjU1LCAyNDUsIDIzOF0sXG5cdHNpZW5uYTogWzE2MCwgODIsIDQ1XSxcblx0c2lsdmVyOiBbMTkyLCAxOTIsIDE5Ml0sXG5cdHNreWJsdWU6IFsxMzUsIDIwNiwgMjM1XSxcblx0c2xhdGVibHVlOiBbMTA2LCA5MCwgMjA1XSxcblx0c2xhdGVncmF5OiBbMTEyLCAxMjgsIDE0NF0sXG5cdHNsYXRlZ3JleTogWzExMiwgMTI4LCAxNDRdLFxuXHRzbm93OiBbMjU1LCAyNTAsIDI1MF0sXG5cdHNwcmluZ2dyZWVuOiBbMCwgMjU1LCAxMjddLFxuXHRzdGVlbGJsdWU6IFs3MCwgMTMwLCAxODBdLFxuXHR0YW46IFsyMTAsIDE4MCwgMTQwXSxcblx0dGVhbDogWzAsIDEyOCwgMTI4XSxcblx0dGhpc3RsZTogWzIxNiwgMTkxLCAyMTZdLFxuXHR0b21hdG86IFsyNTUsIDk5LCA3MV0sXG5cdHR1cnF1b2lzZTogWzY0LCAyMjQsIDIwOF0sXG5cdHZpb2xldDogWzIzOCwgMTMwLCAyMzhdLFxuXHR3aGVhdDogWzI0NSwgMjIyLCAxNzldLFxuXHR3aGl0ZTogWzI1NSwgMjU1LCAyNTVdLFxuXHR3aGl0ZXNtb2tlOiBbMjQ1LCAyNDUsIDI0NV0sXG5cdHllbGxvdzogWzI1NSwgMjU1LCAwXSxcblx0eWVsbG93Z3JlZW46IFsxNTQsIDIwNSwgNTBdLFxufVxuXG5mb3IgKGNvbnN0IGtleSBpbiBjb2xvcnMpIE9iamVjdC5mcmVlemUoY29sb3JzW2tleV0pO1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmZyZWV6ZShjb2xvcnMpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxubGV0IF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvdmlzX3N0cl9kZW1vLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9