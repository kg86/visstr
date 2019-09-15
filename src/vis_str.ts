import * as convert from 'color-convert'

/** The simple range representation for strings */
export type RangeStr = [number, number, string[]]
/** The simple range representation for line */
export type RangeLine = [number, number, number?]
/** The simple range representation */
export type RangeSimple = RangeStr | RangeLine

export interface Range {
  /** The style to draw range. It is either of ["line", "curve", "arrow", "str"]. If "str" is chosen, the optinal parameter `str` must be given. For other styles, you can set left style and right style lie "line,arrow". */
  style: string
  /** The color to draw range, e.g. "#000000" for black. */
  color: string
  /** The beginning index of the range. */
  beg: number
  /** The ending index of the range. Note that indexes are inclusive. */
  end: number
  /** The step of the range [`beg`, `end`]. For example, a range [`beg`, `end`, `step`] = [1, 8, 3] represents continuous ranges [[`beg`, `end`]]=[[1, 3], [4, 6], [7, 8]] */
  step?: number
  /** The strings of the range. Its length must be equal to the length of the range `end` - `beg` + 1 */
  str?: string[]
}

export interface RangePx {
  /** The style to draw range. It is either of ["line", "curve", "arrow", "str"]. If "str" is chosen, the optinal parameter `str` must be given. For other styles, you can set left style and right style lie "line,arrow". */
  style: string
  /** The color to draw range, e.g. "#000000" for black. */
  color: string
  /** The x-coordinate which begins the range. */
  x_beg: number
  /** The x-coordinate which ends the range. */
  x_end: number
  /** The y-coordinate of the range. */
  y: number
  /** The strings of the range. Its length must be equal to the length of the range `end` - `beg` + 1 */
  str?: string[]
}

export class VisStr {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private input_str: string
  private str_x: number
  private str_y: number
  private font_size: number
  private font_size_half: number
  private font_type: string
  /** The offset to start drawing a range from a center position of an index. */
  private range_beg_offset: number
  private range_end_offset: number

  /**
   *
   * @param canvas HTMLCanvasElement
   * @param input_str input string
   * @param font_size font size
   * @param font_type font name
   */
  constructor(
    canvas: HTMLCanvasElement,
    input_str: string,
    font_size = 32,
    font_type = 'Courier',
  ) {
    this.canvas = canvas
    this.input_str = input_str
    this.font_size = font_size
    this.font_size_half = this.font_size / 2
    this.font_type = font_type
    this.ctx = canvas.getContext('2d')
    this.str_x = this.font_size
    this.str_y = this.font_size * 2 + this.font_size_half
    this.range_beg_offset = -this.font_size / 4
    this.range_end_offset = this.font_size / 4
  }

  /** Clear the canvas. */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * Returns the x-coordinate which is a beginning of a range.
   *
   * @param idx index of a range
   * @return The x-coordinate of a range beginning at `idx`
   */
  rangeBeg(idx: number): number {
    return this.str_x + this.font_size * idx + this.range_beg_offset
  }

  /**
   * Returns the x-coordinate which is a ending of a range.
   *
   * @param idx index of a range
   * @return The x-coordinate of a range ending at `idx`
   */
  rangeEnd(idx: number): number {
    return this.str_x + this.font_size * idx + this.range_end_offset
  }

  /**
   * Return the height of a given range.
   * @param r A range.
   */
  rangeHeight(r: Range): number {
    return r.style === 'str' ? this.font_size : Math.round(this.font_size * 0.5)
  }

  /**
   * For a range not to draw strings, split it to three parts left, center, and right.
   * @param rpx Given range to split.
   */
  splitRangePx(rpx: RangePx): RangePx[] {
    const styles = rpx.style.split(',')

    let rl = Object.assign({}, rpx)
    let rc = Object.assign({}, rpx)
    let rr = Object.assign({}, rpx)
    rl.x_end = rpx.x_beg + this.curve_d()
    rl.style = styles[0]

    rr.x_beg = rpx.x_end
    rr.x_end = rpx.x_end - this.curve_d()
    rr.style = styles.length > 1 ? styles[1] : styles[0]

    rc.x_beg = rl.x_end
    rc.x_end = rr.x_end
    rc.style = 'line'
    return [rl, rc, rr]
  }

  /**
   * Draw curve as a part of a range.
   * @param rpx A part of a range.
   */
  drawCurvePart(rpx: RangePx) {
    this.ctx.beginPath()
    this.ctx.moveTo(rpx.x_beg, rpx.y - this.curve_d())
    this.ctx.quadraticCurveTo(rpx.x_beg, rpx.y, rpx.x_end, rpx.y)
    this.ctx.stroke()
  }

  /**
   * Return the length of a beginning (or ending) part of a range.
   */
  curve_d(): number {
    return this.font_size_half / 2
  }

