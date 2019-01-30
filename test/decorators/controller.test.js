import Controller from '../../src/decorators/controller';
import { get } from '../../src/core/metadata';

describe('@Controller', () => {
  describe('given a class with @Controller decorator', () => {
    @Controller('/path')
    class MyController {}

    it('should update metadata with name and path', () => {
      const name = get(MyController.prototype, 'name');
      const path = get(MyController.prototype, 'path');

      expect(name).toBe('MyController');
      expect(path).toBe('/path');
    });
  });

  describe('given a class with @Controller decorator without a path', () => {
    @Controller()
    class MyController {}

    it('should update metadata with name and default path', () => {
      const name = get(MyController.prototype, 'name');
      const path = get(MyController.prototype, 'path');

      expect(name).toBe('MyController');
      expect(path).toBe('/');
    });
  });
});
