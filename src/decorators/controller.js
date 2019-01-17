import { set } from '../core/descriptor';

function Controller(path) {
  return target => {
    set(target.prototype, 'name', target.name);
    set(target.prototype, 'path', path || '/');
  };
}

export default Controller;
