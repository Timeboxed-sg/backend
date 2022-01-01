export const en = {
  NETFLIX: {
    ordinal: 0,
    display: 'netflix',
  },
  DisneyPlus: {
    ordinal: 1,
    display: 'Disney +',

  },
  OTHER: {
    ordinal: 2,
    display: 'Other',
  },
};

export const ordinalToEnum = {};

for (const key in en) {
  ordinalToEnum[en[key].ordinal] = en[key];
}
