import { set } from '../core/metadata';

const Controller = path => target => {
  set(target.prototype, 'name', target.name);
  set(target.prototype, 'path', path || '/');
};

export default Controller;
