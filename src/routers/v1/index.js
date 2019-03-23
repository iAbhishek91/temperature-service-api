import { Router } from 'express';
import documentRoute from './documentation';

const v1Route = Router();

v1Route.use('/docs', documentRoute);

export default v1Route;
