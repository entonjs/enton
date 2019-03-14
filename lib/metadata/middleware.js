const { get, set } = require('./reflect');
const { MetaKeys } = require('./constants');

module.exports = target => ({
  defineMiddleware(middleware) {
    set(target, MetaKeys.MIDDLEWARE, middleware);
  },

  getMiddleware() {
    return get(target, MetaKeys.MIDDLEWARE);
  },

  defineRouteMiddleware(handler, middleware) {
    set(target, handler, {
      [MetaKeys.MIDDLEWARE]: middleware,
    });
  },

  getRouteMiddleware(handler) {
    return get(target, handler).get(MetaKeys.MIDDLEWARE);
  },
});
