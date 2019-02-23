import fs from 'fs';
import path from 'path';
import { merge } from 'lodash';

const DEFAULT_CONFIG_FILE = 'config.json';
const ENV_CONFIG_PATTERN = '**.config.json';

const readConfigFile = async filePath =>
  new Promise(resolve => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      resolve(err ? {} : JSON.parse(data));
    });
  });

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
