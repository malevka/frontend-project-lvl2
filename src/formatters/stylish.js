import _ from 'lodash';
import ACTIONS from '../actions.js';

const getMarker = (action) => {
  const markers = { [ACTIONS.ADDED]: '+', [ACTIONS.REMOVED]: '-' };
  const marker = markers[action];
  return marker !== undefined ? marker : ' ';
};
export default (diff) => {
  const ident = ' ';
  const spacesCount = 4;
  const iter = (data, depth) => {
    if (typeof data !== 'object' || _.isNull(data)) {
      return _.isNull(data) ? null : data.toString();
    }
    const indentSize = depth * spacesCount;
    const beforeMarkerCount = 2;
    const currentIdent = ident.repeat(beforeMarkerCount + indentSize);
    const result = data.flatMap(({ key, value, action }) => {
      if (action === ACTIONS.UPDATED) {
        const [oldValue, newValue] = value;
        return [
          `${currentIdent}${getMarker(ACTIONS.REMOVED)} ${key}: ${iter(
            oldValue,
            depth + 1,
          )}`,
          `${currentIdent}${getMarker(ACTIONS.ADDED)} ${key}: ${iter(
            newValue,
            depth + 1,
          )}`,
        ];
      }
      return `${currentIdent}${getMarker(action)} ${key}: ${iter(
        value,
        depth + 1,
      )}`;
    });
    const bracketIndent = ident.repeat(indentSize);
    return ['{', result, `${bracketIndent}}`].flat().join('\n');
  };
  return iter(diff, 0);
};
