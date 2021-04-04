import readData from './src/read-data.js';
import buildDiff from './src/build-diff.js';
import parse from './src/parsers.js';
import getFormatter from './src/formatters/index.js';

export default (sourceFilepath, targetFilepath, formatName = 'stylish') => {
  try {
    const sourceParsedData = parse(sourceFilepath, readData(sourceFilepath));
    const targetParsedData = parse(targetFilepath, readData(targetFilepath));
    const diff = buildDiff(sourceParsedData, targetParsedData);
    const formatter = getFormatter(formatName);
    return formatter(diff);
  } catch (e) {
    console.error(e.message);
  }
  return '';
};
