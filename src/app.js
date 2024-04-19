import express from 'express';
import bodyParser from 'body-parser';
import loadRoutes from './loaders/routes.js';
import errorMiddleware from './middlewares/error.js';
import configSwagger from './config/configSwagger.js';

export default async function createApp() {
  const app = express();
  app.use(bodyParser.json());
  
  loadRoutes(app);  // Ensure this is compatible with async, if it needs to be
  app.use(errorMiddleware);
  configSwagger(app);  // Ensure this does not require db connection or make it async if it does

  return app;
}
