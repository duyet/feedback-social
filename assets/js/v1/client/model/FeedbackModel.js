define(function(require) {
    var Backbone = require('backbone');
	var __c = window.__c || {};
	
    return Backbone.Model.extend({
		url: __c.api_prefix + '/feedbacks/create',
		
		listFeedback : function() {
			this.url =  __c.api_prefix + '/feedbacks/lite'
			
			return this.fetch();
		},

		getByAlias: function(alias){
			this.url = __c.api_prefix + '/feedbacks' + '/' + alias;
			return this.fetch();
		}
    });
});
