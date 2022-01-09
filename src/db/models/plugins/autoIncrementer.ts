import mongoose from 'mongoose';

const autoincrModelName = 'Autoincr';

export function init() {
  const AutoincrSchema = new mongoose.Schema({
    model: { type: String, unique: true, required: true },
    c: { type: Number, default: 0 },
  });

  if (!(mongoose).models[autoincrModelName]) {
    mongoose.model(autoincrModelName, AutoincrSchema);
  }
}

export function plugin(schema, options) {
  if (!options || !options.model) {
    throw new Error('Need to pass in model');
  }

  const fakeIncrement = 0;

  const schemaObj = {};
  schemaObj[options.tid] = { type: Number, unique: true };

  schema.add(schemaObj);

  const Autoincr: any = mongoose.model(autoincrModelName);

  schema.pre('save', function (next) {
    const doc = this;
    if (doc.isNew) {
      const increment = 1 + fakeIncrement;
      const query = { model: options.model };
      const update = { $inc: { c: increment } };
      Autoincr.findOneAndUpdate(query, update, { upsert: true, new: true }, (err, autoincr) => {
        if (err) {
          return next(err);
        }

        doc[options.tid] = autoincr.c;
        return next();
      });
    } else {
      next();
    }
  });
}
