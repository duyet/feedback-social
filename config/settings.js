module.exports.settings = {
	title: "Phản hồi", 
	description: "",
	
	reCaptcha: {
		active: false,
		site_key: '6LdBZAsTAAAAAACF7i6WYy5KmyZl_1SxrdplP-sk',
		secret_key: '6LdBZAsTAAAAAEoEIEWNf2O4CoOAsSu3MmVXVGet',	
	},
	
	client_debug: true,
	
	// active_responsive: true,
	
	// =======================
	get: function(key) {
		if (!this.key) return false;
		
		return this.key;	
	},
};