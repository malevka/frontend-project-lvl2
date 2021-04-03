import readData from "./src/read-data.js";
import buildDiff from "./src/build-diff.js";
import parse from "./src/parsers.js";
import stylish from "./src/stylish.js";

export default (sourceFilepath, targetFilepath) => {
  try {
    const sourceParsedData = parse(sourceFilepath, readData(sourceFilepath));
    const targetParsedData = parse(targetFilepath, readData(targetFilepath));
    const diff = buildDiff(sourceParsedData, targetParsedData);
    return stylish(diff);
  } catch (e) {
    console.error(e.message);
  }
  return "";
};
