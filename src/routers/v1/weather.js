import { Router } from 'express';
import weatherController from '../../controllers/v1/weather';

const weatherRoute = Router();

weatherRoute.get('/', weatherController);

export default weatherRoute;
