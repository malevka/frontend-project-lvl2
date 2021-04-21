import { readFileSync } from 'fs';
import path from 'path';
import buildDiffTree from './buildDiffTree.js';
import parse from './parsers.js';
import format from './formatters/index.js';

export default (sourceFilepath, targetFilepath, formatName = 'stylish') => {
  const sourceData = readFileSync(path.resolve(sourceFilepath)).toString();
  const targetData = readFileSync(path.resolve(targetFilepath)).toString();
  const sourceFormat = path.extname(sourceFilepath).slice(1);
  const targetFormat = path.extname(targetFilepath).slice(1);
  const sourceParsedData = parse(sourceFormat, sourceData);
  const targetParsedData = parse(targetFormat, targetData);
  const diffTree = buildDiffTree(sourceParsedData, targetParsedData);
  return format(diffTree, formatName);
};
