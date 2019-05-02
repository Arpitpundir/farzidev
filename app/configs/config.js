const env = process.env.NODE_ENV;

let config;

if(env === 'production') {
	config = require('./environments/production');
}

else {
	config = require('./environments/development');
}

module.exports = config;