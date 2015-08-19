define(function(require) {
    /**
     *  This view will draw the nav menu...
     */

    var Backbone = require('backbone');

    return Backbone.View.extend({
        tagName: "ul",
        className: "nav navbar-nav navbar-right",
        render: function() {
            this.$el.html(JST['assets/admin_templates/main-menu.html']());
        },
    });
});
