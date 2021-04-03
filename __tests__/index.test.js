import { jest } from "@jest/globals";
import { fileURLToPath } from "url";
import path from "path";
import { readFileSync } from "fs";
import genDiff from "../index.js";
import readData from "../src/read-data.js";
import parse from "../src/parsers.js";
import stylish from "../src/stylish.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
let expectedDiffResult;

beforeAll(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  expectedDiffResult = readFileSync(
    getFixturePath("expectedDiffResult"),
    "utf-8"
  );
});
test("read file content", () => {
  const expectedContent = readFileSync(getFixturePath("correct.json"), "utf-8");
  const sourcePath = getFixturePath("correct.json");
  expect(readData(sourcePath)).toMatch(expectedContent);
});
test("return error because of wrong file path", () => {
  const sourcePath = "correct.json";
  expect(() => readData(sourcePath)).toThrow();
});

describe("parse data", () => {
  const expectedSourceParsedData = {
    host: "hexlet.io",
    timeout: 50,
    proxy: "123.234.53.22",
    follow: false,
  };
  test("parse json file", () => {
    const sourcePath = getFixturePath("correct.json");
    expect(parse(sourcePath, readData(sourcePath))).toEqual(
      expectedSourceParsedData
    );
  });
  test("parse json file with incorrect format", () => {
    const sourcePath = getFixturePath("incorrect.json");
    expect(() => parse(sourcePath, readData(sourcePath))).toThrow();
  });

  test("parse yaml file", () => {
    const sourcePath = getFixturePath("correct.yml");
    expect(parse(sourcePath, readData(sourcePath))).toEqual(
      expectedSourceParsedData
    );
  });
});

test("build diff tree with stylish", () => {
  const diff = [
    { key: "test1", value: "test1" },
    {
      key: "test2",
      value: [
        { key: "test2_1", value: "test2_1" },
        { key: "test2_2", value: "test2_2", action: "removed" },
      ],
      action: "added",
    },
    { key: "test3", value: "test3", action: "removed" },
  ];

  const result =
    "{\n    test1: test1\n  + test2: {\n        test2_1: test2_1\n      - test2_2: test2_2\n    }\n  - test3: test3\n}";

  expect(stylish(diff)).toMatch(result);
});

test("compare files with wrong paths", () => {
  const sourcePath = "source1.json";
  const targetPath = "target1.json";
  const consoleSpy = jest.spyOn(console, "error");
  const expectedResult = `'${path.resolve(sourcePath)}' does not exist`;
  genDiff(sourcePath, targetPath);
  expect(consoleSpy).toHaveBeenCalledWith(expectedResult);
});

test("compare json files", () => {
  const sourcePath = getFixturePath("source.json");
  const targetPath = getFixturePath("target.json");

  expect(genDiff(sourcePath, targetPath)).toMatch(expectedDiffResult);
});

test("compare yaml files", () => {
  const sourcePath = getFixturePath("source.yml");
  const targetPath = getFixturePath("target.yml");

  expect(genDiff(sourcePath, targetPath)).toMatch(expectedDiffResult);
});
