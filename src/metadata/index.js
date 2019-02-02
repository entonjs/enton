import { MetaTypes } from './constants';
import { get } from './reflect';
import controller from './controller';
import middleware from './middleware';
import route from './route';

const metadata = target => ({
  getType() {
    return get(target, MetaTypes.TYPE);
  },

  ...controller(target),

  ...middleware(target),

  ...route(target),
});

export default metadata;
