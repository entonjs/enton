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

    test('new @Get route add to routes', () => {
      const metadata = get(MyController.prototype, MyController.prototype.index);
      expect(metadata).toBeDefined();
      expect(metadata.get('name')).toBe('index');
      expect(metadata.get('method')).toBe('GET');
      expect(metadata.get('url')).toBe('/');
    });
  });
});
