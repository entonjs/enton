const { MetaKeys } = require('./constants');
const { get, set } = require('./reflect');

module.exports = target => ({
  defineImports(imports) {
    set(target, MetaKeys.IMPORTS, imports);
  },

  getImports() {
    return get(target, MetaKeys.IMPORTS);
  },
});
