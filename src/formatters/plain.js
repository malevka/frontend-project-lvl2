import _ from 'lodash';
import TYPES from '../types.js';
import isNode from '../nodes.js';

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};
const buildLog = (path, type, value, newValue) => {
  const stringifiedPath = path.join('.');
  switch (type) {
    case TYPES.ADDED:
      return `Property '${stringifiedPath}' was added with value: ${formatValue(value)}`;
    case TYPES.CHANGED:
      return `Property '${stringifiedPath}' was updated. From ${formatValue(
        value,
      )} to ${formatValue(newValue)}`;
    default:
      return `Property '${stringifiedPath}' was removed`;
  }
};
export default (diff) => {
  const iter = (data, path) => {
    if (!isNode(data)) return [];
    const result = data.flatMap(({
      key, value, type, child, newValue,
    }) => {
      if (type !== TYPES.PARENT && type !== TYPES.UNCHANGED) {
        return buildLog([...path, key], type, value, newValue);
      }
      if (!_.isUndefined(child)) {
        return iter(child, [...path, key]);
      }
      return [];
    });
    return result.join('\n');
  };
  return iter(diff, []);
};
