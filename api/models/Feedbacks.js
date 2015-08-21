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
    markdownContent: { type: 'string' },
    htmlContent: { type: 'string' },
    state: { type: 'string', num: ['publish', 'deleted', 'draft'], defaultsTo: 'publish' },
    tags: { type: 'array' },
    links: { collection: 'FeedbackLink' },
    image: { type: 'string' },
    images: { collection: 'FeedbackImage' },
    author : { model: 'User' },
    hiddenInfo: { type: 'boolean', defaultsTo: false },
    noticeMessage: { type: 'string' },
  }, 
  
  beforeCreate: function(values, next) {
    if (!values.tags) values.tags = new Array();
    next();
  }
};

