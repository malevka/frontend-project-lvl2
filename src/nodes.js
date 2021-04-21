import _ from 'lodash';

export default (data) => (_.isArray(data) && _.has(_.head(data), 'key'));
