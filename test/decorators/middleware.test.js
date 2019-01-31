import { Controller, Middleware, Get } from '../../src/decorators';
import { get } from '../../src/core/metadata';

describe('@Middleware', () => {
  describe('given a controller with @Middleware', () => {
    const testMiddleware = () => {};

    @Controller('/path')
    @Middleware(testMiddleware)
    class MyController {
      @Middleware(testMiddleware)
      index() {
        this.response = 'test';
      }
    }

    it('should update controller metadata with middlewares', () => {
      const middlewares = get(MyController.prototype, 'middlewares');
      expect(middlewares).toBeDefined();
      expect(middlewares).toHaveLength(1);
      expect(middlewares[0]).toBe(testMiddleware);
    });

    it('should update route metadata with middleware', () => {
      const metadata = get(MyController.prototype, MyController.prototype.index);
      expect(metadata.get('middlewares')).toBeDefined();
      expect(metadata.get('middlewares')).toHaveLength(1);
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

    it('shoud update controller metadata with middlewares', () => {
      const middlewares = get(MyController.prototype, 'middlewares');
      expect(middlewares).toBeDefined();
      expect(middlewares).toHaveLength(2);
      expect(middlewares[0]).toBe(testMiddleware);
      expect(middlewares[1]).toBe(testMiddleware2);
    });
  });
});
