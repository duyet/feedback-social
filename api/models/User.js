var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  /*
  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' }
  }
  */

  attributes: {
    provider: 'string',
    uid: { type: 'string', unique: true },
    name: 'string',
    email: 'string',
    firstname: 'string',
    lastname: 'string'
  },
};

module.exports = User;
