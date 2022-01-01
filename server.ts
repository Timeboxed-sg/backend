import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './src/common/logger';
import morganMiddleware from './src/common/morganMiddleware';
import { connectDb } from './src/db';
import { setupConfigs } from './src/config/config';
import { routesInit } from './src/utils/routesInit';

const app = express();

const serverInit = (async () => {
  setupConfigs();
  await connectDb();

  const corsOptions = {
    origin: 'http://localhost:8081',
  };

  app.use(cors(corsOptions));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morganMiddleware);
  app.use(cookieParser());

  routesInit(app);

  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}.`);
  });

  return app;
});

export default serverInit();
