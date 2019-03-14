import { Use } from '../../lib/decorators';
import Metadata from '../../lib/metadata';

describe('@Use', () => {
  describe('given a class with @Use', () => {
    class Test {}
    class Test2 {}

    @Use(Test)
    class App {}

    it('should import given module', () => {
      const metadata = Metadata(App.prototype).getImports();
      expect(metadata).toBeDefined();
      expect(metadata).toHaveLength(1);
      expect(metadata[0]).toBe(Test);
    });

    describe('when array of imports define', () => {
      @Use([Test, Test2])
      class MyController {
        index() {}
      }

      it('should import array of modules', () => {
        const metadata = Metadata(MyController.prototype).getImports();
        expect(metadata).toBeDefined();
        expect(metadata).toHaveLength(2);
        expect(metadata[0]).toBe(Test);
        expect(metadata[1]).toBe(Test2);
      });
    });
  });
});
