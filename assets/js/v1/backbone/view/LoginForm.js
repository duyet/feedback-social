define(function(require) {
    var Backbone = require('backbone');

    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/templates/login-form.html"]());
            return this;
        }, 

        events: {
        	"submit": "doLogin",
        },

        doLogin: function(e) {
        	// TODO: Validate
        	var email = $('input[name="email"]').val();
        	var password = $('input[name="password"]').val();

        	console.log("Login: ", email, password);

        	return false;
        },
    });
});
