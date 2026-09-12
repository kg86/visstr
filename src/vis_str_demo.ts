import { Range, RangeSimple, VisStr } from "./vis_str";
import * as strlib from "./strlib";

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
  let rangesp: RangeSimple[] = [];
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

  if (
    visualize === "runs" ||
    visualize === "palindromes" ||
    visualize === "squares" ||
    visualize === "rmostsquares" ||
    visualize === "lmostsquares"
  ) {
    if (visualize === "runs") {
      rangesp = strlib.enumRuns(inputStr) as RangeSimple[];
    } else if (visualize === "palindromes") {
      rangesp = strlib.enumPalindromes(inputStr) as RangeSimple[];
    } else if (visualize === "squares") {
      rangesp = strlib.enumSquares(inputStr) as RangeSimple[];
    } else if (visualize === "rmostsquares") {
      rangesp = strlib.enumRightmostSquares(inputStr) as RangeSimple[];
    } else if (visualize === "lmostsquares") {
      rangesp = strlib.enumLeftmostSquares(inputStr) as RangeSimple[];
    }
    rangesGroup = rangesGroup.concat(visStr.nonOverlapRangesSimple(rangesp));
    ranges = visStr.makeGroupRangesAutoColor(rangesGroup, rangeStyle);
  } else {
    if (visualize === "lpf")
      rangesGroup = rangesGroup.concat(strlib.enumPrevOccLPF(inputStr));
    else if (visualize === "left_maximal")
      rangesGroup = rangesGroup.concat(
        strlib.enumIfGroup(inputStr, strlib.isLeftMaximal),
      );
    else if (visualize === "right_maximal")
      rangesGroup = rangesGroup.concat(
        strlib.enumIfGroup(inputStr, strlib.isRightMaximal),
      );
    else if (visualize === "max_repeat")
      rangesGroup = rangesGroup.concat(
        strlib.enumIfGroup(inputStr, strlib.isMaxRepeat),
      );
    else if (visualize === "lz77")
      rangesGroup = rangesGroup.concat(strlib.lz77(inputStr));
    else if (visualize === "lz78")
      rangesGroup = rangesGroup.concat(strlib.lz78(inputStr));
    else if (visualize === "lyndon_factorization")
      rangesGroup = rangesGroup.concat(strlib.lyndonFactorization(inputStr));
    else if (visualize === "lyndon_array")
      rangesGroup = rangesGroup.concat(strlib.lyndonArray(inputStr));
    else if (visualize === "enum_lyndon")
      rangesGroup = rangesGroup.concat(strlib.enumLyndon(inputStr));
    else if (visualize === "prev_smaller_suffix")
      rangesGroup = rangesGroup.concat(strlib.prevSmallerSuffixes(inputStr));
    else if (visualize === "next_smaller_suffix")
      rangesGroup = rangesGroup.concat(strlib.nextSmallerSuffixes(inputStr));
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
