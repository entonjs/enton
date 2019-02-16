import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createContext from './context';
import appHandler from './action-handler';
import config, { configReader } from '../config';
import router from './router';

export default async appInstance => {
  const expressApp = express();
  const handler = appHandler(appInstance);
  const enton = await createContext(expressApp);
  const configJSON = configReader(`${enton.appRoot}/config`, process.env.NODE_ENV || 'development');

  global.enton = enton;

  const modifiedConfig = await handler.load(enton, configJSON);

  enton.config = config(modifiedConfig);

  expressApp.use(helmet());
  expressApp.use(compression());

  if (enton.config('app.bodyParser.enabled')) {
    expressApp.use(bodyParser);
  }

  if (enton.config('app.cookieParser.enabled')) {
    expressApp.use(cookieParser());
  }

  router(expressApp, appInstance);

  const port = enton.config('app.port') || 80;

  const listener = await expressApp.listen(port);

  return listener;
};
