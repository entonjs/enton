import { set, get } from './reflect';
import { MetaKeys } from './constants';

export default target => ({
  defineRoute(handler, { uri, method }) {
    set(target, handler, {
      uri,
      method,
    });
  },

  getRoute(handler) {
    const routeMetadata = get(target, handler);
    return {
      uri: routeMetadata.get(MetaKeys.ROUTE_URI),
      method: routeMetadata.get(MetaKeys.ROUTE_METHOD),
    };
  },
});
