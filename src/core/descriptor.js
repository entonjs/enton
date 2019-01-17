import { get as _get, set as _set } from 'lodash';

const INFINITY_DESCRIPTOR = '__INFINITY_DESCRIPTOR';

const getDescriptor = target => target[INFINITY_DESCRIPTOR];

export const get = (target, key) => {
  const descriptor = getDescriptor(target) || {};

  if (key) {
    return _get(descriptor, key);
  }

  return descriptor;
};

export const set = (target, key, value) => {
  let descriptor = getDescriptor(target);
  const targetObject = target;

  if (!descriptor) {
    descriptor = {};
    targetObject[INFINITY_DESCRIPTOR] = descriptor;
  }

  _set(descriptor, key, value);
};
