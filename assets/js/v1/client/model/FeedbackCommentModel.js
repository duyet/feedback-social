define(function(require) {
    var Backbone = require('backbone');
	var __c = window.__c || {};
	
    return Backbone.Model.extend({
    	rootUrl: __c.api_prefix + '/feedbackcomment',
		url: __c.api_prefix + '/feedbackcomment/create',

		defaults: {
			feedback_post: '',
			user: '',
			hideMe: false,
			content: '',
		},

		errorMessage: '',

		getError: function() {
			return this.errorMessage || 'Something went wrong';
		},

		isValidate: function() {
			if (!this.get('feedback_post')) {
				return false;
			}

			if (!this.get('user')) {
				return false;
			}

			if (!this.get('content')) {
				this.errorMessage = 'Please enter comment';
				return false;
			}

			if (this.get('content').length < 3) {
				this.errorMessage = 'Your comment must be > 3 characters.';
				return false;
			}

			return true;
		}, 

		deleteComment: function(next) {
			this.url = this.rootUrl + '/delete';
			this.save(null, {
				success: function() {
					next(null, {message: 'Success'});
				}, 
				error: function() {
					next('Something went wrong');
				}
			});
			this.url = this.rootUrl + '/create';
		}
    });
});
