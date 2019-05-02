const Sequelize = require('sequelize');

module.exports = function(connection) {
	const Role = connection.define('role', {
		name: {
			type: Sequelize.STRING,
			allowNull: false
		}
	}, {
		freezeTableName: true
	});

	Role.sync();

	return Role;
};