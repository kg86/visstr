import * as strlib from "./strlib";

test("enum palindromes", () => {
  expect(strlib.enumPalindromes("aba")).toStrictEqual([
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 3],
  ]);
});

test("isPalindrome", () => {
  expect(strlib.isPalindrome("aba")).toBe(true);
  expect(strlib.isPalindrome("abc")).toBe(false);
});

test("substrings", () => {
  expect(new Set(strlib.substrings("ab"))).toStrictEqual(
    new Set(["a", "b", "ab"]),
  );
});

test("findAll", () => {
  expect(strlib.findAll("abcabc", "abc")).toStrictEqual([
    [0, 3],
    [3, 6],
  ]);
});

test("enumSquares", () => {
  expect(strlib.enumSquares("abab")).toStrictEqual([[0, 4, 2]]);
});

test("enumRightmostSquares", () => {
  expect(strlib.enumRightmostSquares("ababab")).toStrictEqual([
    [1, 5, 2],
    [2, 6, 2],
  ]);
});

test("enumLeftmostSquares", () => {
  expect(strlib.enumLeftmostSquares("ababab")).toStrictEqual([
    [0, 4, 2],
    [1, 5, 2],
  ]);
});

test("enumRuns", () => {
  expect(strlib.enumRuns("aa")).toStrictEqual([[0, 2, 1]]);
});

test("isMaxRepeat", () => {
  // "b" occurs at positions 1 and 3 in "abcbd" preceded/followed by
  // different characters on both sides, so it is a maximal repeat.
  expect(strlib.isMaxRepeat("abcbd", "b")).toBe(true);
  expect(strlib.isMaxRepeat("aaaa", "a")).toBe(false);
});

test("lz77", () => {
  expect(strlib.lz77("aa")).toStrictEqual([
    [
      [0, 1, ["a"]],
      [1, 2, ["f1"]],
    ],
    [
      [0, 1],
      [1, 2],
      [2, 3, ["f2"]],
    ],
  ]);
});

test("lz78", () => {
  expect(strlib.lz78("aa")).toStrictEqual([
    [[0, 2, ["a", "f1"]]],
    [
      [0, 1],
      [1, 2],
      [2, 3, ["f2"]],
    ],
  ]);
});

test("isLyndon", () => {
  expect(strlib.isLyndon("ab")).toBe(true);
  expect(strlib.isLyndon("ba")).toBe(false);
});

test("lyndonFactorization", () => {
  expect(strlib.lyndonFactorization("aab")).toStrictEqual([[[0, 3, 3]]]);
});

test("suffixArray / rankArray", () => {
  const sa = strlib.suffixArray("banana");
  expect(sa).toStrictEqual([5, 3, 1, 0, 4, 2]);
  const rank = strlib.rankArray("banana", sa);
  expect(sa.map((_, i) => rank[sa[i]])).toStrictEqual([0, 1, 2, 3, 4, 5]);
});

test("replaceEffectiveAlphabet", () => {
  expect(strlib.replaceEffectiveAlphabet("bab")).toStrictEqual(["1", "0", "1"]);
});
