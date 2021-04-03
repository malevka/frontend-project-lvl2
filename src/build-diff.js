import _ from "lodash";

export default (source, target) => {
  const iter = (oldData, newData) => {
    const sortedKeys = _.sortBy(
      _.union(Object.keys(oldData), Object.keys(newData))
    );
    return sortedKeys.flatMap((key) => {
      if (!_.isEqual(oldData[key], newData[key])) {
        if (!_.has(newData, key)) {
          const value = _.isPlainObject(oldData[key])
            ? iter(oldData[key], oldData[key])
            : oldData[key];
          return { key, value, action: "removed" };
        }
        if (!_.has(oldData, key)) {
          const value = _.isPlainObject(newData[key])
            ? iter(newData[key], newData[key])
            : newData[key];
          return { key, value, action: "added" };
        }
        if (_.isPlainObject(oldData[key]) && _.isPlainObject(newData[key])) {
          return { key, value: iter(oldData[key], newData[key]) };
        }
        const oldValue = _.isPlainObject(oldData[key])
          ? iter(oldData[key], oldData[key])
          : oldData[key];
        const newValue = _.isPlainObject(newData[key])
          ? iter(newData[key], newData[key])
          : newData[key];
        return [
          { key, value: oldValue, action: "removed" },
          { key, value: newValue, action: "added" },
        ];
      }
      const value =
        _.isPlainObject(oldData[key]) || _.isPlainObject(newData[key])
          ? iter(oldData[key], oldData[key])
          : oldData[key];
      return { key, value };
    });
  };

  return iter(source, target);
};
