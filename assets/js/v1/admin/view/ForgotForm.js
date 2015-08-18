define(function(require) {
    var Backbone = require('backbone');

    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/templates/forgot-password.html"]());
            return this;
        }, 

        events: {
        	"submit": "doSubmit",
        },

        doSubmit: function(e) {
        	
        	return false;
        },
    });
});
