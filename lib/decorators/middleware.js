const Metadata = require('../metadata');

const Middleware = middleware => (target, name, descriptor) => {
  const middlewareArr = [].concat(middleware);

  if (!descriptor) {
    Metadata(target.prototype).defineMiddleware(middlewareArr);
    return;
  }

  Metadata(target).defineRouteMiddleware(descriptor.value, middlewareArr);
};

module.exports = Middleware;