  /**
   * Draw line as a part of a range.
   * @param rpx A part of a range.
   */
  drawLinePxPart(rpx: RangePx) {
    this.ctx.beginPath()
    this.ctx.moveTo(rpx.x_beg, rpx.y)
    this.ctx.lineTo(rpx.x_end, rpx.y)
    this.ctx.stroke()
  }

  /**
   * Draw arrow as a part of a range.
   * @param rpx A part of a range.
   */
  drawArrowPxPart(rpx: RangePx) {
    const dx = this.curve_d() * (rpx.x_beg < rpx.x_end ? -1 : +1)
    this.drawLinePxPart(rpx)
    this.ctx.beginPath()
    this.ctx.moveTo(rpx.x_end + dx / 2, rpx.y + dx / 2)
    this.ctx.lineTo(rpx.x_end + dx, rpx.y)
    this.ctx.lineTo(rpx.x_end + dx / 2, rpx.y - dx / 2)
    this.ctx.stroke()
  }

  /**
   * Draw range as a part of a range.
   * @param rpx A part of a range.
   */
  drawRangePxPart(rpx: RangePx) {
    if (rpx.style == 'line') {
      this.drawLinePxPart(rpx)
    } else if (rpx.style == 'curve') {
      this.drawCurvePart(rpx)
    } else if (rpx.style == 'arrow') {
      this.drawArrowPxPart(rpx)
    }
  }

  /**
   * Draw range.
   * @param rpx A range to draw.
   */
  drawRangePx(rpx: RangePx) {
    if (rpx.style == 'line') {
      this.drawLinePxPart(rpx)
    } else {
      const [rl, rc, rr] = this.splitRangePx(rpx)
      this.drawRangePxPart(rl)
      this.drawRangePxPart(rc)
      this.drawRangePxPart(rr)
    }
  }

  /**
   * Draw strings.
   * @param r A range to draw strings.
   * @param y The y-coorinate to draw range `r`.
   */
  drawStr(r: Range, y: number) {
    for (let i = 0; i < r.str.length; i++) {
      const c = r.str[i]
      const cx = this.str_x + (r.beg + i) * this.font_size
      this.ctx.fillText(c, cx, y + this.font_size * 0.3, this.font_size)
      this.ctx.beginPath()
      this.ctx.rect(
        cx - this.font_size_half,
        y - this.font_size_half,
        this.font_size,
        this.font_size,
      )
      this.ctx.stroke()
    }
  }

  /**
   * Draw range.
   * @param r A range to draw.
   * @param y A y-coordinate to draw `r`.
   */
  drawRange(r: Range, y: number) {
    this.ctx.strokeStyle = r.color
    let rpx = {
      x_beg: this.rangeBeg(r.beg),
      x_end: this.rangeEnd(r.end),
      y: y,
      style: r.style,
      color: r.color,
      str: r.str,
    }
    if (r.style == 'str') {
      this.drawStr(r, y)
    } else if (r.step === undefined) {
      this.drawRangePx(rpx)
    } else {
      let x_beg = this.rangeBeg(r.beg)
      for (let cur = r.beg + r.step - 1; cur < r.end; cur += r.step) {
        rpx.x_end = this.str_x + this.font_size * cur + this.font_size_half
        this.drawRangePx(rpx)
        rpx.x_beg = rpx.x_end
      }
      if ((r.end - r.beg + 1) % r.step === 0) {
        rpx.x_end = this.rangeEnd(r.end)
        this.drawRangePx(rpx)
      } else {
        // There is an uncomplete range.
        rpx.x_end = this.str_x + this.font_size * r.end + this.font_size_half
        rpx.style = r.style.split(',')[0] + ',line'
        this.drawRangePx(rpx)
      }
    }
  }

  /**
   * Draw ranges.
   * @param range_rows Ranges to draw.
   */
  drawRanges(range_rows: Range[][]) {
    let ypx = this.str_y
    for (const ranges of range_rows) {
      const height = Math.max(...ranges.map(r => this.rangeHeight(r)))
      for (const range of ranges) {
        this.drawRange(range, ypx + height / 2)
      }
      ypx += height
    }
  }

  /**
   * Draw an input string.
   */
  drawInputStr() {
    let index = ['i']
    for (let i = 0; i < this.input_str.length; i++) index.push('' + i)
    let r = {
      style: 'str',
      color: '#000000',
      beg: -1,
      end: this.input_str.length - 1,
      str: index,
    }
    this.drawRange(r, this.str_y - this.font_size - this.font_size_half)
    const chars = ['Str']
    for (let i = 0; i < this.input_str.length; i++)
      chars.push(this.input_str.substring(i, i + 1))
    r.str = chars
    this.drawRange(r, this.str_y - this.font_size_half)
  }

