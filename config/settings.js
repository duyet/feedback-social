module.exports.settings = {
	baseUrl: 'http://phanhoi.xyz:1337',

	// CDN Config 
	cdn: {
		host: '',
		active: false,
	},

	// View settings
	client: {
		// Page title
		title: "Phản hồi", 
		
		// Page logo text
		logo_text : "PHANHOI.XYZ",
		
		// Page logo image path
		logo_img: "",
		
		// Page default description, keywords
		description: "Phản hồi nhanh, kênh phản hồi ý kiến, nơi lên tiếng cho cộng đồng",
		keywords: "phản hồi, ý kiến, thông tin nhanh, phản hồi nhanh, feedback, lên tiếng, ủng hộ, phàn nàn",

		// Debug in client
		debug: true,

		// API Prefix
		api_prefix: '/api/v1',
		
		// Google analytics tracking code
		google_analytic: 'UA-18218315-48',

		// Active responsive layout
		active_responsive: true,

		// Sumo 
		sumo_site_id: '6d04b5d8224b4c835c38784ff97ff39007f029ed4dc40b9a046779d123a78d44',

		// Cookie auth key 
		cookieAuth: '__feedbackAuth',

		// ReCaptcha API
		reCaptcha: {
			active: false,
			site_key: '6LdBZAsTAAAAAACF7i6WYy5KmyZl_1SxrdplP-sk',
			secret_key: '6LdBZAsTAAAAAEoEIEWNf2O4CoOAsSu3MmVXVGet',	
		},
	},

	// System build version
	system_build: "0.0.1",
	
	// Allow html tag in comments
	comment_allow_tags: [ 'br', 'hr', 'strike', 'em', 'i', 'strong', 'a', 'ul', 'ol', 'li', 'p', 'span', 'div', 'img', 'video', 'audio', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td' ], 

	// =======================
	get: function(key) {
		if (!this.key) return false;
		
		return this.key;	
	},
};