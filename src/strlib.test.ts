import * as strlib from "./strlib";

test("enum palindromes", () => {
    expect(strlib.enumPalindromes("aba")).toStrictEqual([
        [0, 0],
        [1, 1],
        [2, 2],
        [0, 2],
    ]);
});
