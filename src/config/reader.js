import fs from 'fs';
import path from 'path';
import { merge } from 'lodash';

const DEFAULT_CONFIG_FILE = 'config.js';
const ENV_CONFIG_PATTERN = '**.config.js';

const readConfigFile = filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
};

const isFileExists = filePath => fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();

const readConfig = (configPath, env) => {
  const nodeEnv = env || process.env.NODE_ENV;
  const configRoot = path.join(process.cwd(), configPath);

  if (!fs.existsSync(configRoot)) {
    return {};
  }

  if (fs.lstatSync(configRoot).isFile()) {
    return readConfigFile(configRoot);
  }

  const configFiles = [DEFAULT_CONFIG_FILE];

  if (nodeEnv) {
    configFiles.push(ENV_CONFIG_PATTERN.replace('**', nodeEnv));
  }

  const configContent = {};

  configFiles.forEach(filePath => {
    const configFilePath = path.join(configRoot, filePath);

    if (isFileExists(configFilePath)) {
      merge(configContent, readConfigFile(configFilePath));
    }
  });

  return configContent;
};

export default readConfig;
