import express from 'express';
import routerFactory from './router- factory';

const createApp = appInstance => {
  const expressApp = express();

  const controllers = appInstance.controllers ? appInstance.controllers() || [] : [];

  controllers.forEach(Controller => {
    routerFactory(expressApp, Controller);
  });
};

export default createApp;
