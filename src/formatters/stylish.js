import _ from 'lodash';
import TYPES from '../types.js';

const ident = ' ';
const getMarker = (action) => {
  const markers = { [TYPES.ADDED]: '+', [TYPES.REMOVED]: '-' };
  const marker = markers[action];
  return marker !== undefined ? marker : ' ';
};
const buildStyledKey = (indentSize, type, key) => {
  const beforeMarkerCount = 2;
  const currentIdent = ident.repeat(beforeMarkerCount + indentSize);
  return `${currentIdent}${getMarker(type)} ${key}`;
};

const isNode = (data) => (_.isArray(data) && _.has(_.head(data), 'key'));

export default (diff) => {
  const spacesCount = 4;
  const iter = (data, depth) => {
    const indentSize = depth * spacesCount;
    if (isNode(data)) {
      const result = data.flatMap(({
        key, value, type, child, newValue,
      }) => {
        const styledKey = buildStyledKey(indentSize, type, key);
        switch (type) {
          case TYPES.PARENT:
            return `${styledKey}: ${iter(child, depth + 1)}`;
          case TYPES.CHANGED:
            return [`${buildStyledKey(indentSize, TYPES.REMOVED, key)}: ${iter(
              value,
              depth + 1,
            )}`, `${buildStyledKey(indentSize, TYPES.ADDED, key)}: ${iter(
              newValue,
              depth + 1,
            )}`];
          default:
            return `${styledKey}: ${iter(value, depth + 1)}`;
        }
      });
      const bracketIndent = ident.repeat(indentSize);
      return ['{', result, `${bracketIndent}}`].flat().join('\n');
    }
    if (_.isPlainObject(data)) {
      const nodes = _.toPairs(data).map(([key, value]) => ({ key, value }));
      return iter(nodes, depth);
    }
    return data;
  };
  return iter(diff, 0);
};
