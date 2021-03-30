import readData from "./src/read-data.js";
import buildDiff from "./src/build-diff.js";

export default (sourceFilepath, targetFilepath) => {
  try {
    const sourceParsedData = JSON.parse(readData(sourceFilepath));
    const targetParsedData = JSON.parse(readData(targetFilepath));
    return buildDiff(sourceParsedData, targetParsedData);
  } catch (e) {
    console.error(e.message);
  }
};
