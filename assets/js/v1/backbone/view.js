/**
 * Main backbone frontend controller 
 *  -> Backbone view 
 *
 * @author: Van-Duyet Le (duyetdev)
 * @date: 14/08/2015
 */

// ==================================================
// Root view layout
// ==================================================
RootView = Marionette.LayoutView.extend({
	el: "#main-view",
});

// ==================================================
// Home view
// ==================================================
HomeView = Marionette.ItemView.extend({
	el: "#main-view",

	render: function() {
		$(this.el).html(_.template(JST['assets/templates/home.html']()))
	},
});

// ==================================================
// Footer view
// ==================================================
FooterView = Backbone.View.extend({
	initialize: function(version) {
		// this.render(version);
	},

	render: function(version) {
		var html = _.template(JST['assets/templates/footer.html'](version));
		this.$el.html(html);
	}
});

// ==================================================
// Login view
// ==================================================
LoginView = Backbone.View.extend({
	template: _.template(JST['assets/templates/login.html']()),
});