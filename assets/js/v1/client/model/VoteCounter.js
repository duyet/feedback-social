define(function(require) {
    var Backbone = require('backbone');
    var __c = window.__c || {};

    return Backbone.Model.extend({
		rooturl: __c.api_prefix + '/feedbackvote/counter',

		fetchCounter(alias) {
			// Clear the previous data 
			this.clear();

			if (alias) {
				this.url = this.rooturl + '/' + alias;
				return this.fetch();
			}
			
			return this;
		}
    });
});
