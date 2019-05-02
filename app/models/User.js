const Sequelize = require('sequelize');

module.exports = function(connection) {
	const User = connection.define('user', {
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		phone: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		verified: {
			type: Sequelize.BOOLEAN
		}
	}, {
		freezeTableName: true
	});

	User.sync();

	return User;
};