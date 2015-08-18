//var phantom = require('node-phantom');

module.exports = {
	index : function(req, res) {
		/*
		if (typeof(req.query._escaped_fragment_) !== "undefined") {
			phantom.create(function(err, ph) {
				if (err) throw err;
				return ph.createPage(function(err, page) {
					var url = req.protocol + "://"+ req.hostname + ":1337/#!" + req.query._escaped_fragment_;
					return page.open(url, function(status) {
						return page.evaluate((function() {
							return document.getElementsByTagName('html')[0].innerHTML;
						}), function(err, result) {
							res.send(result);
							return ph.exit();
						});
					});
				});
			});
		} else 
		*/
			return res.view('v1/main', {layout: 'layout_v1'});
	},
};