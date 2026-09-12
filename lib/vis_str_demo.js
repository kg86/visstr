"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const vis_str_1 = require("./vis_str");
const strlib = __importStar(require("./strlib"));
/** Visualizations producing a flat, non-overlapping list of ranges. */
const SIMPLE_VISUALIZERS = {
    runs: strlib.enumRuns,
    palindromes: strlib.enumPalindromes,
    squares: strlib.enumSquares,
    rmostsquares: strlib.enumRightmostSquares,
    lmostsquares: strlib.enumLeftmostSquares,
};
/** Visualizations already producing pre-grouped ranges. */
const GROUP_VISUALIZERS = {
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
    const fontSize = parseInt(radioValue("[name=font_size]"));
    // get line style
    let rangeStyle = radioValue("[name=line_style]");
    const lineStyleRight = radioValue("[name=line_style_right]");
    rangeStyle += lineStyleRight.length === 0 ? "" : "," + lineStyleRight;
    const visualize = radioValue("[name=visualize]");
    // get input string
    const elm = document.querySelector("#input_str");
    const inputStr = elm.value;
    // get canvas
    const canvas = document.querySelector("#canvas");
    // canvas.width = window.innerWidth - 50
    const visStr = new vis_str_1.VisStr(canvas, fontSize);
    // compute ranges
    let rangesGroup = [];
    let ranges = [];
    const showEffectiveAlphabet = document.getElementById("effective_alphabet").checked;
    const showRankArray = document.getElementById("rank_array").checked;
    if (showEffectiveAlphabet) {
        rangesGroup.push([
            [
                -1,
                inputStr.length - 1,
                ["eStr", ...strlib.replaceEffectiveAlphabet(inputStr)],
            ],
        ]);
    }
    if (showRankArray) {
        rangesGroup.push([
            [-1, inputStr.length - 1, ["rank", ...strlib.rankArray(inputStr)]],
        ]);
    }
    if (visualize in SIMPLE_VISUALIZERS) {
        const rangesp = SIMPLE_VISUALIZERS[visualize](inputStr);
        rangesGroup = rangesGroup.concat(visStr.nonOverlapRangesSimple(rangesp));
        ranges = visStr.makeGroupRangesAutoColor(rangesGroup, rangeStyle);
    }
    else if (visualize in GROUP_VISUALIZERS) {
        rangesGroup = rangesGroup.concat(GROUP_VISUALIZERS[visualize](inputStr));
        ranges = visStr.makeGroupRangesAutoColor(rangesGroup, rangeStyle);
        ranges = strlib.flat(ranges.map((x) => visStr.nonOverlapRanges(x)));
    }
    visStr.draw(inputStr, ranges);
};
const selectorAddEvent = (selector, event, func) => {
    const elms = document.querySelectorAll(selector);
    for (let i = 0; i < elms.length; i++) {
        elms[i].addEventListener(event, func);
    }
};
const main = () => {
    const inputStr = document.getElementById("input_str");
    inputStr.addEventListener("input", draw);
    inputStr.addEventListener("propertychange", draw);
    // add event for radio buttons
    selectorAddEvent("[name=font_size]", "click", draw);
    selectorAddEvent("[name=line_style]", "click", draw);
    selectorAddEvent("[name=line_style_right]", "click", draw);
    selectorAddEvent("[name=visualize]", "click", draw);
    selectorAddEvent("[type=checkbox]", "click", draw);
    // draw initially.
    inputStr.dispatchEvent(new CustomEvent("propertychange", { detail: "init event" }));
};
main();
//# sourceMappingURL=vis_str_demo.js.map