exports.Utils = function() {
	var crypto = require('crypto');
	
	var Utils = {
		md5: function(content) {
			return crypto.createHash('md5')
				.update(content)
				.digest('hex');
		},
		object2String: function(object) {
			return JSON.stringify(object);
		},
		string2Object: function(string) {
			return JSON.parse(string);
		},
	};
	
	return Utils;
};