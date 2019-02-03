import Metadata from '../metadata';

const createRoute = (method, uri) => (target, name, descriptor) => {
  Metadata(target).defineRoute(descriptor.value, {
    uri,
    method,
  });
};

export const Get = url => createRoute('get', url);
export const Post = url => createRoute('post', url);
export const Delete = url => createRoute('delete', url);
export const Put = url => createRoute('put', url);
