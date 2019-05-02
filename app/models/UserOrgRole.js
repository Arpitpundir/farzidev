const Sequelize = require('sequelize');

module.exports = function(connection) {
	const UserOrgRole = connection.define('user_organization_role', {
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		organizationId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		roleId: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, {
		freezeTableName: true
	});

	UserOrgRole.sync();

	return UserOrgRole;
};