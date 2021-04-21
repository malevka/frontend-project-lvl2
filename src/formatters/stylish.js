import TYPES from '../types.js';
import isNode from '../nodes.js';

const getMarker = (action) => {
  const markers = { [TYPES.ADDED]: '+', [TYPES.REMOVED]: '-' };
  const marker = markers[action];
  return marker !== undefined ? marker : ' ';
};
export default (diff) => {
  const ident = ' ';
  const spacesCount = 4;
  const iter = (data, depth) => {
    const indentSize = depth * spacesCount;
    const beforeMarkerCount = 2;
    const currentIdent = ident.repeat(beforeMarkerCount + indentSize);

    if (!isNode(data)) {
      return data;
    }
    const result = data.flatMap(({
      key, value, type, child,
    }) => {
      switch (type) {
        case TYPES.PARENT:
          return `${currentIdent}${getMarker(type)} ${key}: ${iter(
            child,
            depth + 1,
          )}`;
        case TYPES.CHANGED:
          return [`${currentIdent}${getMarker(TYPES.REMOVED)} ${key}: ${iter(
            value.sourceValue,
            depth + 1,
          )}`, `${currentIdent}${getMarker(TYPES.ADDED)} ${key}: ${iter(
            value.targetValue,
            depth + 1,
          )}`];
        default:
          return `${currentIdent}${getMarker(type)} ${key}: ${iter(
            value,
            depth + 1,
          )}`;
      }
    });
    const bracketIndent = ident.repeat(indentSize);
    return ['{', result, `${bracketIndent}}`].flat().join('\n');
  };
  const result = iter(diff, 0);
  return result;
};
