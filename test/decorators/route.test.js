import { getProperty } from '../../src/core/descriptor';
import { Get, Controller } from '../../src/decorators';

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
      const routes = getProperty(MyController.prototype, 'routes');
      expect(routes).toBeDefined();
      expect(routes[0]).toMatchObject({
        key: 'index',
        method: 'GET',
        url: '/',
      });
    });
  });
});
