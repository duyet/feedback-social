define(function(require) {

	var Marionette = require('marionette');
	var Backbone = require('backbone');
	var Router = require('Router');
	var Controller = require('Controller');
	var NavigationView = require('view/Navigation');
	//var RedThemeModule = require('module/RedTheme/Module');
	//var BlueThemeModule = require('module/BlueTheme/Module');
	//var Footer = require('view/Footer');

	return Marionette.Application.extend({

		/**
		 * Define the regions for the application. 
		 * 
		 * @returns {Object}
		 */
		regions: function() {
			return {
				//regionHeader: 'header',
				regionNav: '#main-nav',
				regionMain: '#main-view',
				regionFooter: 'footer'
			};
		},

		/**
		 * 
		 * @param   {Object}	options
		 */
		start: function(options) {
			var navigationView = new NavigationView();

			// Perform the default 'start' functionality
			Marionette.Application.prototype.start.apply(this, [options]);

			// Add in the site navigation
			this.regionNav.show(navigationView);

            // show the footer
            // this.regionFooter.show(new Footer());

			// Add routers
			this.Router = new Router({
				controller: new Controller()
			});

			// Add modules
			//this.module('BlueThemeModule', {
			//	moduleClass: BlueThemeModule
			//});
			//this.module('RedThemeModule', {
			//	moduleClass: RedThemeModule
			//});

			// This is a very simple demo, and as such I'm going to use
			// hashes for internal navigation.  If you want Backbone/Marionette
			// to enforce full URLs use:
			Backbone.history.start( { pushState: false } );
			//Backbone.history.start();
		}
	});
});
