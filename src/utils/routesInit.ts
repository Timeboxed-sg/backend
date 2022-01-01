/* eslint-disable global-require */
import HealthCheckController from '../services/health-check/HealthCheckController';

export const routesInit = (server) => {
  const TimeboxedController = require('../services/timeboxedPass/TimeboxedController').default;
  const NetflixAccountController = require('../services/netflixAccount/NetflixAccountController').default;

  server.use('/api/v1', HealthCheckController);
  server.use('/api/v1/pass', TimeboxedController);
  server.use('/api/v1/netflix', NetflixAccountController);
};
