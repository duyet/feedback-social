/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title : { type: 'string', unique: true },
    alias: { type: 'string', unique: true },
    content: { type: 'string' },
    created : { type: 'datetime' },
    lastEdit: { type: 'datetime' },
    state: {
  		type: 'string',
  		enum: ['publish', 'deleted', 'draft'],
  		default: 'publish'
  	},
    author : { collection: 'User' }
  }
};

