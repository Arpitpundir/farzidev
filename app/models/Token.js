// const Sequelize = require('sequelize');

// module.exports = function(connection) {
// 	const Token = connection.define('token', {
// 		userId: {
// 			type: Sequelize.INTEGER,
// 			allowNull: false
// 		},
// 		token: {
// 			type: Sequelize.STRING,
// 			allowNull: false
// 		}
// 	}, {
// 		freezeTableName: true
// 	});

// 	Token.sync();

// 	return Token;
// };

const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema({
	userId: {
		type: Number,
		require: true
	},
	token: {
		type: String,
		require: true
	}
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;