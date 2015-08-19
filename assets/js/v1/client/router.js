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
var AppRouter = Marionette.AppRouter.extend({
    routes: {
        //Authen 
    	"login": "login",
    	"register": "register",
    	"forgot": "forgot_password",
    	"active/:key": "active_account",

        // Explore
        "explore" : "explore",

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

    explore: function() {
        (new CommingSoonView()).render();
    },
});