"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMaxRepeat = exports.isRightMaximal = exports.isLeftMaximal = exports.rightExtensions = exports.leftExtensions = void 0;
const util_1 = require("./util");
const leftExtensions = (str, pat) => {
    const res = new Set();
    const fromIdx = 1;
    let pos = str.indexOf(pat, fromIdx);
    while (pos !== -1) {
        res.add(str[pos - 1]);
        pos = str.indexOf(pat, pos + 1);
    }
    return [...res.keys()];
};
exports.leftExtensions = leftExtensions;
const rightExtensions = (str, pat) => {
    const rstr = (0, util_1.reverse)(str);
    const rpat = (0, util_1.reverse)(pat);
    return (0, exports.leftExtensions)(rstr, rpat);
};
exports.rightExtensions = rightExtensions;
const isLeftMaximal = (str, pat) => {
    return (0, exports.leftExtensions)(str, pat).length > 1;
};
exports.isLeftMaximal = isLeftMaximal;
const isRightMaximal = (str, pat) => {
    return (0, exports.rightExtensions)(str, pat).length > 1;
};
exports.isRightMaximal = isRightMaximal;
const isMaxRepeat = (str, pat) => {
    return (0, exports.isLeftMaximal)(str, pat) && (0, exports.isRightMaximal)(str, pat);
};
exports.isMaxRepeat = isMaxRepeat;
//# sourceMappingURL=repeats.js.map