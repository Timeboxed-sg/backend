import sgMail from '@sendgrid/mail';
import nconf from 'nconf';
import logger from '../../common/logger';
import { isProductionEnv } from '../../utils';

export const sendPassTokenEmail = (email: string, passToken: String) => {
  if (!isProductionEnv()) {
    logger.warn('Not sending email as not prod');
    return;
  }
  sgMail.setApiKey(nconf.get('sendgrid'));

  const msg = {
    to: email,
    from: 'tshradheya@gmail.com', // TODO: Update for prod
    subject: 'Your Token for Timeboxed Pass',
    text: 'Your Token for Timeboxed Pass',
    html: `<strong>Token Pass: ${passToken}</strong>`,
  };

  sgMail.send(msg);
};
