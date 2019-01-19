import { get as _get, set as _set } from 'lodash';

const INFINITY_DESCRIPTOR = '__INFINITY_DESC__';

const getDescriptor = target => target[INFINITY_DESCRIPTOR];

export const getDesc = (target, key) => {
  const descriptor = getDescriptor(target) || {};

  if (key) {
    return _get(descriptor, key);
  }

  return descriptor;
};

export const setDesc = (target, key, value) => {
  let descriptor = getDescriptor(target);
  const targetObject = target;

  if (!descriptor) {
    descriptor = {};

    Object.defineProperty(targetObject, INFINITY_DESCRIPTOR, {
      enumerable: false,
      configurable: false,
      writable: true,
    });

    targetObject[INFINITY_DESCRIPTOR] = descriptor;
  }

  _set(descriptor, key, value);
};
