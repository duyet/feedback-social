module.exports.settings = {
	// Page title
	title: "Phản hồi", 
	
	// Page logo text
	logo_text : "PHANHOI.XYZ",
	
	// Page logo image path
	logo_img: "",
	
	// Page default description
	description: "",
	
	// System build version
	system_build: "0.0.1",
	
	// ReCaptcha API
	reCaptcha: {
		active: false,
		site_key: '6LdBZAsTAAAAAACF7i6WYy5KmyZl_1SxrdplP-sk',
		secret_key: '6LdBZAsTAAAAAEoEIEWNf2O4CoOAsSu3MmVXVGet',	
	},
	
	// Debug in client
	client_debug: true,
	
	// API Prefix
	api_prefix: '/api/v1',
	
	// Google analytics tracking code
	google_analytic: 'UA-18218315-48',
	
	// Active responsive layout
	active_responsive: true,
	
	// Allow html tag in comments
	comment_allow_tags: [ 'br', 'hr', 'strike', 'em', 'i', 'strong', 'a', 'ul', 'ol', 'li', 'p', 'span', 'div', 'img', 'video', 'audio', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td' ], 
	
	// =======================
	get: function(key) {
		if (!this.key) return false;
		
		return this.key;	
	},
};