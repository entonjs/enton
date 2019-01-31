import { set } from '../core/metadata';

const createRoute = (method, url) => (target, name, descriptor) => {
  set(target, descriptor.value, {
    method,
    url,
    name,
  });
};

export const Get = url => createRoute('get', url);
export const Post = url => createRoute('post', url);
export const Delete = url => createRoute('delete', url);
export const Put = url => createRoute('put', url);
