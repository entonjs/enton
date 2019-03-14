const fs = require('fs');
const path = require('path');
const { merge } = require('lodash');

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
  let configContent = {};

  if (!fs.existsSync(configPath)) {
    return {};
  }

  if (fs.lstatSync(configPath).isFile()) {
    configContent = await readConfigFile(configPath);
  }

  if (fs.lstatSync(configPath).isDirectory()) {
    const configFiles = [DEFAULT_CONFIG_FILE];

    if (nodeEnv) {
      configFiles.push(ENV_CONFIG_PATTERN.replace('**', nodeEnv));
    }

    const contentCollection = [];

    for (let i = 0; i < configFiles.length; i += 1) {
      const file = configFiles[i];
      const configFilePath = path.join(configPath, file);

      if (isFileExists(configFilePath)) {
        contentCollection.push(readConfigFile(configFilePath));
      }
    }

    const config = await Promise.all(contentCollection);

    merge(configContent, ...config);
  }

  return configContent;
};

module.exports = {
  read,
};
