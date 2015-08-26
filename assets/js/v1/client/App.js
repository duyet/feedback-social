define(function(require) {
	var $ = require('jquery');
	var Marionette = require('marionette');
	var Backbone = require('backbone');
	var Router = require('Router');
	var Controller = require('Controller');
	var NavigationView = require('view/Navigation');
	var cookie = require('cookie');
	window.__c = window.__c || {};
	
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
			console.info("Starting App...");

			// If debug is active, I disable console log
			if (!window.__c.debug || window.__c.debug == false) console.log = function() {};
			
			// System config 
			window.__c.feedbackAuthenCookieKey = window.__c.cookieAuthKey || '__feedbackAuth';
			
			// Load user login info 
			window.__c.user = window.__c.user || {};
			window.__c.isAuth = false;
			if (!window.__c.user.length) {
				window.__c.user = $.cookie(window.__c.feedbackAuthenCookieKey) || false;
				console.info("Check authentication ...", $.cookie(window.__c.feedbackAuthenCookieKey));
				if (!window.__c.user) window.__c.user = false;
				if (window.__c.user) {
					window.__c.isAuth = true;

					// Authorization header token
					$.ajaxSetup({
						headers: {
							'Authorization': 'JWT ' + window.__c.user.token
						}
					});
				}
			}
			
			// Perform the default 'start' functionality
			Marionette.Application.prototype.start.apply(this, [options]);

			// Add in the site navigation
			var navigationView = new NavigationView();
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

			// I'm going to use
			// hashes for internal navigation.
			Backbone.History.started || Backbone.history.start({ pushState: false });
			//Backbone.history.start();
		}
	});
});
