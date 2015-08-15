define(function(require) {

    var Marionette = require('marionette'),
        HomePageView = require('view/Homepage'),
        NotFoundView = require('view/NotFound'),
        ExploreView = require('view/Explore'),
        LoginFormView = require('view/LoginForm'),
        RegisterFormView = require('view/RegisterForm'),
        NewFormView = require('view/NewForm');

    return Marionette.Controller.extend({

        homePage: function() {
            var AppInstance = require('AppInstance'),
                homePageView = new HomePageView({});

            // update the main section
            AppInstance.regionMain.show(homePageView);
        }, 

        notFound: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new NotFoundView());
        },

        exploreMain: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new ExploreView());
            AppInstance.regionFooter.reset();
            //console.log(AppInstance.regionFooter);
        },

        exploreCat: function() {

        },

        loginForm: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new LoginFormView());
            AppInstance.regionFooter.reset();
        },

        registerForm: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new RegisterFormView());
            AppInstance.regionFooter.reset();
        },

        forgot: function() {},
        activeAccount: function(key) {},
        
        newFeedback: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new NewFormView());
            AppInstance.regionFooter.reset();
        },
    });

});
