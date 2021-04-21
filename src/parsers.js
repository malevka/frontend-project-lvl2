import yaml from 'js-yaml';

const getParser = (format) => {
  const mapping = {
    yml: yaml.safeLoad,
    json: JSON.parse,
  };
  return mapping[format];
};
export default (data, format) => {
  const parser = getParser(format);
  if (parser === undefined) {
    throw new Error(`unsupported format ${format}`);
  }
  return parser(data);
};
