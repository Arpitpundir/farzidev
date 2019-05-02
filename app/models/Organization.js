const Sequelize = require('sequelize');

module.exports = function(connection) {
	const Organization = connection.define('organization', {
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		contact: {
			type: Sequelize.STRING,
			allowNull: false
		},
		contactDesignation: {
			type: Sequelize.STRING,
			allowNull: false
		},
		csm: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true
	});

	Organization.sync();

	return Organization;
};