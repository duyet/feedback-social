define(function(require) {

    var Marionette = require('marionette'),
        HomePageView = require('view/Homepage'),
        NotFoundView = require('view/NotFound'),
        ManagerView = require('view/Manager'),
        ManagerItem = {
            'post' : require('view/Manager/Post'),
            'postnew' : require('view/Manager/NewPost')
        };
        
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

        managerMain: function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new ManagerView());
            AppInstance.regionFooter.reset();
            //console.log(AppInstance.regionFooter);
        },

        managerItem: function(controller) {
            var AppInstance = require('AppInstance');            
            if (!controller || !controller.length || !ManagerItem[controller]) {
                AppInstance.regionMain.show(new NotFoundView());
                return false;
            }

            var controllerName = "manager" + this.capitalizeFirstLetter(controller) + "Controller";
            if (this[controllerName]) 
                this[controllerName](); 
            else
                AppInstance.regionMain.show(new ManagerItem[controller]());
        },

        managerPostController : function() {
            var AppInstance = require('AppInstance');
            AppInstance.regionMain.show(new ManagerItem['post']());
        },

        // Helper ==================
        capitalizeFirstLetter: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    });

});
