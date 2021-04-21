import { readFileSync } from 'fs';
import path from 'path';
import buildDiffTree from './buildDiffTree.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getExt = (filepath) => path.extname(filepath).slice(1);
export default (sourceFilepath, targetFilepath, formatName = 'stylish') => {
  const sourceData = readFileSync(path.resolve(sourceFilepath), 'utf-8');
  const targetData = readFileSync(path.resolve(targetFilepath), 'utf-8');
  const sourceParsedData = parse(sourceData, getExt(sourceFilepath));
  const targetParsedData = parse(targetData, getExt(targetFilepath));
  const diffTree = buildDiffTree(sourceParsedData, targetParsedData);
  return format(diffTree, formatName);
};
