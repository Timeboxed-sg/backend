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
  usageToken: {
    type: String,
    required: true,
    unqiue: true,
  },
  numOfDays: {
    type: Number,
    default: 1,
  },
  startDate: {
    type: Date,
    default: moment.utc(),
  },
  endDate: {
    type: Date,
    default: moment.utc(),
  },
}, {
  timestamps: true,
});

timeboxedPassSchema.plugin(autoincr.plugin, { model: 'TimeboxedPass', tid: 'timeboxedPassId' });
const timeBoxedPass = mongoose.model('TimeboxedPass', timeboxedPassSchema);

export { timeboxedPassSchema };
export default timeBoxedPass;
