import _ from 'lodash';
import TYPES from './types.js';

const buildDiffTree = (sData, tData) => {
  const sortedKeys = _.sortBy(
    _.union(_.keys(sData), _.keys(tData)),
  );
  return sortedKeys.map((key) => {
    const sValue = sData[key];
    const tValue = tData[key];
    if (!_.has(tData, key)) {
      return { type: TYPES.REMOVED, key, value: sValue };
    }
    if (!_.has(sData, key)) {
      return { type: TYPES.ADDED, key, value: tValue };
    }
    if (_.isPlainObject(sValue) && _.isPlainObject(tValue)) {
      return { type: TYPES.PARENT, key, child: buildDiffTree(sValue, tValue) };
    }
    if (sValue !== tValue) {
      return {
        type: TYPES.CHANGED, key, value: sValue, newValue: tValue,
      };
    }
    return { type: TYPES.UNCHANGED, key, value: sValue };
  });
};

export default buildDiffTree;
