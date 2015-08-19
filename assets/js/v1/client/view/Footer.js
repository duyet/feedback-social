define(function(require) {
    /**
     * Footer for the main application
     */

    var Backbone = require('backbone');

    return Backbone.View.extend({
        render: function() {
            this.$el.html(JST["assets/templates/footer.html"]());
            return this;
        }
    });
});
