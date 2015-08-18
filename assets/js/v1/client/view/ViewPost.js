define(function(require) {
    var Backbone = require('backbone');
    return Backbone.View.extend({
        render: function() {
        	this.$el.html(JST["assets/templates/view-post.html"]({
            	model: this.model
            }));

        	$('#post-title').text(this.model.get('title'));

            return this;
        }
    });
});
