var MetaInspector = require('node-metainspector');
var _ = require('lodash');

module.exports = {
	urlReview : function(req, res) {
		var url = req.param("url") || "";
		if (!url) {
			return res.json(400, {});
		}

		console.log("Helper.urlReview: ", url);
		var client = new MetaInspector(url, {});
		client.on("fetch", function(){
			var data = {
				host: client.host || "",
				title: client.title || client.ogTitle || "",
				author: client.author || "",
				keywords: client.keywords || "",
				description: client.description || "",
				images: [],
			};

			if (client.images.length) {
				for (var i = 0; i < client.images.length; i++) {
					if (_.findIndex(data.images, function(i) { return i == client.images[i]; }) == -1)
						data.images.push(client.images[i]);
				}
			}

			res.json(data);
		});
		
		client.on("error", function(err){
			console.log(err);
			return res.json(400, {});
		});

		client.fetch();
	},
};
