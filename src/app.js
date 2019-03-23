import express from 'express';
import bodyParser from 'body-parser';
import routerEntry from './routers';
import logger from './middleware/logger';

const app = express();

app.use(logger);
app.use(bodyParser.json());

app.get('/', (_, req) => {
  req.status(200);
  req.json({
    message: 'home page',
  });
});

app.use('/api', routerEntry);

export default app;
