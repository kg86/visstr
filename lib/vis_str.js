"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisStr = void 0;
const color_convert_1 = __importDefault(require("color-convert"));
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
        // `r.end` is exclusive; recover the inclusive last index for the
        // pixel/step math below, which mirrors the previous inclusive-end logic.
        const endIncl = r.end - 1;
        const rpx = {
            x_beg: this.rangeBeg(r.beg),
            x_end: this.rangeEnd(endIncl),
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
            for (let cur = r.beg + r.step - 1; cur < endIncl; cur += r.step) {
                rpx.x_end = this.strX + this.fontSize * cur + this.fontSizeHalf;
                this.drawRangePx(rpx);
                rpx.x_beg = rpx.x_end;
            }
            if ((endIncl - r.beg + 1) % r.step === 0) {
                rpx.x_end = this.rangeEnd(endIncl);
                this.drawRangePx(rpx);
            }
            else {
                // There is an uncomplete range.
                rpx.x_end = this.strX + this.fontSize * endIncl + this.fontSizeHalf;
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
            end: inputStr.length,
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
        let rangeBound = [-1, inputStr.length];
        rss.forEach((rs) => rs.forEach((r) => (rangeBound = [
            Math.min(rangeBound[0], r.beg),
            Math.max(rangeBound[1], r.end),
        ])));
        this.strX = this.fontSize + Math.abs(rangeBound[0]) * this.fontSize;
        this.canvas.width = (rangeBound[1] - rangeBound[0] + 1) * this.fontSize;
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
        const n = Math.max(...ends);
        const used = new Array(n);
        used.fill(false);
        const res = [];
        let rows = [];
        for (const t of Ts) {
            // check whether or not a range can be inserted to the current row.
            let usedAny = false;
            for (let i = rangef(t)[0]; i < rangef(t)[1]; i++) {
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
            for (let i = rangef(t)[0]; i < rangef(t)[1]; i++) {
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
//# sourceMappingURL=vis_str.js.map