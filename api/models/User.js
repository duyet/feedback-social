/**
 * User
 * @description :: Model for storing users
 */
module.exports = {
	schema: true,
	attributes: {
		username: {
			type: 'string',
			required: true,
			unique: true,
			alphanumericdashed: true
		},
		password: {
			type: 'string'
		},
		email: {
			type: 'string',
			// email: true,
			required: true,
			unique: true
		},
		displayName: {
			type: 'string',
			defaultsTo: ''
		},
		photo: {
			type: 'string',
			defaultsTo: '',
			url: true
		},
		socialProfiles: {
			type: 'object',
			defaultsTo: {}
		},
 
		toJSON: function () {
			var obj = this.toObject();
			delete obj.password;
			delete obj.socialProfiles;
			return obj;
		}
	},
	beforeUpdate: function (values, next) {
		CipherService.hashPassword(values);
		next();
	},
	beforeCreate: function (values, next) {
		CipherService.hashPassword(values);
		next();
	}
};