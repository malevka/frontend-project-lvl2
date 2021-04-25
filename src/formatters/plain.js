import _ from 'lodash';
import TYPES from '../types.js';

const stringifyValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};
const formatAsPlain = (diff, parentKey = '') => {
  const result = diff.map(({
    key, value, type, child, newValue,
  }) => {
    const path = parentKey !== '' ? `${parentKey}.${key}` : key;
    switch (type) {
      case TYPES.ADDED:
        return `Property '${path}' was added with value: ${stringifyValue(value)}`;
      case TYPES.CHANGED:
        return `Property '${path}' was updated. From ${stringifyValue(value)} to ${stringifyValue(newValue)}`;
      case TYPES.REMOVED:
        return `Property '${path}' was removed`;
      case TYPES.PARENT:
        return formatAsPlain(child, path);
      default:
        return '';
    }
  });
  return _.compact(result).join('\n');
};
export default formatAsPlain;
