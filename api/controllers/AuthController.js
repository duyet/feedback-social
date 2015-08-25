/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */
var passport = require('passport');
/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {
	console.log("=========> ", error, user, info);
	if (error) return res.serverError(error);
	if (!user) return res.unauthorized(null, info && info.code, info && info.message);

	return res.ok({
		// TODO: replace with new type of cipher service
		token: CipherService.createToken(user),
		user: user
	});
}

module.exports = {
	/**
	 * Sign up in system
	 * @param {Object} req Request object
	 * @param {Object} res Response object
	 */
	signup: function(req, res) {
		User
			.create(_.omit(req.allParams(), 'id'))
			.then(function(user) {
				return {
					// TODO: replace with new type of cipher service
					token: CipherService.createToken(user),
					user: user
				};
			})
			.then(res.created)
			.catch(res.serverError);
	},

	/**
	 * Sign in by local strategy in passport
	 * @param {Object} req Request object
	 * @param {Object} res Response object
	 */
	signin: function(req, res) {
		passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res);
	},

	/**
	 * Sign out to all
	 * @param {Object} req Request object
	 * @param {Object} res Response object
	 */
	signout: function(req, res) {
		req.logout();

		res.ok({
			message: 'logout'
		});
	},

	facebook: function(req, res, next) {
		console.log("------------ FACEBOOK --------------");
		passport.authenticate('facebook', {
			scope: ['email', /*'user_about_me'*/]
		},
		function(err, user) {
			req.logIn(user, function(err) {
				if (err) {
					req.session.flash = 'There was an error';
					console.log("Error");
					res.redirect('user/login');
				} else {
					req.session.user = user;
					console.log(req, res);		
					//res.redirect('/user/dashboard');
				}
			});
		})(req, res, next);

	},

	facebook_callback: function(req, res, next) {
		console.log("------------ CALLBACK --------------");
		passport.authenticate('facebook', _onPassportAuth.bind(this, req, res))(req, res, next);
	},
};
