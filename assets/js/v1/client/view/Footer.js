define(function(require) {
    /**
     * Footer for the main application
     */

    var Backbone = require('backbone');

    return Backbone.View.extend({
        render: function() {
            console.i("Render Footer");

            this.$el.html(JST["assets/templates/footer.html"]());
            return this;
        }
    });
});
