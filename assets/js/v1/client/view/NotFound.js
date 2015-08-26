define(function(require) {
    var Backbone = require('backbone');
    return Backbone.View.extend({
        render: function() {
        	console.i("Render 404");

            this.$el.html(JST["assets/templates/notfound.html"]());
            return this;
        }
    });
});
