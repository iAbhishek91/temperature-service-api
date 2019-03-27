import express from 'express';
import routerEntry from './routers';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import throwAIPError from './middleware/throwAIPError';

const app = express();
const validRoutes = {
  apiURI: '/api',
};

app.use(logger);

app.use('/api', routerEntry);

app.use(throwAIPError(404, 'Endpoint not found', `Endpoint not found. valid URI ${JSON.stringify(validRoutes)}`));

app.use(errorHandler);

export default app;
