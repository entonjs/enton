const lifecycles = scope => {
  const runHandler = async (action, ...args) => {
    const handler = scope[action];
    const resolvedValue =
      typeof handler === 'function'
        ? await Promise.resolve(handler.call(scope, ...args))
        : await Promise.resolve(...args);

    return resolvedValue;
  };

  return {
    configLoad: (...args) => runHandler('configLoad', ...args),
    init: (...args) => runHandler('init', ...args),
    beforeStart: (...args) => runHandler('beforeStart', ...args),
    start: (...args) => runHandler('start', ...args),
    onError: (...args) => runHandler('onError', ...args),
  };
};

module.exports = lifecycles;
