import { configReader } from '../../src/config';

describe('configReader', () => {
  describe('given a config.json', () => {
    let configContent;

    beforeEach(async () => {
      configContent = await configReader('test/config/fixtures/config.json');
    });

    it('should read config file', () => {
      const configFixture = require('./fixtures/config.json'); // eslint-disable-line global-require
      expect(configContent).toBeDefined();
      expect(configContent).toEqual(configFixture);
    });
  });

  describe('given a config collection', () => {
    let configContent;

    beforeEach(async () => {
      configContent = await configReader('test/config/fixtures/config');
    });

    it('should read config file', () => {
      expect(configContent).toBeDefined();
      expect(configContent.a).toEqual(30);
      expect(configContent.b.ba).toEqual('ba');
      expect(configContent.b.bb).toEqual('bb-m');
    });
  });
});
