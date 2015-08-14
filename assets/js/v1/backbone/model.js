/**
 * Main backbone frontend controller 
 *  -> BACKBONE MODEL
 *
 * @author: Van-Duyet Le (duyetdev)
 * @date: 14/08/2015
 */

// ================================================
// User
// ================================================
User = Backbone.Model.extend({
	initialize: function() {

	},

	defauls: {
		_id: '',
		name: 'Guest',
		username: 'guest',
		
	}
});