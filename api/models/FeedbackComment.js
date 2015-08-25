/**
* FeedbackComment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	content: { type: 'string' },
  	user: { model: 'user', via: 'feedback_comment_by' },
  	feedback_post: { model: 'Feedbacks' },
  	hideMe: { type: 'boolean', defaultsTo: false },
  	deleted: { type: 'boolean', defaultsTo: false },
  }
};

