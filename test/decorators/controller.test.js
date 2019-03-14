import Controller from '../../lib/decorators/controller';
import Metadata from '../../lib/metadata';

describe('@Controller', () => {
  describe('given a class with @Controller decorator', () => {
    @Controller('/path')
    class MyController {}

    it('should update metadata with name and path', () => {
      const metadata = Metadata(MyController.prototype).getController();

      expect(metadata.name).toBe('MyController');
      expect(metadata.path).toBe('/path');
    });
  });

  describe('given a class with @Controller decorator without a path', () => {
    @Controller()
    class MyController {}

    it('should update metadata with name and default path', () => {
      const metadata = Metadata(MyController.prototype).getController();

      expect(metadata.name).toBe('MyController');
      expect(metadata.path).toBe('/');
    });
  });
});
