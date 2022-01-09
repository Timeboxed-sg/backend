import mongoose, { Schema } from 'mongoose';
import * as autoincr from './plugins/autoIncrementer';

const netflixAccountSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  encryptedPassword: {
    content: {
      type: String,
    },
    iv: {
      type: String,
    },
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  totalUsersAllowed: {
    type: Number,
    default: 0,
  },
  screensRemaining: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

netflixAccountSchema.methods = {};

netflixAccountSchema.plugin(autoincr.plugin, { model: 'NetflixAccount', tid: 'netflixAccountId' });
const NetflixAccount = mongoose.model('NetflixAccount', netflixAccountSchema);

export { netflixAccountSchema };
export default NetflixAccount;
