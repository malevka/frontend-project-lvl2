import _ from 'lodash';
import TYPES from '../types.js';
import { isNode } from '../nodes';

const getMarker = (action) => {
  const markers = { [TYPES.ADDED]: '+', [TYPES.REMOVED]: '-' };
  const marker = markers[action];
  return marker !== undefined ? marker : ' ';
};
export default (diff) => {
  const ident = ' ';
  const spacesCount = 4;
  const iter = (data, depth) => {
    if (!isNode(data)) {
      return _.isNull(data) ? null : data.toString();
    }
    const indentSize = depth * spacesCount;
    const beforeMarkerCount = 2;
    const currentIdent = ident.repeat(beforeMarkerCount + indentSize);
    const result = data.flatMap(({
      key, value, type, child,
    }) => {
      if (type === TYPES.PARENT) {
        return `${currentIdent}${getMarker(type)} ${key}: ${iter(
          child,
          depth + 1,
        )}`;
      }
      if (type === TYPES.CHANGED) {
        return [`${currentIdent}${getMarker(TYPES.REMOVED)} ${key}: ${iter(
          value.oldValue,
          depth + 1,
        )}`, `${currentIdent}${getMarker(TYPES.ADDED)} ${key}: ${iter(
          value.newValue,
          depth + 1,
        )}`];
      }
      return `${currentIdent}${getMarker(type)} ${key}: ${iter(
        value,
        depth + 1,
      )}`;
    });
    const bracketIndent = ident.repeat(indentSize);
    return ['{', result, `${bracketIndent}}`].flat().join('\n');
  };
  const result = iter(diff, 0);
  return result;
};
