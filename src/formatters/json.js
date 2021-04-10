import _ from 'lodash';
import { isNode } from '../nodes';

export default (diff) => {
  const iter = (data) => {
    if (!isNode(data)) {
      return _.isNull(data) ? null : data.toString();
    }

    return data.map(({
      key, value, type, child,
    }) => {
      if (!_.isUndefined(child)) {
        return { key, type, child: iter(child) };
      }
      if (isNode(value)) {
        return { key, type, value: iter(value) };
      }
      return { key, type, value };
    });
  };
  return JSON.stringify(iter(diff));
};
