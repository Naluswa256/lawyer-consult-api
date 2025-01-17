const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const fileUploadRoute = require('./upload.route');
const specializationRoutue = require('./specialization.route');
const lawyersRoute = require('./lawyer.route');
const config = require('../../config/config');
const servicesRoute = require('./package.route');
const paymentRoute = require('./payment.route');
const reviewRoute = require('./review.route');
const appointmentRoute = require('./appointement.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/upload',
    route: fileUploadRoute,
  },
  {
    path: '/lawyer-specializations',
    route: specializationRoutue,
  },
  {
    path: '/lawyers',
    route: lawyersRoute,
  },
  {
    path: '/services',
    route: servicesRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
  {
    path: '/appointments',
    route: appointmentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
