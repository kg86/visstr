/** The simple range representation for strings */
export declare type RangeStr = [number, number, string[]];
/** The simple range representation for line */
export declare type RangeLine = [number, number, number?];
/** The simple range representation */
export declare type RangeSimple = RangeStr | RangeLine;
export interface Range {
    /** The style to draw range. It is either of ["line", "curve", "arrow", "str"]. If "str" is chosen, the optinal parameter `str` must be given. For other styles, you can set left style and right style lie "line,arrow". */
    style: string;
    /** The color to draw range, e.g. "#000000" for black. */
    color: string;
    /** The beginning index of the range. */
    beg: number;
    /** The ending index of the range. Note that indexes are inclusive. */
    end: number;
    /** The step of the range [`beg`, `end`]. For example, a range [`beg`, `end`, `step`] = [1, 8, 3] represents continuous ranges [[`beg`, `end`]]=[[1, 3], [4, 6], [7, 8]] */
    step?: number;
    /** The strings of the range. Its length must be equal to the length of the range `end` - `beg` + 1 */
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
    /** The strings of the range. Its length must be equal to the length of the range `end` - `beg` + 1 */
    str?: string[];
}
export declare class VisStr {
    private canvas;
    private ctx;
    private str_x;
    private str_y;
    private font_size;
    private font_size_half;
    private font_type;
    /** The offset to start drawing a range from a center position of an index. */
    private range_beg_offset;
    private range_end_offset;
    /**
     *
     * @param canvas HTMLCanvasElement
     * @param font_size font size
     * @param font_type font name
     */
    constructor(canvas: HTMLCanvasElement, font_size?: number, font_type?: string);
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
     * @param range_rows Ranges to draw.
     */
    drawRanges(range_rows: Range[][]): void;
    /**
     * Draw an input string.
     */
    drawInputStr(input_str: string): void;
    /**
     * Draw a given string and ranges.
     * @param input_str Input string to draw.
     * @param rss The ranges to draw which are related to a given string `input_str`
     */
    draw(input_str: string, rss: Range[][]): void;
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
