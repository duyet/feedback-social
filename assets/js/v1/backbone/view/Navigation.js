define(function(require) {
    /**
     *  This view will draw the nav menu...
     */

    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.View.extend({
        tagName: "ul",
        className: "nav navbar-nav navbar-right",
        render: function() {
            this.$el.html(JST['assets/templates/main-menu.html']());
        },
    });
});
