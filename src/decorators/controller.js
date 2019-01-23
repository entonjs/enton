import { setProperty } from '../core/descriptor';

const Controller = path => target => {
  setProperty(target.prototype, 'name', target.name);
  setProperty(target.prototype, 'path', path || '/');
};

export default Controller;
