import { jest } from "@jest/globals";
import { fileURLToPath } from "url";
import path from "path";
import { readFileSync } from "fs";
import genDiff from "../index.js";
import readData from "../src/read-data.js";
import parse from "../src/parsers.js";
import stylish from "../src/formatters/stylish.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

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
describe("compare files", () => {
  const sourceJson = getFixturePath("source.json");
  const targetJson = getFixturePath("target.json");
  const sourceYaml = getFixturePath("source.yml");
  const targetYaml = getFixturePath("target.yml");
  const expectedDiffResultStylish = readFileSync(
    getFixturePath("expectedDiffResultStylish"),
    "utf-8"
  );
  const expectedDiffResultPlain = readFileSync(
    getFixturePath("expectedDiffResultPlain"),
    "utf-8"
  );

  test("compare json files with default formatter", () => {
    expect(genDiff(sourceJson, targetJson)).toMatch(expectedDiffResultStylish);
  });
  test("compare yaml files with default formatter", () => {
    expect(genDiff(sourceYaml, targetYaml)).toMatch(expectedDiffResultStylish);
  });
  test("compare json files with stylish", () => {
    expect(genDiff(sourceJson, targetJson, "stylish")).toMatch(
      expectedDiffResultStylish
    );
  });
  test("compare yaml files with with stylish", () => {
    expect(genDiff(sourceYaml, targetYaml, "stylish")).toMatch(
      expectedDiffResultStylish
    );
  });
  test("compare json files with plain", () => {
    expect(genDiff(sourceJson, targetJson, "plain")).toMatch(
      expectedDiffResultPlain
    );
  });
  test("compare yaml files with plain", () => {
    expect(genDiff(sourceYaml, targetYaml, "plain")).toMatch(
      expectedDiffResultPlain
    );
  });
});
