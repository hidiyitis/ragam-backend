import express from 'express';
import kriyaRoutes from './domains/kriya/kriya-routes.js';

const router = express.Router();

const routes = [
  {
    path: '/kriyas',
    route: kriyaRoutes
  }
];


routes.forEach(({ path, route }) => {
  router.use(`/v1${path}`, route);
});

export default router;