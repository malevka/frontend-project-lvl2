import _ from 'lodash';
import TYPES from './types.js';

const nodes = (key, value) => {
  const { child, oldValue, newValue } = value;
  const result = [];
  switch (true) {
    case !_.isUndefined(child):
      result.push({ key, child, type: TYPES.PARENT });
      break;
    case oldValue === newValue:
      result.push({ key, value: newValue, type: TYPES.UNCHANGED });
      break;
    case _.isUndefined(oldValue):
      result.push({ key, value: newValue, type: TYPES.ADDED });
      break;
    case _.isUndefined(newValue):
      result.push({ key, value: oldValue, type: TYPES.REMOVED });
      break;
    default:
      result.push({
        key, value: { oldValue, newValue }, type: TYPES.CHANGED,
      });
  }
  return result;
};

export const objectToUnchangedNodes = (object) => _.toPairs(object)
  .flatMap(([key, value]) => {
    const builtValue = _.isPlainObject(value)
      ? objectToUnchangedNodes(value) : value;
    return nodes(key, { oldValue: builtValue, newValue: builtValue });
  });

export const isNode = (data) => (_.isArray(data) && _.has(_.head(data), 'key'));
export default nodes;
