import _ from "lodash";

export default (source, target) => {
  const unitedKeys = _.union(Object.keys(source), Object.keys(target));
  const sortedKeys = _.sortBy(unitedKeys);

  const compareResult = sortedKeys.map((key) => {
    if (!(key in target)) {
      return `  - ${key}: ${source[key]}\n`;
    }
    if (source[key] !== target[key]) {
      return `${
        key in source ? `  - ${key}: ${source[key]}\n` : ""
      }  + ${key}: ${target[key]}\n`;
    }
    return `    ${key}: ${source[key]}\n`;
  });
  const result = `{\n${compareResult.join("")}}`;
  return result;
};
