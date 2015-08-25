/**
 * FeedbackVoteController
 *
 * @description :: Server-side logic for managing Feedbackvotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findOne: function(req, res) {
		return res.forbidden({message: 'Access deny'});
	},

	find: function(req, res) {
		return res.forbidden({message: 'Access deny'});
	},

	vote: function(req, res) {
		var data = {};
		data.feedback_post = req.body.feedback_post || false;
		data.user = req.body.user || false;
		data.vote_type = req.body.vote_type || false;

		if (!data.feedback_post || !data.user || !data.vote_type) {
			console.log(data);
			return res.forbidden({message: 'Missing data'});
		}

		FeedbackVote.create(data).exec(function(err, model) {
			if (err || !model) {
				console.log(err);
				return res.forbidden({message: 'Already vote'});
			}

			return res.json(model);
		});
	},

	unvote: function(req, res) {
		var data = {};
		data.feedback_post = req.body.feedback_post || false;
		data.user = req.body.user || false;

		if (!data.feedback_post || !data.user) {
			console.log(data);
			return res.forbidden({message: 'Missing data'});
		}

		FeedbackVote.destroy(data).exec(function(err, model) {
			if (err || !model) {
				console.log(err);
				return res.forbidden({message: 'Error'});
			}

			return res.json(model);
		});
	},

	counter: function(req, res) {
		var id = req.params.id;

		// TODO: Fix that by using groupby
		FeedbackVote.find({feedback_post: id}).exec(function(err, models) {
			if (err || !models) {
				return res.forbidden({message: 'Some thing went wrong'});
			}
			var result = {
				up: 0,
				down: 0
			};

			models.map(function(row) { if (row.vote_type == 'up') result.up++; else result.down++; });
			return res.json(result);
		});
	},
	
	info: function(req, res) {
		if (!req.body) return res.forbidden({message: 'Some thing went wrong 1'});
		
		var id = req.params.id;
		var user = req.body.user || '';
		
		if (!req.body.feedback_post || req.body.feedback_post != id || !user) 
			return res.forbidden({message: 'Some thing went wrong 2'});
		
		// TODO: Fix that by using groupby
		FeedbackVote.findOne({feedback_post: id, user: user}).exec(function(err, models) {
			if (err || !models) {
				console.log(err);
				// return res.forbidden({message: 'Some thing went wrong 3'});

				// Empty info, thus I sent empty json
				return res.json({});
			}
			
			return res.json(models);
		});
	},
};

