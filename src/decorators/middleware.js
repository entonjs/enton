import { setRoute } from './util';
import { setProperty } from '../core/descriptor';

const Middleware = arr => (target, key) => {
  const middlewares = Array.isArray(arr) ? arr : [arr];

  if (typeof target === 'function') {
    setProperty(target.prototype, 'middlewares', middlewares);
  }

  setRoute(target, { key, middlewares });
};

export default Middleware;
