import { MetaKeys } from './constants';
import { get, set } from './reflect';

export default target => ({
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
