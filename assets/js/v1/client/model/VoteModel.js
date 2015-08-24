define(function(require) {
    var Backbone = require('backbone');
    var __c = window.__c || {};

    return Backbone.Model.extend({
		rootUrl: __c.api_prefix + '/feedbackvote',

		// Vote request
		vote: function(feedback_post, value, next) {
			value = (value != 'up') ? 'down' : 'up';
			this.url = this.rootUrl + '/vote';
			
			if (!__c.isAuth) return next('Please login');

			this.set({feedback_post: feedback_post});
			this.set({user: window.__c.user.user.id});
			this.set({vote_type: value});

			return this.save(null, {
				error: function(err) {
					next(err);
				},
				success: function(err, model) {
					next(null, model);
				}
			});
		}, 

		// UnVote request
		unVote: function(feedback_post, next) {
			if (!__c.isAuth) return next('Please login');
			this.url = this.rootUrl + '/unvote';

			this.set({feedback_post: feedback_post});
			this.set({user: window.__c.user.user.id});

			return this.save(null, {
				error: function(err) {
					next(err);
				},
				success: function(err, model) {
					next(null, model);
				}
			});
		},
    });
});
