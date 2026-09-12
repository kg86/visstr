import { VisStr, Range, RangePx, RangeSimple } from "./vis_str";

const makeVisStr = (font_size = 32): VisStr => {
  const canvas = {
    getContext: () => ({}),
  } as unknown as HTMLCanvasElement;
  return new VisStr(canvas, font_size);
};

describe("rangeBeg / rangeEnd", () => {
  const vs = makeVisStr(32);

  test("rangeBeg returns the x-coordinate offset before the index center", () => {
    expect(vs.rangeBeg(0)).toBeCloseTo(32 - 32 / 4);
    expect(vs.rangeBeg(2)).toBeCloseTo(32 + 32 * 2 - 32 / 4);
  });

  test("rangeEnd returns the x-coordinate offset after the index center", () => {
    expect(vs.rangeEnd(0)).toBeCloseTo(32 + 32 / 4);
    expect(vs.rangeEnd(2)).toBeCloseTo(32 + 32 * 2 + 32 / 4);
  });
});

describe("rangeHeight", () => {
  const vs = makeVisStr(32);

  test("returns the full font size for the 'str' style", () => {
    const r: Range = { style: "str", color: "#000000", beg: 0, end: 0 };
    expect(vs.rangeHeight(r)).toBe(32);
  });

  test("returns half the font size (rounded) for other styles", () => {
    const r: Range = { style: "line", color: "#000000", beg: 0, end: 0 };
    expect(vs.rangeHeight(r)).toBe(Math.round(32 * 0.5));
  });
});

describe("curve_d", () => {
  test("returns a quarter of the font size", () => {
    const vs = makeVisStr(32);
    expect(vs.curve_d()).toBe(8);
  });
});

describe("splitRangePx", () => {
  const vs = makeVisStr(32);

  test("splits a single-style range into left/center/right parts sharing the same style", () => {
    const rpx: RangePx = {
      style: "curve",
      color: "#000000",
      x_beg: 0,
      x_end: 100,
      y: 10,
    };
    const [rl, rc, rr] = vs.splitRangePx(rpx);

    expect(rl.style).toBe("curve");
    expect(rr.style).toBe("curve");
    expect(rc.style).toBe("line");

    expect(rl.x_beg).toBe(0);
    expect(rl.x_end).toBe(vs.curve_d());
    expect(rr.x_beg).toBe(100);
    expect(rr.x_end).toBe(100 - vs.curve_d());
    expect(rc.x_beg).toBe(rl.x_end);
    expect(rc.x_end).toBe(rr.x_end);
  });

  test("uses distinct left/right styles when given as 'left,right'", () => {
    const rpx: RangePx = {
      style: "curve,arrow",
      color: "#000000",
      x_beg: 0,
      x_end: 100,
      y: 10,
    };
    const [rl, , rr] = vs.splitRangePx(rpx);

    expect(rl.style).toBe("curve");
    expect(rr.style).toBe("arrow");
  });
});

describe("nonOverlapRangesSimple", () => {
  const vs = makeVisStr(32);

  test("returns an empty array for an empty input", () => {
    expect(vs.nonOverlapRangesSimple([])).toStrictEqual([]);
  });

  test("packs non-overlapping ranges into the same row", () => {
    const rs: RangeSimple[] = [
      [0, 1],
      [2, 3],
      [4, 5],
    ];
    expect(vs.nonOverlapRangesSimple(rs)).toStrictEqual([rs]);
  });

  test("starts a new row when a range overlaps a previous one in the current row", () => {
    const rs: RangeSimple[] = [
      [0, 2],
      [1, 3],
      [4, 5],
    ];
    expect(vs.nonOverlapRangesSimple(rs)).toStrictEqual([
      [[0, 2]],
      [
        [1, 3],
        [4, 5],
      ],
    ]);
  });
});

describe("makeSingleGroups", () => {
  test("wraps each range into its own single-element group", () => {
    const vs = makeVisStr();
    const ranges: Range[] = [
      { style: "line", color: "#000000", beg: 0, end: 1 },
      { style: "line", color: "#000000", beg: 2, end: 3 },
    ];
    expect(vs.makeSingleGroups(ranges)).toStrictEqual([
      [ranges[0]],
      [ranges[1]],
    ]);
  });
});

describe("makeRanges", () => {
  const vs = makeVisStr();

  test("builds a plain range when the third element is omitted", () => {
    const res = vs.makeRanges([[0, 2]], "line", "#ff0000");
    expect(res).toStrictEqual([
      {
        style: "line",
        color: "#ff0000",
        beg: 0,
        end: 2,
        step: undefined,
        str: undefined,
      },
    ]);
  });

  test("builds a range with a step when the third element is a number", () => {
    const res = vs.makeRanges([[0, 5, 2]], "line", "#ff0000");
    expect(res).toStrictEqual([
      {
        style: "line",
        color: "#ff0000",
        beg: 0,
        end: 5,
        step: 2,
        str: undefined,
      },
    ]);
  });

  test("builds a 'str' style range when the third element is a string array", () => {
    const res = vs.makeRanges([[0, 1, ["a", "b"]]], "line", "#ff0000");
    expect(res).toStrictEqual([
      {
        style: "str",
        color: "#ff0000",
        beg: 0,
        end: 1,
        step: undefined,
        str: ["a", "b"],
      },
    ]);
  });
});

describe("makeRangesAutoColor / makeGroupRangesAutoColor", () => {
  const vs = makeVisStr();

  test("assigns each range a distinct hex color", () => {
    const res = vs.makeRangesAutoColor(
      [
        [0, 1],
        [2, 3],
      ],
      "line",
    );
    expect(res).toHaveLength(2);
    for (const r of res) {
      expect(r.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
    expect(res[0].color).not.toBe(res[1].color);
  });

  test("assigns each group a distinct hex color", () => {
    const res = vs.makeGroupRangesAutoColor([[[0, 1]], [[2, 3]]], "line");
    expect(res).toHaveLength(2);
    expect(res[0][0].color).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(res[0][0].color).not.toBe(res[1][0].color);
  });
});
