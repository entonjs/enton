import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createContext from './context';
import Lifecycles from './lifecycles';
import config, { configReader } from '../config';
import router from './router';

export default async appInstance => {
  const lifecycles = Lifecycles(appInstance);

  process.on('uncaughtException', err => {
    lifecycles.onError(err);
  });

  const expressApp = express();
  const enton = await createContext(expressApp);
  const configJSON = configReader(`${enton.appRoot}/config`, process.env.NODE_ENV || 'development');

  global.enton = enton;

  const modifiedConfig = await lifecycles.configLoad(configJSON);

  enton.config = config(modifiedConfig);

  expressApp.use(helmet());
  expressApp.use(compression());

  if (enton.config('app.bodyParser.enabled')) {
    expressApp.use(bodyParser);
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
