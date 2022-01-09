import { Router } from 'express';
import mongoose from 'mongoose';
import NetflixAccount from '../../db/models/netflixAccount';
import { encryptPassword, sendJSONResponse } from '../../utils';

const router = Router();

router.post('/add-account', async (req, res) => {
  const account = new NetflixAccount({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    description: req.body.description,
    totalUsersAllowed: req.body.totalUsersAllowed,
    screensRemaining: req.body.screensRemaining,
    isActive: req.body.isActive,
  });

  account.encryptedPassword = encryptPassword(req.body.password);

  const acc = await account.save();

  sendJSONResponse(res, 200, 'OK', acc);
});

export default router;
