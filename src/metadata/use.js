import { MetaKeys } from './constants';
import { get, set } from './reflect';

export default target => ({
  defineImports(imports) {
    set(target, MetaKeys.IMPORTS, imports);
  },

  getImports() {
    return get(target, MetaKeys.IMPORTS);
  },
});
