import { Get, Controller } from '../../src/decorators';
import { get } from '../../src/core/metadata';

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
      const metadata = get(MyController.prototype, MyController.prototype.index);
      expect(metadata).toBeDefined();
      expect(metadata.get('name')).toBe('index');
      expect(metadata.get('method')).toBe('get');
      expect(metadata.get('url')).toBe('/');
    });
  });
});
