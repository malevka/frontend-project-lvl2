import _ from 'lodash';
import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (diffTree, formatName) => {
  if (!_.has(formatters, formatName)) throw new Error(`Unknown format ${formatName}`);
  return formatters[formatName](diffTree);
};
