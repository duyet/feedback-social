/**
 * Main backbone frontend controller 
 *  -> Backbone view 
 *
 * @author: Van-Duyet Le (duyetdev)
 * @date: 14/08/2015
 */

// ==================================================
// Home view
// ==================================================
HomeView = Backbone.View.extend({
	template: _.template(JST['assets/templates/home.html']()),
});

// ==================================================
// Footer view
// ==================================================
FooterView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		var html = _.template(JST['assets/templates/footer.html']());
		this.$el.html(html);
	}
});

// ==================================================
// Footer view
// ==================================================
LoginView = Backbone.View.extend({
	template: _.template(JST['assets/templates/login.html']()),
});