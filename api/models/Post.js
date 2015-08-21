/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title : { type: 'string' },
    alias: { type: 'string', unique: true },
    content: { type: 'string' },
    htmlContent: { type: 'string' },
    created : { type: 'datetime' },
    lastEdit: { type: 'datetime' },
    state: {
  		type: 'string',
  		enum: ['publish', 'deleted', 'draft'],
  		//default: 'publish'
  	},
    tags: {
      type: 'array'
    },
    author : { collection: 'User' }
  }, 
  
  beforeCreate: function(values, next) {
    if (!values.tags) values.tags = new Array();
    if (!values.created) values.created = new Date();
    next();
  }
};

