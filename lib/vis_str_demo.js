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
//# sourceMappingURL=vis_str_demo.js.map