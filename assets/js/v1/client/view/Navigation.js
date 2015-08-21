define(function(require) {
    var Backbone = require('backbone');
    var $ = require('jquery');
    window.__c = window.__c || {};

    return Backbone.View.extend({
        tagName: "ul",
        className: "nav navbar-nav navbar-right",
        render: function() {
            this.$el.html(JST['assets/templates/main-menu.html']());
            console.log("!!!", window.__c.hasOwnProperty('user'))
            console.log(__c.user)
            if (window.__c.user.hasOwnProperty('token') == true) {
                window.__c.isAuthentication = true;
                
                console.log("~~~~~")
                
                var displayName = 'Guest';
                if (window.__c.user.user.hasOwnProperty('username'))
                    displayName = window.__c.user.user.username;
                if (window.__c.user.user.hasOwnProperty('firstName') && window.__c.user.user.hasOwnProperty('lastName'))
                    displayName = window.__c.user.user.firstName + window.__c.user.user.firstName;

                $('#login-register').html($('<a href="">'+ displayName +'</a>'))
            }
        },
    });
});