  /**
   * Draw a given string and ranges.
   * @param input_str Input string to draw.
   * @param rss The ranges to draw which are related to a given string `input_str`
   */
  draw(input_str: string, rss: Range[][]) {
    let range_bound = [-1, input_str.length - 1]
    rss.forEach(rs =>
      rs.forEach(
        r =>
          (range_bound = [
            Math.min(range_bound[0], r.beg),
            Math.max(range_bound[1], r.end),
          ]),
      ),
    )
    this.str_x = this.font_size + Math.abs(range_bound[0]) * this.font_size
    this.canvas.width = (range_bound[1] - range_bound[0] + 2) * this.font_size
    this.canvas.height =
      this.str_y +
      this.font_size_half +
      rss.reduce(
        (acm, rs) => acm + Math.max(...rs.map(r => this.rangeHeight(r))),
        0,
      )

    // DPI settings
    const dpr = window.devicePixelRatio || 1
    const rect = this.canvas.getBoundingClientRect()
    // console.log('dpr', dpr, ' rect', rect)
    this.canvas.width *= dpr
    this.canvas.height *= dpr
    this.ctx.scale(dpr, dpr)
    this.canvas.style.width = this.canvas.width / dpr + 'px'

    this.canvas.style.height = this.canvas.height / dpr + 'px'
    this.ctx.textAlign = 'center'
    this.ctx.lineWidth = 3
    this.ctx.font = this.font_size + 'px ' + this.font_type
    this.drawInputStr()
    this.drawRanges(rss)
  }

  /**
   * Make group that each contains a single range.
   * @param ranges The range list.
   */
  makeSingleGroups(ranges: Range[]): Range[][] {
    return ranges.map(range => [range])
  }

  /**
   * Return the grouped ranges that each contains non overlapping ranges.
   * @param Ts The range list.
   * @param rangef The function to return the tuple beginning index and ending index of a given range `Ts[i]`.
   */
  nonOverlapObjs<T>(Ts: T[], rangef: (T) => number[]): T[][] {
    if (Ts.length <= 0) return []
    const ends = Ts.map(t => rangef(t)[1])
    const n = Math.max(...ends) + 1
    let used = new Array<boolean>(n)
    used.fill(false)
    let res = []
    let rows = []
    for (const t of Ts) {
      // check whether or not a range can be inserted to the current row.
      let used_any = false
      for (let i = rangef(t)[0]; i <= rangef(t)[1]; i++) {
        used_any = used_any || used[i]
      }
      if (used_any) {
        res.push(rows)
        rows = [t]
        used.fill(false)
      } else {
        rows.push(t)
      }
      for (let i = rangef(t)[0]; i <= rangef(t)[1]; i++) {
        used[i] = true
      }
    }
    if (rows.length > 0) res.push(rows)

    return res
  }

  /**
   * Return the grouped ranges that each contains non overlapping ranges.
   * @param rs The range list.
   */
  nonOverlapRangeIdxs(rs: Range[]): Range[][] {
    return this.nonOverlapObjs<Range>(rs, r => [r.beg, r.end])
  }

  /**
   * Return the grouped ranges that each contains non overlapping ranges.
   * @param rs The range list.
   */
  nonOverlapRanges(rs: RangeSimple[]): RangeSimple[][] {
    return this.nonOverlapObjs<RangeSimple>(rs, x => [x[0], x[1]])
  }

  /**
   * Return the range list `rs` specified with the style `style`.
   * @param rs The range list.
   * @param style The style of the ranges `rs` to draw.
   */
  makeGroupRangesAutoColor(rs: RangeSimple[][], style: string): Range[][] {
    let res = []
    for (let i = 0; i < rs.length; i++) {
      const color = '#' + convert.hsv.hex([(i * 360) / rs.length, 80, 80])
      res.push(this.makeRanges(rs[i], style, color))
    }
    return res
  }

  /**
   * Return the range list `rs` specified with style `style` and `color`.
   * @param ranges The range list.
   * @param style The style of the ranges `rs` to draw.
   * @param color The color of the ranges `rs` to draw.
   */
  makeRanges(ranges: RangeSimple[], style: string, color: string): Range[] {
    return ranges.map(range => {
      const is_str =
        typeof range[2] !== 'undefined' && typeof range[2] !== 'number'
      const step = typeof range[2] === 'number' ? range[2] : undefined
      const str = typeof range[2] !== 'number' ? range[2] : undefined
      return {
        style: is_str ? 'str' : style,
        color,
        beg: range[0],
        end: range[1],
        step,
        str,
      }
    })
  }

  /**
   * Return the range list `rs` specified with the style `style`.
   * @param rs The range list.
   * @param style The style of the ranges `rs` to draw.
   */
  makeRangesAutoColor(rs: RangeSimple[], style: string): Range[] {
    return rs.map((range, i) => ({
      style,
      color: '#' + convert.hsv.hex([(i * 360) / rs.length, 80, 80]),
      beg: range[0],
      end: range[1],
    }))
  }
}
