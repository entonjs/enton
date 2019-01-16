import { get } from "lodash";
import readConfig from "./reader";

class Config {
  constructor() {
    this.raw = {};
  }

  load(options) {
    this.raw = readConfig(options.configPath, options.evn);
  }

  get(key, defaultValue) {
    return get(this.raw, key, defaultValue);
  }
}

export default new Config();
