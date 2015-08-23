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
              return this.titleToAlias(username)[0].toUpperCase() || "";
        },

        titleToAlias: function(t) {
            var title = t || '';
            title = title.toLowerCase()
                .replace(/ /g,'')
                .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
                .replace(/\ /g, '')
                .replace(/đ/g, "d")
                .replace(/đ/g, "d")
                .replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y")
                .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u")
                .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ.+/g,"o")
                .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ.+/g, "e")
                .replace(/ì|í|ị|ỉ|ĩ/g,"i")
                .replace(/[-_]+/g, '')
                .replace(/[^\w-]+/g,'')
                .replace(/^[^A-z0-9]+/, '')
                .replace(/([^A-z0-9]+)$/, '');
            return title;
        },
    });

});