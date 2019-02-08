import { get } from 'lodash';

export { default as configReader } from './reader';

export default config => (key, defaultValue) => get(config, key, defaultValue);
