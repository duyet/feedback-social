/**
* FeedbackVote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var crypto = require('crypto');

module.exports = {

	attributes: {
		feedback_post: { model: 'Feedbacks' },
		user: { model: 'user', via: 'feedback_comment_by' },
		vote_type: { type: 'string', enum: ['up', 'down'], defaultsTo: 'up' }, // 'up' or 'down'
		prevent_duplicate: { type: 'string', unique: true }
	},
	
	beforeCreate: function(values, next) {
		values.prevent_duplicate = (values.feedback_post || '') + (values.user || '') + (values.vote_type || '');
		
		if (next) next();
	}
};