import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('compare files', () => {
  const expectedDiffResultStylish = readFileSync(
    getFixturePath('expectedDiffResultStylish'),
    'utf-8',
  );
  const expectedDiffResultJson = readFileSync(getFixturePath('expectedDiffResultJsons'), 'utf-8');
  const expectedDiffResultPlain = readFileSync(getFixturePath('expectedDiffResultPlain'), 'utf-8');
  test.each([
    ['source.json', 'target.json', 'default', expectedDiffResultStylish],
    ['source.yml', 'target.yml', 'default', expectedDiffResultStylish],
    ['source.json', 'target.json', 'stylish', expectedDiffResultStylish],
    ['source.yml', 'target.yml', 'stylish', expectedDiffResultStylish],
    ['source.json', 'target.json', 'plain', expectedDiffResultPlain],
    ['source.yml', 'target.yml', 'plain', expectedDiffResultPlain],
    ['source.json', 'target.json', 'json', expectedDiffResultJson],
    ['source.yml', 'target.yml', 'json', expectedDiffResultJson],
  ])('compare %s and %s files with %s formatter', (originalFile, newFile, formatter, expected) => {
    const originalData = getFixturePath(originalFile);
    const newData = getFixturePath(newFile);
    if (formatter !== 'default') {
      expect(genDiff(originalData, newData, formatter)).toMatch(expected);
    } else {
      expect(genDiff(originalData, newData)).toMatch(expected);
    }
  });
});
