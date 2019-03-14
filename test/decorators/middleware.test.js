import { Controller, Middleware, Get } from '../../lib/decorators';
import Metadata from '../../lib/metadata';

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
      const metadata = Metadata(MyController.prototype).getMiddleware();
      expect(metadata).toBeDefined();
      expect(metadata).toHaveLength(1);
      expect(metadata[0]).toBe(testMiddleware);
    });

    it('should update route metadata with middleware', () => {
      const metadata = Metadata(MyController.prototype).getMiddleware();
      expect(metadata).toBeDefined();
      expect(metadata).toHaveLength(1);
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
      const metadata = Metadata(MyController.prototype).getMiddleware();
      expect(metadata).toBeDefined();
      expect(metadata).toHaveLength(2);
      expect(metadata[0]).toBe(testMiddleware);
      expect(metadata[1]).toBe(testMiddleware2);
    });
  });
});
