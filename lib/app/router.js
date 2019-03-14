const { Router } = require('express');
const Metadata = require('../metadata');

const getRouter = controller => {
  const proto = Object.getPrototypeOf(controller);
  const routesMeta = Metadata(proto).getRoutes();
  const controllerMeta = Metadata(proto).getController();
  const middlewareMeta = Metadata(proto).getMiddleware();

  const { path } = controllerMeta;
  const controllerMiddlewares = middlewareMeta && middlewareMeta.middleware;

  const router = Router();

  if (controllerMiddlewares) {
    router.use(controllerMiddlewares);
  }

  routesMeta.forEach(routeMeta => {
    const { uri, method, handler } = routeMeta;
    const args = [];
    const middleware = Metadata(proto).getRouteMiddleware(handler);

    if (uri) {
      args.push(uri);
    }

    if (middleware) {
      args.push(...middleware);
    }

    const routeHandler = (req, res) => {
      const { params, method: reqMethod, body } = req;
      const resolvedArgs = [];
      const paramValues = Object.values(params);

      if (paramValues.length) {
        resolvedArgs.push(...paramValues);
      }

      if (['POST', 'PUT', 'DELETE'].includes(reqMethod)) {
        resolvedArgs.push(body);
      }

      resolvedArgs.push(req);
      resolvedArgs.push(res);

      Promise.resolve(handler.call(controller, ...resolvedArgs)).then(data => {
        res.send(data);
      });
    };

    args.push(routeHandler);

    router[method](...args);
  });

  return [path, router];
};

const defineRoute = (express, Controller) => {
  const router = getRouter(new Controller());
  express.use(...router);
};

const create = (express, appInstance) => {
  Metadata(Object.getPrototypeOf(appInstance))
    .getImports()
    .forEach(Controller => defineRoute(express, Controller));
};

module.exports = create;
