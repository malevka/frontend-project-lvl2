import readData from "./src/read-data.js";
import buildDiff from "./src/build-diff.js";
import parse from "./src/parsers.js";

export default (sourceFilepath, targetFilepath) => {
  let diff = "";
  try {
    const sourceParsedData = parse(sourceFilepath, readData(sourceFilepath));
    const targetParsedData = parse(targetFilepath, readData(targetFilepath));
    diff = buildDiff(sourceParsedData, targetParsedData);
  } catch (e) {
    console.error(e.message);
  }
  return diff;
};
