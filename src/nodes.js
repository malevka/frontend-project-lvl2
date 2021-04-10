import _ from 'lodash';
import TYPES from './types.js';

const nodes = (key, { child, oldValue, newValue }) => {
  const result = { key };
  switch (true) {
    case !_.isUndefined(child):
      result.child = child;
      result.type = TYPES.PARENT;
      break;
    case oldValue === newValue:
      result.value = newValue;
      result.type = TYPES.UNCHANGED;
      break;
    case _.isUndefined(oldValue):
      result.value = newValue;
      result.type = TYPES.ADDED;
      break;
    case _.isUndefined(newValue):
      result.value = oldValue;
      result.type = TYPES.REMOVED;
      break;
    default:
      result.value = { oldValue, newValue };
      result.type = TYPES.CHANGED;
  }
  return [result];
};

export const objectToUnchangedNodes = (object) => _.toPairs(object)
  .flatMap(([key, value]) => {
    const builtValue = _.isPlainObject(value)
      ? objectToUnchangedNodes(value) : value;
    return nodes(key, { oldValue: builtValue, newValue: builtValue });
  });

export const isNode = (data) => (_.isArray(data) && _.has(_.head(data), 'key'));
export default nodes;
