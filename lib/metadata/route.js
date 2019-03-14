const { set, get } = require('./reflect');
const { MetaKeys } = require('./constants');

module.exports = target => ({
  defineRoute(handler, { uri, method }) {
    set(target, handler, {
      uri,
      method,
    });
  },

  getRoute(handler) {
    const routeMetadata = get(target, handler);

    return (
      routeMetadata && {
        uri: routeMetadata.get(MetaKeys.ROUTE_URI),
        method: routeMetadata.get(MetaKeys.ROUTE_METHOD),
      }
    );
  },

  getRoutes() {
    return Object.getOwnPropertyNames(target)
      .filter(name => typeof target[name] === 'function')
      .reduce((routes, name) => {
        const handler = target[name];
        const route = this.getRoute(handler);

        if (route) {
          routes.push({
            ...route,
            handler,
          });
        }

        return routes;
      }, []);
  },
});
