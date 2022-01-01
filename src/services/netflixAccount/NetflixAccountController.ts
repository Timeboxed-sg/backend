import { Router } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import NetflixAccount from '../../db/models/netflixAccount';
import { sendJSONResponse } from '../../utils';

const router = Router();

router.post('/add-account', async (req, res) => {
  const account = new NetflixAccount({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password,
    description: req.body.description,
    totalUsersAllowed: req.body.totalUsersAllowes,
    screensRemaining: req.body.screensRemaining,
  });

  const salt = await bcrypt.genSalt(10);
  account.password = await bcrypt.hash(req.body.password, salt);

  const acc = await account.save();

  sendJSONResponse(res, 200, 'OK', acc);
});

export default router;
