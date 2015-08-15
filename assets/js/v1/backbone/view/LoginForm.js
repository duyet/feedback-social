define(function(require) {
    var Backbone = require('backbone');

    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/templates/login-form.html"]());
            return this;
        }, 

        events: {
        	"click button[type=submit]": "doLogin",
        },

        doLogin: function(e) {
        	// TODO: Validate
        	
        },
    });
});
