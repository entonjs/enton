import controller from './controller';
import middleware from './middleware';
import route from './route';
import use from './use';

const metadata = target => ({
  ...controller(target),

  ...middleware(target),

  ...route(target),

  ...use(target),
});

export default metadata;
