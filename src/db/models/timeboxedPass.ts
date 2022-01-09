import mongoose, { Schema } from 'mongoose';
import moment from 'moment';
import * as autoincr from './plugins/autoIncrementer';
import * as providers from '../../enums/provider';

const timeboxedPassSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  userEmail: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  subscriptionService: {
    type: Number,
    required: true,
    default: providers.en.NETFLIX.ordinal,
  },
  assignedAccount: {
    type: String,
  },
  passToken: {
    type: String,
    required: true,
    unqiue: true,
    index: true,
  },
  numOfDays: {
    type: Number,
    default: 1,
  },
  startDate: {
    type: Date,
    default: moment.utc(),
  },
  // SSOT. isExpired can only override if its true
  endDate: {
    type: Date,
    default: moment.utc(),
  },
  // Only used for overriding in case of fraud etc
  isExpired: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

timeboxedPassSchema.index({
  passToken: 1,
  endDate: -1,
});

timeboxedPassSchema.plugin(autoincr.plugin, { model: 'TimeboxedPass', tid: 'timeboxedPassId' });
const timeBoxedPass = mongoose.model('TimeboxedPass', timeboxedPassSchema);

export { timeboxedPassSchema };
export default timeBoxedPass;
