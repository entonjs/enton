import { set } from '../core/metadata';

const createRoute = (method, url) => (target, name, descriptor) => {
  set(target, descriptor.value, {
    method,
    url,
    name,
  });
};

export const Get = url => createRoute('GET', url);
export const Post = url => createRoute('POST', url);
export const Delete = url => createRoute('DELETE', url);
export const Put = url => createRoute('Put', url);
