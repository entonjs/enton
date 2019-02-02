import Metadata from '../metadata';

const Middleware = middleware => (target, name, descriptor) => {
  const middlewareArr = [].concat(middleware);

  if (!descriptor) {
    Metadata(target.prototype).defineMiddleware(middlewareArr);
    return;
  }

  Metadata(target).defineRouteMiddleware(descriptor.value, {
    middlewareArr,
  });
};

export default Middleware;
