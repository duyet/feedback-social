define(function(require) {
    var Backbone = require('backbone');
	var __c = window.__c || {};
	
	return Backbone.Model.extend({
		url: __c.api_prefix + '/auth/local',
		
		initialize: function() {
		},
		
		defaults: {
			username: '',
			password: '',
			_csrf: '',	
		},
			
		login: function(callback) {
			console.log("Call ", this.url);
			return this.save();
		}
    });
});
