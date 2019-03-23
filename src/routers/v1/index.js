import { Router } from 'express';
import documentRoute from './documentation';
import weatherRoute from './weather';
import errorHandler from '../../middleware/errorHandler';

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

v1RouteEntry.use(errorHandler(validRoutes));

export default v1RouteEntry;
