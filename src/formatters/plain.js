import _ from 'lodash';
import ACTIONS from '../actions.js';

const formatValue = (value) => {
  if (Array.isArray(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};
const buildLog = (path, action, value = []) => {
  const stringifiedPath = path.join('.');
  if (action === ACTIONS.ADDED) {
    return `Property '${stringifiedPath}' was added with value: ${formatValue(value)}`;
  }
  if (action === ACTIONS.UPDATED) {
    const [oldValue, newValue] = value;
    return `Property '${stringifiedPath}' was updated. From ${formatValue(
      oldValue,
    )} to ${formatValue(newValue)}`;
  }
  return `Property '${stringifiedPath}' was removed`;
};
export default (diff) => {
  const iter = (data, path) => {
    if (!('key' in _.head(data))) return [];
    const result = data.flatMap(({ key, value, action }) => {
      if (action !== undefined) {
        return buildLog([...path, key], action, value);
      }
      if (Array.isArray(value)) {
        return iter(value, [...path, key]);
      }
      return [];
    });
    return result.join('\n');
  };
  return iter(diff, []);
};
