import { readFileSync } from 'fs';
import path from 'path';
import buildDiff from './buildDiff.js';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';

export default (sourceFilepath, targetFilepath, formatName = 'stylish') => {
  try {
    const sourceData = readFileSync(path.resolve(sourceFilepath)).toString();
    const targetData = readFileSync(path.resolve(targetFilepath)).toString();
    const sourceFormat = path.extname(sourceFilepath).slice(1);
    const targetFormat = path.extname(targetFilepath).slice(1);
    const sourceParsedData = parse(sourceFormat, sourceData);
    const targetParsedData = parse(targetFormat, targetData);
    const diff = buildDiff(sourceParsedData, targetParsedData);
    const formatter = getFormatter(formatName);
    return formatter(diff);
  } catch (e) {
    console.error(e.message);
  }
  return '';
};
