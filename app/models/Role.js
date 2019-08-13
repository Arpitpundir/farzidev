// const Sequelize = require('sequelize');

// module.exports = function(connection) {
// 	const Role = connection.define('role', {
// 		name: {
// 			type: Sequelize.STRING,
// 			allowNull: false
// 		}
// 	}, {
// 		freezeTableName: true
// 	});

// 	Role.sync();

// 	return Role;
// };

const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
	name:{
		type: String,
		required: [true, "A role must have a name"]
	}
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;