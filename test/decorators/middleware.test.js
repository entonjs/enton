import { Controller, Get, Middleware, getRoute } from '../../src/decorators';
import { getProperty } from '../../src/core';

describe('@Middleware', () => {
  describe('given a controller with @Middleware', () => {
    const testMiddleware = () => {};

    @Controller('/path')
    @Middleware(testMiddleware)
    class MyController {
      @Get('/')
      @Middleware(testMiddleware)
      index() {
        this.response = 'test';
      }
    }

    test('controllers descriptor updated with middleware', () => {
      const middlewares = getProperty(MyController.prototype, 'middlewares');
      expect(middlewares).toBeDefined();
      expect(middlewares).toHaveLength(1);
      expect(middlewares[0]).toBe(testMiddleware);
    });

    test('route updated with middleware', () => {
      const route = getRoute(MyController.prototype, 'index');
      expect(route.middlewares).toBeDefined();
      expect(route.middlewares).toHaveLength(1);
    });
  });

  describe('given a controller with @Middleware and array', () => {
    const testMiddleware = () => {};
    const testMiddleware2 = () => {};

    @Controller('/path')
    @Middleware([testMiddleware, testMiddleware2])
    class MyController {
      @Get('/')
      index() {
        this.response = 'test';
      }
    }

    test('controllers descriptor updated with middleware', () => {
      const middlewares = getProperty(MyController.prototype, 'middlewares');
      expect(middlewares).toBeDefined();
      expect(middlewares).toHaveLength(2);
      expect(middlewares[0]).toBe(testMiddleware);
      expect(middlewares[1]).toBe(testMiddleware2);
    });
  });
});
