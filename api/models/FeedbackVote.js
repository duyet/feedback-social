/**
* FeedbackVote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		feedback_post: { model: 'Feedbacks' },
		user: { model: 'user', via: 'feedback_comment_by' },
		vote_type: { type: 'string', enum: ['up', 'down'], defaultsTo: 'up' }, // 'up' or 'down'
	},

	indexes:[
		{
			attributes:  ['feedback_post', 'user', 'vote_type'],
			unique: true
		}
	]

};