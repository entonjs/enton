import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createContext from './context';
import appHandler from './action-handler';
import config, { configReader } from '../config';

export default async appInstance => {
  const expressApp = express();
  const handler = appHandler(appInstance);
  const infinity = await createContext(expressApp);
  const configJSON = configReader(
    `${infinity.appRoot}/config`,
    process.env.NODE_ENV || 'development'
  );

  global.infinity = infinity;

  const modifiedConfig = await handler.load(infinity, configJSON);

  infinity.config = config(modifiedConfig);

  expressApp.use(helmet());
  expressApp.use(compression());

  if (infinity.config('app.bodyParser.enabled')) {
    expressApp.use(bodyParser);
  }

  if (infinity.config('app.cookieParser.enabled')) {
    expressApp.use(cookieParser());
  }

  const port = infinity.config('app.port') || 80;

  const listener = await expressApp.listen(port);

  return listener;
};
