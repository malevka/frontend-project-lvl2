import { readFileSync, existsSync } from "fs";
import path from "path";

export default (filepath) => {
  const absolutePath = path.resolve(filepath);
  if (!existsSync(absolutePath)) {
    throw new Error(`'${absolutePath}' does not exist`);
  }
  return readFileSync(absolutePath);
};
