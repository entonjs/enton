import Controller from '../../src/decorators/controller';
import { getDescriptor } from '../../src/core/descriptor';

describe('@Controller', () => {
  describe('given a class with @Controller decorator', () => {
    @Controller('/path')
    class MyController {}

    test('descriptor updated with name and path', () => {
      const descriptor = getDescriptor(MyController.prototype);
      expect(descriptor).toBeDefined();
      expect(descriptor.name).toBe('MyController');
      expect(descriptor.path).toBe('/path');
    });
  });

  describe('given a class with @Controller decorator without path param', () => {
    @Controller()
    class MyController {}

    test('descriptor updated with name and default path', () => {
      const descriptor = getDescriptor(MyController.prototype);
      expect(descriptor).toBeDefined();
      expect(descriptor.name).toBe('MyController');
      expect(descriptor.path).toBe('/');
    });
  });
});
