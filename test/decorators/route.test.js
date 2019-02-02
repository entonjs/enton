import { Get, Controller } from '../../src/decorators';
import Metadata from '../../src/metadata';

describe('@Routes', () => {
  describe('given a controller with @Get route', () => {
    @Controller('/path')
    class MyController {
      @Get('/')
      index() {
        this.response = 'test';
      }
    }

    it('should create metadata for @Get route', () => {
      const metadata = Metadata(MyController.prototype).getRoute(MyController.prototype.index);
      expect(metadata).toBeDefined();
      expect(metadata.method).toBe('get');
      expect(metadata.uri).toBe('/');
    });
  });
});
