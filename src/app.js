import express from 'express';
import routerEntry from './routers';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';

const app = express();
const validRoutes = {
  apiURI: '/api',
};

app.use(logger);

app.use('/api', routerEntry);

app.use(errorHandler(validRoutes));

export default app;
