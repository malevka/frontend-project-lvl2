import _ from "lodash";

export default (source, target) => {
  const unitedKeys = _.union(Object.keys(source), Object.keys(target));
  const sortedKeys = _.sortBy(unitedKeys);

  const buildLog = (key, value, prefix = " ") =>
    `  ${prefix} ${key}: ${value}\n`;

  const compareResult = sortedKeys.map((key) => {
    if (!(key in target)) {
      return buildLog(key, source[key], "-");
    }
    if (source[key] !== target[key]) {
      let result = "";
      if (key in source) result = buildLog(key, source[key], "-");
      result += buildLog(key, target[key], "+");
      return result;
    }
    return buildLog(key, source[key]);
  });
  return `{\n${compareResult.join("")}}`;
};
