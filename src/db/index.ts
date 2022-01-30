import mongoose from 'mongoose';
import nconf from 'nconf';
import * as autoincr from './models/plugins/autoIncrementer';

const connectDb = () => {
  const conn = mongoose.connect(nconf.get('mongodb:url'), {
    // authSource: nconf.get('mongodb:dbName'),
    dbName: nconf.get('mongodb:dbName'),
    user: nconf.get('mongodb:username'),
    pass: nconf.get('mongodb:password'),
  });
  autoincr.init();

  return conn;
};

export { connectDb };
