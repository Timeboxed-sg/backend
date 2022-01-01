export const sendJSONResponse = (res, status, message, data = {}) => {
  const jsonResponse = {
    metadata: {
      status,
      message,
    },
    data,
  };

  res.status(status);
  return res.send(jsonResponse);
};

export const sendBadRequest = (res, status, errMsg) => sendJSONResponse(res, status, errMsg);

export const isProductionEnv = () => process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production';

export const isStagingEnv = () => process.env.NODE_ENV === 'staging';

export const isDevEnv = () => process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'local';

export const isDeployedEnv = () => isProductionEnv() || isStagingEnv();

export const getRandomInt = (min: number, max: number) => {
  const roundMin = Math.ceil(min);
  const roundMax = Math.floor(max);
  return Math.floor(Math.random() * (roundMax - roundMin + 1)) + roundMin;
};
