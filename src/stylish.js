import _ from "lodash";

const getMarker = (action) => {
  const markers = { added: "+", removed: "-" };
  const marker = markers[action];
  return marker !== undefined ? marker : " ";
};
export default (diff) => {
  const ident = " ";
  const spacesCount = 4;
  const iter = (data, depth) => {
    if (typeof data !== "object" || _.isNull(data))
      return _.isNull(data) ? null : data.toString();
    const indentSize = depth * spacesCount;
    const beforeMarkerCount = 2;
    const currentIdent = ident.repeat(beforeMarkerCount + indentSize);
    const result = data.map(
      ({ key, value, action }) =>
        `${currentIdent}${getMarker(action)} ${key}:${
          value !== "" ? ` ${iter(value, depth + 1)}` : ""
        }`
    );
    const bracketIndent = ident.repeat(indentSize);
    return ["{", result, `${bracketIndent}}`].flat().join("\n");
  };
  return iter(diff, 0);
};
