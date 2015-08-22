/**
* Feedback.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    title : { type: 'string', required: true },
    alias: { type: 'string', unique: true, required: true, primaryKey: true },
    markdownContent: { type: 'string' },
    htmlContent: { type: 'string', required: true },
    state: { type: 'string', enum: ['publish', 'deleted', 'draft'], defaultsTo: 'publish' },
    tags: { type: 'array' },
    links: { collection: 'FeedbackLink', via: 'feedback_post' },
    image: { type: 'string' },
    images: { collection: 'FeedbackImage', via: 'feedback_post' },
    comment: { collection: 'FeedbackComment', via: 'feedback_post' },
    author : { model: 'User', required: true },
    hiddenInfo: { type: 'boolean', defaultsTo: false },
    noticeMessage: { type: 'string' },
  }, 
  
  beforeCreate: function(values, next) {
    if (!values.tags) values.tags = new Array();
    next();
  }
};

