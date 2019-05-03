const Sequelize = require('sequelize');

module.exports = function(connection) {
	const Token = connection.define('token', {
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		token: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, {
		freezeTableName: true
	});

	Token.sync();

	return Token;
};