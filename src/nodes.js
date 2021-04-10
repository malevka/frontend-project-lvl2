import _ from 'lodash';
import TYPES from './types.js';

const nodes = (key, { child, oldValue, newValue }) => {
  if (!_.isUndefined(child)) {
    return [{ key, child, type: TYPES.PARENT }];
  }
  if (oldValue === newValue) {
    return [{ key, value: newValue, type: TYPES.UNCHANGED }];
  }
  if (_.isUndefined(oldValue)) {
    return [{ key, value: newValue, type: TYPES.ADDED }];
  }
  if (_.isUndefined(newValue)) {
    return [{ key, value: oldValue, type: TYPES.REMOVED }];
  }
  return [{ key, value: { oldValue, newValue }, type: TYPES.CHANGED }];
};

export const objectToUnchangedNodes = (object) => _.toPairs(object)
  .flatMap(([key, value]) => {
    const builtValue = _.isPlainObject(value)
      ? objectToUnchangedNodes(value) : value;
    return nodes(key, { oldValue: builtValue, newValue: builtValue });
  });

export const isNode = (data) => (_.isArray(data) && _.has(_.head(data), 'key'));
export default nodes;
