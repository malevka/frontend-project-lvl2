import { jest } from "@jest/globals";
import { fileURLToPath } from "url";
import path from "path";
import genDiff from "../index.js";
import readData from "../src/read-data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

test("read file content", () => {
  const sourcePath = getFixturePath("test1.json");
  const expectedType = "string";
  expect(typeof readData(sourcePath)).toMatch(expectedType);
});

test("return error because of wrong file path", () => {
  const sourcePath = "test1.json";
  expect(() => readData(sourcePath)).toThrow();
});

test("compare plain json files", () => {
  const sourcePath = getFixturePath("test1.json");
  const targetPath = getFixturePath("test2.json");
  const result =
    "{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}";

  expect(genDiff(sourcePath, targetPath)).toMatch(result);
});

test("compare files with wrong paths", () => {
  const sourcePath = "test1.json";
  const targetPath = "test2.json";
  const consoleSpy = jest.spyOn(console, "error");
  const expectedResult = `'${path.resolve(sourcePath)}' does not exist`;
  genDiff(sourcePath, targetPath);
  expect(consoleSpy).toHaveBeenCalledWith(expectedResult);
});
