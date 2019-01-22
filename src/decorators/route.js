import { setRoute } from './util';

const createRoute = (method, url) => (target, key) => {
  setRoute(target, {
    key,
    method,
    url,
  });
};

export const Get = url => createRoute('GET', url);
export const Post = url => createRoute('POST', url);
export const Delete = url => createRoute('DELETE', url);
export const Put = url => createRoute('Put', url);
