import path from 'path';
import yaml from 'js-yaml';

export default (filepath, data) => {
  const format = path.extname(filepath);
  let { parse } = JSON;
  if (format === '.yml') parse = yaml.safeLoad;
  try {
    return parse(data);
  } catch (e) {
    throw new Error(`'${filepath}' has incorrect format`);
  }
};
