const Metadata = require('../metadata');

const Controller = imports => target => {
  Metadata(target.prototype).defineImports([].concat(imports));
};

module.exports = Controller;
