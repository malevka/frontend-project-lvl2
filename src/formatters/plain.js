import _ from 'lodash';
import TYPES from '../types.js';

const stringifyValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

export default (diff) => {
  const iter = (data, ancestorPath) => {
    const result = data.map(({
      key, value, type, child, newValue,
    }) => {
      const path = ancestorPath !== '' ? `${ancestorPath}.${key}` : key;

      switch (type) {
        case TYPES.ADDED:
          return `Property '${path}' was added with value: ${stringifyValue(value)}`;

        case TYPES.CHANGED:
          return `Property '${path}' was updated. From ${stringifyValue(value)} to ${stringifyValue(newValue)}`;

        case TYPES.REMOVED:
          return `Property '${path}' was removed`;

        case TYPES.PARENT:
          return iter(child, path);

        default:
          return '';
      }
    });

    return _.compact(result).join('\n');
  };

  return iter(diff, '');
};
