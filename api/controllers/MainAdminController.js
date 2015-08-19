//var phantom = require('node-phantom');

module.exports = {
	index : function(req, res) {
		return res.view('v1/admin', {layout: 'layout_v1'});
	},
};