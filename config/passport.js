/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;

var EXPIRES_IN_MINUTES = 60 * 24;
var SECRET = process.env.tokenSecret || "4ukI0uIVnB3iI6fTbNg7jO41EAtl20J5F7Trtwe7OM";
var ALGORITHM = "HS256";
var ISSUER = "phanhoi.xyz";
var AUDIENCE = "phanhoi.xyz";

var FACEBOOK_CLIENT_KEY = "344116659122210";
var FACEBOOK_SECRET_KEY = "211d877bd33806f9d42fa8988c2c779f";
var FACEBOOK_CALLBACK_URL = "http://phanhoi.xyz:1337/api/v1/auth/facebook_callback";

/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
	secretOrKey: SECRET,
	issuer: ISSUER,
	audience: AUDIENCE,
	passReqToCallback: false
};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {
	var criteria = (email.indexOf('@') === -1) ? {
		username: email
	} : {
		email: email
	};
	User.findOne(criteria)
		.exec(function(error, user) {
			if (error) return next(error, false, {});

			if (!user) return next(null, false, {
				code: 'E_USER_NOT_FOUND',
				message: email + ' is not found'
			});

			// TODO: replace with new cipher service type
			if (!CipherService.comparePassword(password, user))
				return next(null, false, {
					code: 'E_WRONG_PASSWORD',
					message: 'Password is wrong'
				});

			return next(null, user, {});
		});
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
	var user = payload.user;
	return next(null, user, {});
}


/**
 * Find user by user id
 */
function findById(id, next) {
	User.findOne(id).exec(function(err, user) {
		if (err)
			return next(null, null);
		else
			return next(null, user);
	});
}

/**
 * Find user by facebook id
 */
function findByFacebookId(id, next) {
	User.findOne({
		socialProfiles: {
			facebook: {
				profile_id: id
			}
		}
	}).exec(function(err, user) {
		if (err) {
			return next(null, null);
		} else {
			return next(null, user);
		}
	});
}

passport.use(
	new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(
	new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

passport.use(new FacebookStrategy({
	clientID: FACEBOOK_CLIENT_KEY,
	clientSecret: FACEBOOK_SECRET_KEY,
	callbackURL: FACEBOOK_CALLBACK_URL,
	profileFields: ["about","email","displayName", "gender", "profileUrl"]
	// enableProof: true
}, function(accessToken, refreshToken, profile, done) {
	console.log(accessToken, refreshToken, profile, done);
	findByFacebookId(profile.id, function(err, user) {

		// Create a new User if it doesn't exist yet
		if (!user) {
			var newProfile = {};
			
			newProfile.username = profile.username || profile.id || '';
			newProfile.displayName = profile.displayName || '';
			newProfile.email = profile.emails ? profile.emails[0].value : '';
			newProfile.photo = "https://graph.facebook.com/"+ profile.id +"/picture?width=5000&access_token=" + accessToken;
			newProfile.gender = profile.gender || '';
			newProfile.socialProfiles = {
				facebook: profile._json
			}

			newProfile.socialProfiles.facebook.accessToken = accessToken;
			newProfile.socialProfiles.facebook.refreshToken = refreshToken;

			console.log(":::::::::::::::::::::::::::", (newProfile));

			
			User.create(
				newProfile
			).exec(function(err, user) {
				if (user) {
					console.log(null, user, {
						message: 'Logged In Successfully'
					});
					return done(null, user, {
						message: 'Logged In Successfully'
					});
				} else {
					console.log(err, null, {
						message: 'There was an error logging you in with Facebook'
					});
					return done(err, null, {
						message: 'There was an error logging you in with Facebook'
					});
				}
			});

			// If there is already a user, return it
		} else {
			return done(null, user, {
				message: 'Logged In Successfully'
			});
		}
	});
}));

module.exports.jwtSettings = {
	expiresInMinutes: EXPIRES_IN_MINUTES,
	secret: SECRET,
	algorithm: ALGORITHM,
	issuer: ISSUER,
	audience: AUDIENCE
};
