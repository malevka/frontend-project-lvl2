import _ from 'lodash';
import formatAsPlain from './plain.js';
import formatAsStylish from './stylish.js';
import formatAsJson from './json.js';

const formatters = {
  stylish: formatAsStylish,
  plain: formatAsPlain,
  json: formatAsJson,
};

export default (diffTree, formatName) => {
  if (!_.has(formatters, formatName)) throw new Error(`Unknown format ${formatName}`);
  return formatters[formatName](diffTree);
};
