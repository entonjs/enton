const { get } = require('lodash');
const reader = require('./reader');

module.exports = {
  define: config => (key, defaultValue) => get(config, key, defaultValue),
  reader,
};
