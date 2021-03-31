import path from "path";
/* import ini from "ini"; */
import yaml from "js-yaml";

export default (filepath, data) => {
  const format = path.extname(filepath);
  let { parse } = JSON;
  if (format === ".yml") parse = yaml.safeLoad;
  /* if (format === ".ini") return ini.parse(data); */
  try {
    return parse(data);
  } catch (e) {
    throw new Error(`'${filepath}' has incorrect format`);
  }
};
