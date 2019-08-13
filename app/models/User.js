// const Sequelize = require('sequelize');

// module.exports = function(connection) {
// 	const User = connection.define('user', {
// 		name: {
// 			type: Sequelize.STRING
// 		},
// 		email: {
// 			type: Sequelize.STRING,
// 			allowNull: false
// 		},
// 		phone: {
// 			type: Sequelize.STRING
// 		},
// 		password: {
// 			type: Sequelize.STRING
// 		},
// 		verified: {
// 			type: Sequelize.BOOLEAN
// 		}
// 	}, {
// 		freezeTableName: true
// 	});

// 	User.sync();

// 	return User;
// };

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: [3, "A name should have 3 or more letters"],
        minLength: [20, "A name should have 20 or less characters"],
        require: [true, "A name is required field."]
    },
    email: {
        type: String,
        require: [true, "An email is an required field."],
        validate: [validator.isEmail, "Please enter a valid email"],
        unique: true,
        lowercase: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        require: [true, "Password is a required field."],
        minLength: [8, "Password must be 8 or more characters long."],
        select: false
	},
	verified: {
		type: Boolean
	}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
