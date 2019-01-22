import Controller from '../../src/decorators/controller';
import { getProperty } from '../../src/core/descriptor';
import { Get } from '../../src/decorators/route';

describe('routes', () => {
  describe('given a class with @Controller decorator and params', () => {
    @Controller('/path')
    class MyController {
      @Get('/')
      index() {
        this.response = 'test';
      }
    }

    test('', () => {
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
