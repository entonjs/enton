import { configReader } from '../../src/config';

describe('configReader', () => {
  describe('given a config.json', () => {
    let config;

    beforeEach(async () => {
      config = await configReader('test/config/fixtures/config.json');
    });

    it('should read config file', () => {
      const configFixture = require('./fixtures/config.json'); // eslint-disable-line global-require
      expect(config).toBeDefined();
      expect(config).toEqual(configFixture);
    });
  });
});
