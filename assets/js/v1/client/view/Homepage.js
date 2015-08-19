define(function(require) {

    var Backbone = require('backbone');

    return Backbone.View.extend({

        className: 'home-page-view',

        render: function() {
            this.$el.html(JST["assets/templates/home.html"]());
            return this;
        }
    });

});
