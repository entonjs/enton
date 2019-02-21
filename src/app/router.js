import { Router } from 'express';
import Metadata from '../metadata';

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

    router[method](...args, (req, res) => {
      const params = Object.values(req.params);

      Promise.resolve(handler.call(controller, ...params, req.query)).then(data => {
        res.send(data);
      });
    });
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

export default create;
