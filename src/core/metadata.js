const MetaData = new WeakMap();

const create = target => {
  if (!MetaData.has(target)) {
    MetaData.set(target, new Map());
  }
};

export const get = (target, key) => {
  if (MetaData.has(target)) {
    return key ? MetaData.get(target).get(key) : MetaData.get(target);
  }

  return null;
};

export const set = (target, key, value) => {
  let metadataValue = value;

  create(target);

  if (typeof value === 'object' && !Array.isArray(value)) {
    const keyMetadata = get(target, key) || new Map();
    metadataValue = new Map([...keyMetadata, ...new Map(Object.entries(value))]);
  }

  MetaData.get(target).set(key, metadataValue);
};
