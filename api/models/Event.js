/**
* Event.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id  		: { type: 'string', unique: true },
    title     	: { type: 'string' },
    content 	: { type: 'string' },
    //passports 	: { collection: 'Passport', via: 'user' }
  }
};

