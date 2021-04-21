import _ from 'lodash';
import TYPES from './types.js';

const getNode = (key, { child, sourceValue, targetValue }) => {
  if (!_.isUndefined(child)) {
    return { key, child, type: TYPES.PARENT };
  }
  if (sourceValue === targetValue) {
    return { key, value: sourceValue, type: TYPES.UNCHANGED };
  }
  if (_.isUndefined(sourceValue)) {
    return { key, value: targetValue, type: TYPES.ADDED };
  }
  if (_.isUndefined(targetValue)) {
    return { key, value: sourceValue, type: TYPES.REMOVED };
  }
  return { key, value: { sourceValue, targetValue }, type: TYPES.CHANGED };
};

const buildDiffTree = (source, target) => {
  const sortedKeys = _.sortBy(
    _.union(_.keys(source), _.keys(target)),
  );
  return sortedKeys.map((key) => {
    const sourceValue = source[key];
    const targetValue = target[key];
    if (_.isPlainObject(sourceValue) && _.isPlainObject(targetValue)) {
      return getNode(key, { child: buildDiffTree(sourceValue, targetValue) });
    }
    const oldValue = _.isPlainObject(sourceValue)
      ? buildDiffTree(sourceValue, sourceValue) : sourceValue;
    const newValue = _.isPlainObject(targetValue)
      ? buildDiffTree(targetValue, targetValue) : targetValue;
    return getNode(key, { targetValue: newValue, sourceValue: oldValue });
  });
};

export default buildDiffTree;
