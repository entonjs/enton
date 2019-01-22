import { setProperty } from '../core/descriptor';

function Controller(path) {
  return target => {
    setProperty(target.prototype, 'name', target.name);
    setProperty(target.prototype, 'path', path || '/');
  };
}

export default Controller;
