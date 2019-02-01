import { Router } from 'express';
import { get } from './metadata';

const getRouter = (controller, scope) => {
  const target = controller.prototype;
  const path = get(target, 'path');
  const controllerMiddlewares = get(target, 'middlewares');
  const router = Router();

  if (controllerMiddlewares) {
    router.use(...controllerMiddlewares);
  }

  Object.getOwnPropertyNames(target).forEach(key => {
    const handler = target[key];
    const routeMeta = get(target, handler);

    if (routeMeta) {
      const url = routeMeta.get('url');
      const middlewares = routeMeta.get('middlewares') || [];
      const method = routeMeta.get('method');

      router[method](url, ...middlewares, (req, res, next) => {
        handler.call(scope, req, res, next);
      });
    }
  });

  return [path, router];
};

const defineRoute = (app, Controller) => {
  const router = getRouter(Controller, new Controller());
  app.use(...router);
};

export default defineRoute;
