import { Range, RangeSimple, VisStr } from "./vis_str";
import * as strlib from "./strlib";

/** Visualizations producing a flat, non-overlapping list of ranges. */
const SIMPLE_VISUALIZERS: Record<string, (str: string) => RangeSimple[]> = {
  runs: strlib.enumRuns,
  palindromes: strlib.enumPalindromes,
  squares: strlib.enumSquares,
  rmostsquares: strlib.enumRightmostSquares,
  lmostsquares: strlib.enumLeftmostSquares,
};

/** Visualizations already producing pre-grouped ranges. */
const GROUP_VISUALIZERS: Record<string, (str: string) => RangeSimple[][]> = {
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

const radioValue = (selector: string): string => {
  let res = "";
  const elms = document.querySelectorAll<HTMLInputElement>(selector);
  for (let i = 0; i < elms.length; i++) {
    if (elms[i].checked) res = elms[i].value;
  }
  return res;
};

const draw = (_e: Event) => {
  // get font size
  const fontSize = parseInt(radioValue("[name=font_size]"));
  // get line style
  let rangeStyle = radioValue("[name=line_style]");
  const lineStyleRight = radioValue("[name=line_style_right]");

  rangeStyle += lineStyleRight.length === 0 ? "" : "," + lineStyleRight;
  const visualize = radioValue("[name=visualize]");

  // get input string
  const elm = document.querySelector("#input_str") as HTMLInputElement;
  const inputStr = elm.value;

  // get canvas
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  // canvas.width = window.innerWidth - 50
  const visStr = new VisStr(canvas, fontSize);

  // compute ranges
  let rangesGroup: RangeSimple[][] = [];
  let ranges: Range[][] = [];

  const showEffectiveAlphabet = (
    document.getElementById("effective_alphabet") as HTMLInputElement
  ).checked;
  const showRankArray = (
    document.getElementById("rank_array") as HTMLInputElement
  ).checked;

  if (showEffectiveAlphabet) {
    rangesGroup.push([
      [
        -1,
        inputStr.length - 1,
        ["eStr", ...strlib.replaceEffectiveAlphabet(inputStr)],
      ],
    ] as RangeSimple[]);
  }
  if (showRankArray) {
    rangesGroup.push([
      [-1, inputStr.length - 1, ["rank", ...strlib.rankArray(inputStr)]],
    ] as RangeSimple[]);
  }

  if (visualize in SIMPLE_VISUALIZERS) {
    const rangesp = SIMPLE_VISUALIZERS[visualize](inputStr);
    rangesGroup = rangesGroup.concat(visStr.nonOverlapRangesSimple(rangesp));
    ranges = visStr.makeGroupRangesAutoColor(rangesGroup, rangeStyle);
  } else if (visualize in GROUP_VISUALIZERS) {
    rangesGroup = rangesGroup.concat(GROUP_VISUALIZERS[visualize](inputStr));
    ranges = visStr.makeGroupRangesAutoColor(rangesGroup, rangeStyle);
    ranges = strlib.flat(ranges.map((x) => visStr.nonOverlapRanges(x)));
  }

  visStr.draw(inputStr, ranges);
};

const selectorAddEvent = (
  selector: string,
  event: string,
  func: EventListener,
) => {
  const elms = document.querySelectorAll<HTMLInputElement>(selector);
  for (let i = 0; i < elms.length; i++) {
    elms[i].addEventListener(event, func);
  }
};

const main = () => {
  const inputStr = document.getElementById("input_str") as HTMLElement;
  inputStr.addEventListener("input", draw);
  inputStr.addEventListener("propertychange", draw);

  // add event for radio buttons
  selectorAddEvent("[name=font_size]", "click", draw);
  selectorAddEvent("[name=line_style]", "click", draw);
  selectorAddEvent("[name=line_style_right]", "click", draw);
  selectorAddEvent("[name=visualize]", "click", draw);
  selectorAddEvent("[type=checkbox]", "click", draw);

  // draw initially.
  inputStr.dispatchEvent(
    new CustomEvent("propertychange", { detail: "init event" }),
  );
};

main();
