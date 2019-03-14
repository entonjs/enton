const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { merge } = require('lodash');
const createContext = require('./context');
const Lifecycles = require('./lifecycles');
const { define, reader } = require('../config');
const router = require('./router');

module.exports = async appInstance => {
  const lifecycles = Lifecycles(appInstance);

  process.on('uncaughtException', err => {
    lifecycles.onError(err);
  });

  const expressApp = express();
  const enton = await createContext(expressApp);
  const configJSON = await reader.read(
    `${enton.appRoot}/config`,
    process.env.NODE_ENV || 'development'
  );

  global.enton = enton;

  const customConfig = await lifecycles.configLoad(configJSON);

  enton.config = define(merge(configJSON, customConfig));

  expressApp.use(helmet());
  expressApp.use(compression());

  if (enton.config('app.bodyParser.enabled')) {
    expressApp.use(bodyParser.urlencoded({ extended: false }));
    expressApp.use(bodyParser.json());
  }

  if (enton.config('app.cookieParser.enabled')) {
    expressApp.use(cookieParser());
  }

  await lifecycles.init();

  router(expressApp, appInstance);

  await lifecycles.beforeStart();

  const port = enton.config('app.port') || 80;

  const listener = await expressApp.listen(port);

  await lifecycles.start();

  return listener;
};
