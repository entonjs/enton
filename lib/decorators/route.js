const Metadata = require('../metadata');

const createRoute = (method, uri = '/') => (target, name, descriptor) => {
  Metadata(target).defineRoute(descriptor.value, {
    uri,
    method,
  });
};

module.exports = {
  Get: url => createRoute('get', url),
  Post: url => createRoute('post', url),
  Delete: url => createRoute('delete', url),
  Put: url => createRoute('put', url),
};
