import fs from 'fs';
import path from 'path';
import { merge } from 'lodash';

const DEFAULT_CONFIG_FILE = 'config.js';
const ENV_CONFIG_PATTERN = '**.config.js';

const readConfigFile = async filePath => {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
};

const isFileExists = filePath => fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();

const read = async (configPath, env) => {
  const nodeEnv = env || process.env.NODE_ENV;
  const configRoot = path.join(process.cwd(), configPath);
  let configContent = {};

  if (!fs.existsSync(configRoot)) {
    return {};
  }

  if (fs.lstatSync(configRoot).isFile()) {
    configContent = await readConfigFile(configRoot);
  }

  if (fs.lstatSync(configRoot).isDirectory) {
    const configFiles = [DEFAULT_CONFIG_FILE];

    if (nodeEnv) {
      configFiles.push(ENV_CONFIG_PATTERN.replace('**', nodeEnv));
    }

    configFiles.forEach(async filePath => {
      const configFilePath = path.join(configRoot, filePath);

      if (isFileExists(configFilePath)) {
        const config = await readConfigFile(configFilePath);
        merge(configContent, config);
      }
    });
  }

  return configContent;
};

export default read;
