const pkg = require('read-pkg');

const createAppContext = async app => {
  const appRoot = process.cwd();
  const packageManifest = await pkg();

  return {
    VERSION: packageManifest.version,
    name: packageManifest.name,
    appRoot,
    app,
  };
};

module.exports = createAppContext;
