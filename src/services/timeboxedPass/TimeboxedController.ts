import { Router } from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import NetflixAccount from '../../db/models/netflixAccount';
import TimeboxedPass from '../../db/models/timeboxedPass';
import * as providers from '../../enums/provider';
import { getRandomInt, sendJSONResponse } from '../../utils';

const router = Router();

router.post('/buy-pass/:provider', async (req: any, res) => {
  const provider = Number(req.params.provider);
  switch (provider) {
    case providers.en.NETFLIX.ordinal:
      const availableAccounts = await NetflixAccount.find({
        screensRemaining: { $gt: 0 },
        isActive: true,
      });

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
        usageToken: uuidv4(),
        numOfDays: durationOfPass,
        startDate: moment.utc(),
        endDate: moment.utc().add(durationOfPass, 'days'),
      });

      const savedPass = await timeboxedPass.save();

      sendJSONResponse(res, 200, 'OK', savedPass);
      break;

    default:
      sendJSONResponse(res, 200, 'Not supported yet');
      break;
  }
});

export default router;
