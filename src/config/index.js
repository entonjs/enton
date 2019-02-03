import { get } from 'lodash';

export { default as read } from './reader';

export default config => (key, defaultValue) => get(config, key, defaultValue);
