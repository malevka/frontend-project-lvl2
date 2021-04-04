import _ from "lodash";

export default (diff) => {
  const iter = (data) => {
    if (!_.isArray(data) || !_.has(_.head(data), "key"))
      return _.isNull(data) ? null : data.toString();
    const result = data.map(({ key, value, action }) => ({
      key,
      value: iter(value),
      action,
    }));

    return result;
  };
  return JSON.stringify(iter(diff));
};
