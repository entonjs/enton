const controller = require('./controller');
const middleware = require('./middleware');
const route = require('./route');
const use = require('./use');

const metadata = target => ({
  ...controller(target),

  ...middleware(target),

  ...route(target),

  ...use(target),
});

module.exports = metadata;
