const appHandler = appInstance => {
  const runHandler = async (action, ...args) => {
    const handler = appInstance[action];
    const resolvedValue =
      typeof handler === 'function'
        ? await Promise.resolve(handler.call(appInstance, ...args))
        : await Promise.resolve(...args);

    return resolvedValue;
  };

  return {
    load: (...args) => runHandler('load', ...args),
  };
};

export default appHandler;
