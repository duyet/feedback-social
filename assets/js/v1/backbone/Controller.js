define(function(require) {

    var Marionette = require('marionette'),
        HomePageView = require('view/Homepage'),
        NotFoundView = require('view/NotFound'),
        ExploreView = require('view/Explore');

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
            AppInstance.regionFooter.hide();
        },

        exploreCat: function() {

        },

    });

});
