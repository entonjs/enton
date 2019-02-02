import Metadata from '../metadata';

const Controller = imports => target => {
  Metadata(target.prototype).defineImports([].concat(imports));
};

export default Controller;
