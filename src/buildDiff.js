import _ from 'lodash';
import nodes, { objectToUnchangedNodes } from './nodes.js';

export default (source, target) => {
  const iter = (sourceData, targetData) => {
    const sortedKeys = _.sortBy(
      _.union(_.keys(sourceData), _.keys(targetData)),
    );
    return sortedKeys.flatMap((key) => {
      const sourceValue = sourceData[key];
      const targetValue = targetData[key];
      if (_.isPlainObject(sourceValue) && _.isPlainObject(targetValue)) {
        return nodes(key, { child: iter(sourceValue, targetValue) });
      }
      const oldValue = _.isPlainObject(sourceValue)
        ? objectToUnchangedNodes(sourceValue) : sourceValue;
      const newValue = _.isPlainObject(targetValue)
        ? objectToUnchangedNodes(targetValue) : targetValue;
      return nodes(key, { newValue, oldValue });
    });
  };

  return iter(source, target);
};
