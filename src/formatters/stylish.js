import _ from 'lodash';
import TYPES from '../types.js';

const ident = ' ';

const getIdentSize = (depth) => {
  const spacesCount = 4;
  return depth * spacesCount;
};

const getMarker = (type) => {
  if (!type) {
    return ident;
  }
  const markers = { [TYPES.ADDED]: '+', [TYPES.REMOVED]: '-' };
  const marker = markers[type];

  return marker !== undefined ? marker : ident;
};

const formatStyledKey = (depth, key, type) => {
  const beforeMarkerCount = 2;
  const currentIdent = ident.repeat(beforeMarkerCount + getIdentSize(depth));

  return `${currentIdent}${getMarker(type)} ${key}`;
};

const stringifyValue = (nodeValue, depth) => {
  if (!_.isObject(nodeValue)) {
    return nodeValue;
  }

  const nodes = _.toPairs(nodeValue).map(([key, value]) => ({ key, value }));
  const result = nodes.flatMap(({ key, value }) => {
    const styledKey = formatStyledKey(depth, key);
    return `${styledKey}: ${stringifyValue(value, depth + 1)}`;
  });
  const bracketIndent = ident.repeat(getIdentSize(depth));

  return ['{', result, `${bracketIndent}}`].flat().join('\n');
};

export default (diff) => {
  const iter = (data, depth) => {
    const result = data.flatMap(({
      key, value, type, child, newValue,
    }) => {
      const styledKey = formatStyledKey(depth, key, type);
      switch (type) {
        case TYPES.PARENT:
          return `${styledKey}: ${iter(child, depth + 1)}`;
        case TYPES.CHANGED:
          return [`${formatStyledKey(depth, key, TYPES.REMOVED)}: ${stringifyValue(value, depth + 1)}`,
            `${formatStyledKey(depth, key, TYPES.ADDED)}: ${stringifyValue(newValue, depth + 1)}`];
        default:
          return `${styledKey}: ${stringifyValue(value, depth + 1)}`;
      }
    });
    const bracketIndent = ident.repeat(getIdentSize(depth));

    return ['{', result, `${bracketIndent}}`].flat().join('\n');
  };

  return iter(diff, 0);
};
