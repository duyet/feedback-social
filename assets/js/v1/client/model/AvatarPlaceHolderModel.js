define(function(require) {
    var Backbone = require('backbone');
    var __c = window.__c || {};
    
    return Backbone.Model.extend({
		generate: function(username, size) {
			var size = size || 350;
			var colors = ['99b433', '1e7145', 'ff0097', '9f00a7', '7e3878', '603cba', '00aba9', '2d89ef', '2b5797', 'e3a21a', 'da532c', 'b91d47'];
            var color = colors[Math.floor(Math.random()*colors.length)];
            var urls = 'https://placeholdit.imgix.net/~text?txtsize='+ (size - 100) +'&w='+ size +'&h='+ size +'&bg='+ color +'&txtclr=fff&txt=' + this.getFirstLetterFromName(username);

            return urls;
		},

		getFirstLetterFromName : function(username) {
              return username[0].toUpperCase() || "";
        },
    });

});