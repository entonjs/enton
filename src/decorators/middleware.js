import { set } from '../core/metadata';

const Middleware = arr => (target, name, descriptor) => {
  const middlewares = Array.isArray(arr) ? arr : [arr];

  if (typeof target === 'function') {
    set(target.prototype, 'middlewares', middlewares);
    return;
  }

  set(target, descriptor.value, {
    middlewares,
  });
};

export default Middleware;
