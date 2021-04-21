import _ from 'lodash';

export const isNode = (data) => (_.isArray(data) && _.has(_.head(data), 'key'));
