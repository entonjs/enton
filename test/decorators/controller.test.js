import Controller from '../../src/decorators/controller';
import { get } from '../../src/core/descriptor';

describe('@Controller', () => {
  describe('given a class with @Controller decorator and params', () => {
    @Controller('/path')
    class MyController {}

    test('', () => {
      const descriptor = get(MyController.prototype);
      expect(descriptor).toBeDefined();
      expect(descriptor.name).toBe('MyController');
      expect(descriptor.path).toBe('/path');
    });
  });

  describe('given a class with @Controller decorator and no params', () => {
    @Controller()
    class MyController {}

    test('', () => {
      const descriptor = get(MyController.prototype);
      expect(descriptor).toBeDefined();
      expect(descriptor.name).toBe('MyController');
      expect(descriptor.path).toBe('/');
    });
  });
});
