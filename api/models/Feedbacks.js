/**
* Feedback.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    title : { type: 'string', unique: true },
    alias: { type: 'string', unique: true },
    htmlContent: { type: 'string' },
    state: {
  		type: 'string',
  		enum: ['publish', 'deleted', 'draft'],
  		//default: 'publish'
  	},
    tags: {
      type: 'array'
    },
    links: {
      collection: 'FeedbackLink',
    },
    image: 'string',
    images: {
      collection: 'FeedbackImage',
    },
    comments: {
      collection: 'FeedbackComment',
    },
    author : { collection: 'User' }
  }, 
  
  beforeCreate: function(values, next) {
    if (!values.tags) values.tags = new Array();
    next();
  }
};

