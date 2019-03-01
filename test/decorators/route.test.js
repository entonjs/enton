import Metadata from '../../src/metadata';
import { Post, Get, Controller, Put, Delete } from '../../src/decorators';

describe('@Routes', () => {
  describe('given a controller with @Get, @Post, @Put and @Delete', () => {
    @Controller('/path')
    class MyController {
      @Get('/')
      index() {
        this.response = 'test';
      }

      @Post('/')
      postData() {}

      @Put('/')
      putData() {}

      @Delete('/:id')
      deleteData() {}
    }

    it('should create metadata for @Get route', () => {
      const metadata = Metadata(MyController.prototype).getRoute(MyController.prototype.index);
      expect(metadata).toBeDefined();
      expect(metadata.method).toBe('get');
      expect(metadata.uri).toBe('/');
    });

    it('should create metadata for @Post route', () => {
      const metadata = Metadata(MyController.prototype).getRoute(MyController.prototype.postData);
      expect(metadata).toBeDefined();
      expect(metadata.method).toBe('post');
      expect(metadata.uri).toBe('/');
    });

    it('should create metadata for @Put route', () => {
      const metadata = Metadata(MyController.prototype).getRoute(MyController.prototype.putData);
      expect(metadata).toBeDefined();
      expect(metadata.method).toBe('put');
      expect(metadata.uri).toBe('/');
    });

    it('should create metadata for @Delete route', () => {
      const metadata = Metadata(MyController.prototype).getRoute(MyController.prototype.deleteData);
      expect(metadata).toBeDefined();
      expect(metadata.method).toBe('delete');
      expect(metadata.uri).toBe('/:id');
    });

    it('should create metadata for all routes', () => {
      const routes = Metadata(MyController.prototype).getRoutes();
      expect(routes).toHaveLength(4);
    });
  });
});
