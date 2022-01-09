import nconf from 'nconf';
import Twilio from 'twilio';
import logger from '../../common/logger';
import { isProductionEnv } from '../../utils';

export const sendPassTokenMsg = async (mobileNumber: string, passToken: string) => {
  if (!isProductionEnv()) {
    logger.warn('Not prod env. Skipping sending msg');
    return;
  }
  const accountSid = nconf.get('twilio:accountSid');
  const authToken = nconf.get('twilio:authToken');
  const client = Twilio(accountSid, authToken);

  await client.messages.create({
    body: `Your tokenpass for timeboxed is \n${passToken}`,
    to: mobileNumber,
    messagingServiceSid: nconf.get('twilio:messagingSid'),
  });
};
