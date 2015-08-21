module.exports.settings = {
	title: "Phản hồi", 
	logo_text : "PHANHOI.XYZ",
	logo_img: "",
	description: "",
	
	reCaptcha: {
		active: false,
		site_key: '6LdBZAsTAAAAAACF7i6WYy5KmyZl_1SxrdplP-sk',
		secret_key: '6LdBZAsTAAAAAEoEIEWNf2O4CoOAsSu3MmVXVGet',	
	},
	
	client_debug: true,
	api_prefix: '/api/v1',
	
	google_analytic: 'UA-18218315-48',
	// active_responsive: true,
	
	// =======================
	get: function(key) {
		if (!this.key) return false;
		
		return this.key;	
	},
};