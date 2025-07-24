import express from 'express';
import kriyaRoutes from './domains/kriya/kriya-routes.js';
import productRoutes from './domains/product/product-routes.js';
import tutorialRoutes from './domains/tutorial/tutorial-routes.js';
import userRoutes from './domains/user/user-routes.js';
import portofolioRoutes from './domains/portofolio/portofolio-routes.js';

const router = express.Router();

const routes = [
  {
    path: '/kriyas',
    route: kriyaRoutes
  },
  {
    path: '/products',
    route: productRoutes
  },
  {
    path: '/tutorials',
    route: tutorialRoutes
  },
  {
    path: '/users',
    route: userRoutes
  },
  {
    path: '/portofolios',
    route: portofolioRoutes
  },
];


routes.forEach(({ path, route }) => {
  router.use(`/v1${path}`, route);
});

export default router;