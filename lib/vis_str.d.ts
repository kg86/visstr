/** The simple range representation for strings. The second element (end) is exclusive. */
export type RangeStr = [number, number, string[]];
/** The simple range representation for line. The second element (end) is exclusive. */
export type RangeLine = [number, number, number?];
/** The simple range representation */
export type RangeSimple = RangeStr | RangeLine;
export interface Range {
    /** The style to draw range. It is either of ["line", "curve", "arrow", "str"]. If "str" is chosen, the optinal parameter `str` must be given. For other styles, you can set left style and right style lie "line,arrow". */
    style: string;
    /** The color to draw range, e.g. "#000000" for black. */
    color: string;
    /** The beginning index of the range. */
    beg: number;
    /** The ending index of the range. Note that `end` is exclusive: the range is [`beg`, `end`). */
    end: number;
    /** The step of the range [`beg`, `end`]. For example, a range [`beg`, `end`, `step`] = [1, 9, 3] represents continuous ranges [[`beg`, `end`]]=[[1, 4], [4, 7], [7, 9]] */
    step?: number;
    /** The strings of the range. Its length must be equal to the length of the range `end` - `beg` */
    str?: string[];
}
export interface RangePx {
    /** The style to draw range. It is either of ["line", "curve", "arrow", "str"]. If "str" is chosen, the optinal parameter `str` must be given. For other styles, you can set left style and right style lie "line,arrow". */
    style: string;
    /** The color to draw range, e.g. "#000000" for black. */
    color: string;
    /** The x-coordinate which begins the range. */
    x_beg: number;
    /** The x-coordinate which ends the range. */
    x_end: number;
    /** The y-coordinate of the range. */
    y: number;
    /** The strings of the range. Its length must be equal to the length of the range `end` - `beg` */
    str?: string[];
}
export declare class VisStr {
    private canvas;
    private ctx;
    private strX;
    private strY;
    private fontSize;
    private fontSizeHalf;
    private fontType;
    /** The offset to start drawing a range from a center position of an index. */
    private rangeBegOffset;
    private rangeEndOffset;
    /**
     *
     * @param canvas HTMLCanvasElement
     * @param fontSize font size
     * @param fontType font name
     */
    constructor(canvas: HTMLCanvasElement, fontSize?: number, fontType?: string);
    /** Clear the canvas. */
    clear(): void;
    /**
     * Returns the x-coordinate which is a beginning of a range.
     *
     * @param idx index of a range
     * @return The x-coordinate of a range beginning at `idx`
     */
    rangeBeg(idx: number): number;
    /**
     * Returns the x-coordinate which is a ending of a range.
     *
     * @param idx index of a range
     * @return The x-coordinate of a range ending at `idx`
     */
    rangeEnd(idx: number): number;
    /**
     * Return the height of a given range.
     * @param r A range.
     */
    rangeHeight(r: Range): number;
    /**
     * For a range not to draw strings, split it to three parts left, center, and right.
     * @param rpx Given range to split.
     */
    splitRangePx(rpx: RangePx): RangePx[];
    /**
     * Draw curve as a part of a range.
     * @param rpx A part of a range.
     */
    drawCurvePart(rpx: RangePx): void;
    /**
     * Return the length of a beginning (or ending) part of a range.
     */
    curve_d(): number;
    /**
     * Draw line as a part of a range.
     * @param rpx A part of a range.
     */
    drawLinePxPart(rpx: RangePx): void;
    /**
     * Draw arrow as a part of a range.
     * @param rpx A part of a range.
     */
    drawArrowPxPart(rpx: RangePx): void;
    /**
     * Draw range as a part of a range.
     * @param rpx A part of a range.
     */
    drawRangePxPart(rpx: RangePx): void;
    /**
     * Draw range.
     * @param rpx A range to draw.
     */
    drawRangePx(rpx: RangePx): void;
    /**
     * Draw strings.
     * @param r A range to draw strings.
     * @param y The y-coorinate to draw range `r`.
     */
    drawStr(r: Range, y: number): void;
    /**
     * Draw range.
     * @param r A range to draw.
     * @param y A y-coordinate to draw `r`.
     */
    drawRange(r: Range, y: number): void;
    /**
     * Draw ranges.
     * @param rangeRows Ranges to draw.
     */
    drawRanges(rangeRows: Range[][]): void;
    /**
     * Draw an input string.
     */
    drawInputStr(inputStr: string): void;
    /**
     * Draw a given string and ranges.
     * @param inputStr Input string to draw.
     * @param rss The ranges to draw which are related to a given string `inputStr`
     */
    draw(inputStr: string, rss: Range[][]): void;
    /**
     * Make group that each contains a single range.
     * @param ranges The range list.
     */
    makeSingleGroups(ranges: Range[]): Range[][];
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param Ts The range list.
     * @param rangef The function to return the tuple beginning index and ending index of a given range `Ts[i]`.
     */
    nonOverlapObjs<T>(Ts: T[], rangef: (arg0: T) => number[]): T[][];
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param rs The range list.
     */
    nonOverlapRanges(rs: Range[]): Range[][];
    /**
     * Return the grouped ranges that each contains non overlapping ranges.
     * @param rs The range list.
     */
    nonOverlapRangesSimple(rs: RangeSimple[]): RangeSimple[][];
    /**
     * Return the range list `rs` specified with the style `style`.
     * @param rs The range list.
     * @param style The style of the ranges `rs` to draw.
     */
    makeGroupRangesAutoColor(rs: RangeSimple[][], style: string): Range[][];
    /**
     * Return the range list `rs` specified with style `style` and `color`.
     * @param ranges The range list.
     * @param style The style of the ranges `rs` to draw.
     * @param color The color of the ranges `rs` to draw.
     */
    makeRanges(ranges: RangeSimple[], style: string, color: string): Range[];
    /**
     * Return the range list `rs` specified with the style `style`.
     * @param rs The range list.
     * @param style The style of the ranges `rs` to draw.
     */
    makeRangesAutoColor(rs: RangeSimple[], style: string): Range[];
}
