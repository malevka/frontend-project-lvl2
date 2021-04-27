import _ from 'lodash';
import TYPES from './types.js';

const buildDiffTree = (originalData, newData) => {
  const sortedKeys = _.sortBy(
    _.union(_.keys(originalData), _.keys(newData)),
  );

  return sortedKeys.map((key) => {
    const originalValue = originalData[key];
    const newValue = newData[key];

    if (!_.has(newData, key)) {
      return { type: TYPES.REMOVED, key, value: originalValue };
    }
    if (!_.has(originalData, key)) {
      return { type: TYPES.ADDED, key, value: newValue };
    }
    if (_.isPlainObject(originalValue) && _.isPlainObject(newValue)) {
      return { type: TYPES.PARENT, key, child: buildDiffTree(originalValue, newValue) };
    }
    if (!_.isEqual(originalValue, newValue)) {
      return {
        type: TYPES.CHANGED, key, value: originalValue, newValue,
      };
    }

    return { type: TYPES.UNCHANGED, key, value: originalValue };
  });
};

export default buildDiffTree;
