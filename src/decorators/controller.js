import Metadata from '../metadata';

const Controller = path => target => {
  Metadata(target.prototype).defineController(target.name, path || '/');
};

export default Controller;
