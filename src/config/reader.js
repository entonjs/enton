import fs from 'fs';
import path from 'path';
import { merge } from 'lodash';

const DEFAULT_CONFIG_FILE = 'default.json';
const ENV_CONFIG_PATTERN = '**.json';

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

  if (fs.lstatSync(configRoot).isDirectory()) {
    const configFiles = [DEFAULT_CONFIG_FILE];

    if (nodeEnv) {
      configFiles.push(ENV_CONFIG_PATTERN.replace('**', nodeEnv));
    }

    const contentCollection = [];

    for (let i = 0; i < configFiles.length; i += 1) {
      const file = configFiles[i];
      const configFilePath = path.join(configRoot, file);

      if (isFileExists(configFilePath)) {
        contentCollection.push(readConfigFile(configFilePath));
      }
    }

    const config = await Promise.all(contentCollection);

    merge(configContent, ...config);
  }

  return configContent;
};

export default read;
