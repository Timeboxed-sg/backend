import { Router } from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import NetflixAccount from '../../db/models/netflixAccount';
import TimeboxedPass from '../../db/models/timeboxedPass';
import * as providers from '../../enums/provider';
import {
  decryptPassword, getRandomInt, sendBadRequest, sendJSONResponse,
} from '../../utils';
import { sendPassTokenEmail } from '../sendgrid';
import { sendPassTokenMsg } from '../twilio';

const router = Router();

router.post('/buy-pass/:provider', async (req: any, res) => {
  const provider = Number(req.params.provider);
  switch (provider) {
    case providers.en.NETFLIX.ordinal:

      try {
        const availableAccounts = await NetflixAccount.find({
          screensRemaining: { $gt: 0 },
          isActive: true,
        });
        if (availableAccounts.length === 0) {
          return sendJSONResponse(res, 200, 'Sorry its all sold out!');
        }

        const acctToAssign = availableAccounts[getRandomInt(0, availableAccounts.length - 1)];

        acctToAssign.screensRemaining -= 1;
        await acctToAssign.save();
        const durationOfPass = Number(req.body.duration);

        const timeboxedPass = new TimeboxedPass({
          _id: new mongoose.Types.ObjectId(),
          userEmail: req.body.email,
          mobileNumber: req.body.mobileNumber,
          subscriptionService: provider,
          assignedAccount: acctToAssign._id,
          passToken: uuidv4(),
          numOfDays: durationOfPass,
          startDate: moment.utc(),
          endDate: moment.utc().add(durationOfPass, 'days'),
        });

        const savedPass = await timeboxedPass.save();

        sendPassTokenEmail(savedPass.userEmail, savedPass.passToken);
        await sendPassTokenMsg(savedPass.mobileNumber, savedPass.passToken);
        return sendJSONResponse(res, 200, 'OK', savedPass);
      } catch (e) {
        return sendBadRequest(res, 400, e);
      }

    default:
      return sendJSONResponse(res, 200, 'Not supported yet');
  }
});

router.post('/access-pass', async (req, res) => {
  const { passToken } = req.body;

  const currentUtcTime = moment.utc();

  const pass = await TimeboxedPass.findOne({
    passToken,
    endDate: { $gt: currentUtcTime },
  }).exec();

  if (!pass) {
    return sendJSONResponse(res, 204, 'Pass not present/valid');
  }

  if (pass.isExpired) {
    return sendJSONResponse(res, 200, 'Pass marked as expired');
  }

  const providerAccountCreds = {
    username: '',
    password: '',
  };
  switch (pass.subscriptionService) {
    case providers.en.NETFLIX.ordinal:
      const netflixAccount = await NetflixAccount.findById(pass.assignedAccount);

      providerAccountCreds.username = netflixAccount.email;
      providerAccountCreds.password = decryptPassword(netflixAccount.encryptedPassword);

      break;

    default:
      sendJSONResponse(res, 200, 'Not supported yet');
      break;
  }

  return sendJSONResponse(res, 200, 'Credentials', providerAccountCreds);
});

router.post('/mark-expired', async (req, res) => {
  const { passToken } = req.body;

  const pass = await TimeboxedPass.findOne({
    passToken,
  }).exec();

  if (!pass) {
    return sendJSONResponse(res, 204, 'Pass not present/valid');
  }

  pass.isExpired = true;

  const updatedPass = await pass.save();

  return sendJSONResponse(res, 200, 'OK', updatedPass);
});

export default router;
