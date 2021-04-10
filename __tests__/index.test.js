import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('parse data', () => {
  const expectedSourceParsedData = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  test('parse json file', () => {
    const sourcePath = getFixturePath('correct.json');

    const format = path.extname(sourcePath).slice(1);
    expect(parse(format, readFileSync(path.resolve(sourcePath)))).toEqual(expectedSourceParsedData);
  });
  test('parse json file with incorrect format', () => {
    const sourcePath = getFixturePath('incorrect.json');

    const format = path.extname(sourcePath).slice(1);
    expect(() => parse(format, readFileSync(path.resolve(sourcePath)))).toThrow();
  });

  test('parse yaml file', () => {
    const sourcePath = getFixturePath('correct.yml');
    const format = path.extname(sourcePath).slice(1);
    expect(parse(format, readFileSync(path.resolve(sourcePath)))).toEqual(expectedSourceParsedData);
  });
});

describe('compare files', () => {
  const sourceJson = getFixturePath('source.json');
  const targetJson = getFixturePath('target.json');
  const sourceYaml = getFixturePath('source.yml');
  const targetYaml = getFixturePath('target.yml');
  const expectedDiffResultStylish = readFileSync(
    getFixturePath('expectedDiffResultStylish'),
    'utf-8',
  );
  const expectedDiffResultJson = readFileSync(getFixturePath('expectedDiffResultJsons'), 'utf-8');
  const expectedDiffResultPlain = readFileSync(getFixturePath('expectedDiffResultPlain'), 'utf-8');

  test('compare json files with default formatter', () => {
    expect(genDiff(sourceJson, targetJson)).toMatch(expectedDiffResultStylish);
  });
  test('compare yaml files with default formatter', () => {
    expect(genDiff(sourceYaml, targetYaml)).toMatch(expectedDiffResultStylish);
  });
  test('compare json files with stylish formatter', () => {
    expect(genDiff(sourceJson, targetJson, 'stylish')).toMatch(expectedDiffResultStylish);
  });
  test('compare yaml files with with stylish formatter', () => {
    expect(genDiff(sourceYaml, targetYaml, 'stylish')).toMatch(expectedDiffResultStylish);
  });
  test('compare json files with plain formatter', () => {
    expect(genDiff(sourceJson, targetJson, 'plain')).toMatch(expectedDiffResultPlain);
  });
  test('compare yaml files with plain formatter', () => {
    expect(genDiff(sourceYaml, targetYaml, 'plain')).toMatch(expectedDiffResultPlain);
  });

  test('compare json files with json formatter', () => {
    expect(genDiff(sourceJson, targetJson, 'json')).toMatch(expectedDiffResultJson);
  });
  test('compare yaml files with json  formatter', () => {
    expect(genDiff(sourceYaml, targetYaml, 'json')).toMatch(expectedDiffResultJson);
  });
});
