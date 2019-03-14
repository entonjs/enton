const { set, get } = require('./reflect');
const { MetaKeys, MetaTypes } = require('./constants');

module.exports = target => ({
  defineController(name, path) {
    set(target, MetaKeys.TYPE, MetaTypes.controller);
    set(target, MetaKeys.CONTROLLER_NAME, name);
    set(target, MetaKeys.CONTROLLER_PATH, path);
  },

  getController() {
    return {
      [MetaKeys.CONTROLLER_NAME]: get(target, MetaKeys.CONTROLLER_NAME),
      [MetaKeys.CONTROLLER_PATH]: get(target, MetaKeys.CONTROLLER_PATH),
    };
  },
});
