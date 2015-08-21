define(function(require) {
    var Backbone = require('backbone');
	var cookie = require('cookie');
    var __c = window.__c || {};
	
    return Backbone.Model.extend({
		url: __c.api_prefix + '/auth/signout',
        
        signout : function() {
            window.__c.isAuth = false;
            window.__c.user = {}; // Unset __c user 
            $.cookie(window.__c.feedbackAuthenCookieKey, false); // Clear cookie
            this.fetch();
        },
    });
});
