// const Sequelize = require('sequelize');

// module.exports = function(connection) {
// 	const UserOrgRole = connection.define('user_organization_role', {
// 		userId: {
// 			type: Sequelize.INTEGER,
// 			allowNull: false
// 		},
// 		organizationId: {
// 			type: Sequelize.INTEGER,
// 			allowNull: false
// 		},
// 		roleId: {
// 			type: Sequelize.INTEGER,
// 			allowNull: false
// 		}
// 	}, {
// 		freezeTableName: true
// 	});

// 	UserOrgRole.sync();

// 	return UserOrgRole;
// };

const mongoose = require("mongoose");

const userOrgRoleSchema = mongoose.Schema({
	userId: {
		type: Number,
		require: true
	},
	organizationId: {
		type: Number,
		require: true
	},
	roleId: {
		type: Number,
		require: true
	}
});

const UserOrgRole = mongoose.model("UserOrgRole", userOrgRoleSchema);
module.exports = UserOrgRole; 