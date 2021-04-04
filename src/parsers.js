import path from 'path';
import yaml from 'js-yaml';

const getParser = (format) => {
  if (format === '.yml') return yaml.safeLoad;
  if (format === '.json') return JSON.parse;
  throw new Error(`unsupported extension ${format}`);
};
export default (filepath, data) => {
  const format = path.extname(filepath);
  const parser = getParser(format);
  try {
    return parser(data);
  } catch (e) {
    throw new Error(`'${filepath}' has incorrect format`);
  }
};
