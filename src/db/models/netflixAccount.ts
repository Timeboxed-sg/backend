import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import * as autoincr from './plugins/autoIncrementer';

const netflixAccountSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  totalUsersAllowed: {
    type: Number,
  },
  screensRemaining: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

netflixAccountSchema.methods = {
  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

netflixAccountSchema.plugin(autoincr.plugin, { model: 'NetflixAccount', tid: 'netflixAccountId' });
const NetflixAccount = mongoose.model('NetflixAccount', netflixAccountSchema);

export { netflixAccountSchema };
export default NetflixAccount;
