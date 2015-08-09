/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id  		: { type: 'string', unique: true },
    name     	: { type: 'string' },
    email 		: { type: 'email' },
    content 	: { type: 'string' },
    createAt 	: { type: 'date', default: Date() },
    seen 		: { type: 'boolean', default: false },
  }
};

