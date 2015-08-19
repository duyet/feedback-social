define(function(require) {
    var Backbone = require('backbone');
    return Backbone.View.extend({
        initialize: function() {
            if (this.model) {
                this.model.on('change', this.render, this);
            }
        },
        
        render: function() {
            if (!this.model.id) {
                this.$el.html(JST["assets/templates/notfound.html"]());
                return this;
            }
            
        	this.$el.html(JST["assets/templates/view-post.html"]({
            	model: this.model
            }));

            return this;
        }
    });
});
