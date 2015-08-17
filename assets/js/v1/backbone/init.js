/**
 * Main backbone frontend controller 
 *  -> Init
 *
 * @author: Van-Duyet Le (duyetdev)
 * @date: 14/08/2015
 */

// ==================================================
// Init Backbone.Marionette
// ==================================================
var FeedbackApp = Backbone.Marionette.Application.extend({
	initialize: function(options) {
		// Show log console 
		this.debug = options.debug || false;
		if (!this.debug) console.log = function() {};

		// Main view
		this.container = options.container || '#main-view';

		// Version and build
		this.version = options.version || '';
		this.build = options.build || '';

		// Router 
		this.router = new AppRouter();

		// Start history 
		Backbone.history.start();

		this.router.navigate(location.hash, true)

		// User manager 
		this.user = new UserModel();
	},

	StaticView: Marionette.ItemView.extend({
		render: function() {
			$(this.el).html(_.template(JST['assets/templates/home.html']()))
		}
	}),

	RegionContainer: Marionette.LayoutView.extend({
		el: "body",
		regions: {
			main: this.container
		}
	}),

	start: function() {
		console.log("Start Application.");


		
		// Render defaul static view
		var staticView = new this.StaticView({
			el: this.container
		});
		staticView.render();

		// Render nav and footer 
		(new FooterView({ el: $("footer") })).render(this.version);

		// Render main menu > login view
		var UserInfo = {
			user_id: 0,
			username: ''
		};
		(new MainMenuLoginView()).render();
	},
});

var app = new FeedbackApp({
	container: '#main-view',
	debug: true,
	version: "0.0.1",
	build: '',
});
app.start();


//var footerView = new FooterView({ el: $("footer") });

// Init router 
var router = new AppRouter();