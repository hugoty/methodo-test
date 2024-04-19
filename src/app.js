import express from 'express';
import bodyParser from 'body-parser';
import loadRoutes from './loaders/routes.js';
import errorMiddleware from './middlewares/error.js';
import configSwagger from './config/configSwagger.js';

const app = express();

app.use(bodyParser.json());
loadRoutes(app);
app.use(errorMiddleware);
configSwagger(app)

export default app;
