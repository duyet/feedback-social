/**
 * Main backbone frontend controller 
 *  -> Backbone router 
 *
 * @author: Van-Duyet Le (duyetdev)
 * @date: 14/08/2015
 */

// ================================================
// ROUTER 
// ================================================
var AppRouter = Backbone.Router.extend({
    routes: {
    	"login": "login",
    	"register": "register",
    	"forgot": "forgot_password",
    	"active/:key": "active_account",
        "*actions": "defaultRoute"
        // matches http://example.com/#anything-here
    },

    login: function() {
    	alert("Login")
    	new LoginView({el: $("#main-view")})
    },
    register: function() {},
    forgot_password: function() {},
    active_account: function(key) {},
    defaultRoute: function(actions) {},
});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();