import readData from "./src/read-data.js";
import printDiff from "./src/print-diff.js";

export default (sourceFilepath, targetFilepath) => {
  try {
    const sourceParsedData = JSON.parse(readData(sourceFilepath));
    const targetParsedData = JSON.parse(readData(targetFilepath));
    printDiff(sourceParsedData, targetParsedData);
  } catch (e) {
    console.error(e.message);
  }
};
