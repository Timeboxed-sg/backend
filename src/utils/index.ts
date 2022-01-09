import crypto from 'crypto';
import nconf from 'nconf';

const passwordSecretKey = nconf.get('passwordSecretKey');
const algorithm = 'aes-256-cbc';

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

export const encryptPassword = (basicPassword: string) => {
  const initVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, passwordSecretKey, initVector);

  const encrypted = Buffer.concat([cipher.update(basicPassword), cipher.final()]);

  return {
    content: encrypted.toString('hex'),
    iv: initVector.toString('hex'),
  };
};

export const decryptPassword = (encryptedPassword: {
  content: String, iv: String
}) => {
  const decipher = crypto.createDecipheriv(algorithm, passwordSecretKey, Buffer.from(encryptedPassword.iv, 'hex'));

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(encryptedPassword.content, 'hex')), decipher.final()]);

  return decrpyted.toString();
};
