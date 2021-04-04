import _ from "lodash";
import plain from "./plain.js";
import stylish from "./stylish.js";

const formatters = {
  stylish,
  plain,
};

export default (formatName) => {
  if (!_.has(formatters, formatName))
    throw new Error(`Unknown format ${formatName}`);
  return formatters[formatName];
};
