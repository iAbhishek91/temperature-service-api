import { Router } from 'express';
import documentRoute from './documentation';
import weatherRoute from './weather';
import errorHandler from '../../middleware/errorHandler';
import throwAIPError from '../../middleware/throwAIPError';

const v1RouteEntry = Router();
const validRoutes = {
  docsURI: '/docs',
  weather: {
    method: 'GET',
    URI: '/weather',
  },
};

v1RouteEntry.use(validRoutes.docsURI, documentRoute);

v1RouteEntry.use(validRoutes.weather.URI, weatherRoute);

v1RouteEntry.use(throwAIPError(404, 'Endpoint not found', `Endpoint not found. valid URI ${JSON.stringify(validRoutes)}`));

v1RouteEntry.use(errorHandler);

export default v1RouteEntry;
