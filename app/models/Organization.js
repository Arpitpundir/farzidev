// const Sequelize = require('sequelize');

// module.exports = function(connection) {
// 	const Organization = connection.define('organization', {
// 		name: {
// 			type: Sequelize.STRING
// 		},
// 		email: {
// 			type: Sequelize.STRING,
// 			allowNull: false
// 		},
// 		contact: {
// 			type: Sequelize.STRING,
// 			allowNull: false
// 		},
// 		contactDesignation: {
// 			type: Sequelize.STRING,
// 			allowNull: false
// 		},
// 		csm: {
// 			type: Sequelize.STRING
// 		}
// 	}, {
// 		freezeTableName: true
// 	});

// 	Organization.sync();

// 	return Organization;
// };

const mongoose = require("mongoose");
const validator = require("validator");

const organizationSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "An Organization must have a name."],
		unique: [true, "Every Organization must have a unique name."],
		maxlength: [40, "An Organization name should have 40 or less characters"],
		minlength: [10, "A tour organization should have 10 or more characters"],
	},
	email: {
		type: String,
		require: [true, "An organization must have an email"],
		validate: [validator.isEmail, "Please enter a valid email"],
		unique: true,
		lowercase: true
	},
	contact: {
		type: String,
		require: true
	},
	contactDesignation: {
		type: String,
		require: true	
	},
	csm: {
		type: String
	}
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;