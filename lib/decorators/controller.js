const Metadata = require('../metadata');

const Controller = path => target => {
  Metadata(target.prototype).defineController(target.name, path || '/');
};

module.exports = Controller;
