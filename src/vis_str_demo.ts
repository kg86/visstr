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

const draw = (e: Event) => {
    // get font size
    let font_size = parseInt(radioValue("[name=font_size]"));
    // get line style
    let range_style = radioValue("[name=line_style]");
    const line_style_right = radioValue("[name=line_style_right]");

    range_style += line_style_right.length === 0 ? "" : "," + line_style_right;
    let visualize = radioValue("[name=visualize]");
    console.log(
        `font_size=${font_size}, line_style=${range_style}, visualize=${visualize}`
    );

    // get input string
    const elm = document.querySelector("#input_str") as HTMLInputElement;
    let input_str = elm.value;

    // get canvas
    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    // canvas.width = window.innerWidth - 50
    const visStr = new VisStr(canvas, (font_size = font_size));

    // compute ranges
    let rangesp: RangeSimple[] = [];
    let ranges_group: RangeSimple[][] = [];
    let ranges: Range[][] = [];

    const show_effective_alphabet = (
        document.getElementById("effective_alphabet") as HTMLInputElement
    ).checked;
    const show_rank_array = (
        document.getElementById("rank_array") as HTMLInputElement
    ).checked;

    if (show_effective_alphabet) {
        ranges_group.push([
            [
                -1,
                input_str.length - 1,
                ["eStr", ...strlib.replaceEffectiveAlphabet(input_str)],
            ],
        ] as RangeSimple[]);
    }
    if (show_rank_array) {
        ranges_group.push([
            [-1, input_str.length - 1, ["rank", ...strlib.rankArray(input_str)]],
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
            rangesp = strlib.enumRuns(input_str) as RangeSimple[];
        } else if (visualize === "palindromes") {
            rangesp = strlib.enumPalindromes(input_str) as RangeSimple[];
        } else if (visualize === "squares") {
            rangesp = strlib.enumSquares(input_str) as RangeSimple[];
        } else if (visualize === "rmostsquares") {
            rangesp = strlib.enumRightmostSquares(input_str) as RangeSimple[];
        } else if (visualize === "lmostsquares") {
            rangesp = strlib.enumLeftmostSquares(input_str) as RangeSimple[];
        }
        console.log("rangesp", rangesp);
        ranges_group = ranges_group.concat(
            visStr.nonOverlapRangesSimple(rangesp)
        );
        console.log("range_group", ranges_group);
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        console.log("rangesp", ranges);
    } else {
        if (visualize === "lpf")
            ranges_group = ranges_group.concat(strlib.enumPrevOccLPF(input_str));
        else if (visualize === "left_maximal")
            ranges_group = ranges_group.concat(
                strlib.enumIfGroup(input_str, strlib.isLeftMaximal)
            );
        else if (visualize === "right_maximal")
            ranges_group = ranges_group.concat(
                strlib.enumIfGroup(input_str, strlib.isRightMaximal)
            );
        else if (visualize === "max_repeat")
            ranges_group = ranges_group.concat(
                strlib.enumIfGroup(input_str, strlib.isMaxRepeat)
            );
        else if (visualize === "lz77")
            ranges_group = ranges_group.concat(strlib.lz77(input_str));
        else if (visualize === "lz78")
            ranges_group = ranges_group.concat(strlib.lz78(input_str));
        else if (visualize === "lyndon_factorization")
            ranges_group = ranges_group.concat(
                strlib.lyndonFactorization(input_str)
            );
        else if (visualize === "lyndon_array")
            ranges_group = ranges_group.concat(strlib.lyndonArray(input_str));
        else if (visualize === "enum_lyndon")
            ranges_group = ranges_group.concat(strlib.enumLyndon(input_str));
        else if (visualize === "prev_smaller_suffix")
            ranges_group = ranges_group.concat(
                strlib.prevSmallerSuffixes(input_str)
            );
        else if (visualize === "next_smaller_suffix")
            ranges_group = ranges_group.concat(
                strlib.nextSmallerSuffixes(input_str)
            );
        ranges = visStr.makeGroupRangesAutoColor(ranges_group, range_style);
        ranges = strlib.flat(ranges.map((x) => visStr.nonOverlapRanges(x)));
    }

    visStr.draw(input_str, ranges);
};

const selectorAddEvent = (
    selector: string,
    event: string,
    func: EventListener
) => {
    const elms = document.querySelectorAll<HTMLInputElement>(selector);
    for (let i = 0; i < elms.length; i++) {
        elms[i].addEventListener(event, func);
    }
};

const main = () => {
    const input_str = document.getElementById("input_str") as HTMLElement;
    input_str.addEventListener("input", draw);
    input_str.addEventListener("propertychange", draw);

    // add event for radio buttons
    selectorAddEvent("[name=font_size]", "click", draw);
    selectorAddEvent("[name=line_style]", "click", draw);
    selectorAddEvent("[name=line_style_right]", "click", draw);
    selectorAddEvent("[name=visualize]", "click", draw);
    selectorAddEvent("[type=checkbox]", "click", draw);

    // draw initially.
    input_str.dispatchEvent(
        new CustomEvent("propertychange", { detail: "init event" })
    );
};

main();
