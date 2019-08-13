// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
// //const Sequelize = require('sequelize');
// const config = require('./app/configs/config');
// const passport = require('passport');

const app = require("./app");
const mongoose = require("mongoose");
//const port = 3000;
const dotenv = require("dotenv");//.config({path: "./config.env"});
//console.log(app.get("env"));
dotenv.config({path: "./config.env"});
//app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(passport.initialize());

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    //console.log(con.connections);
    console.log("DB connections successfull");
});

// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log('Connected to database successfully.');
// 	})
// 	.catch(err => {
// 		console.log('Unable to connect to database: ');
// 		console.log(err);
// 	});

// 


const port = process.env || 3000;

const server = app.listen(port, () => {
    console.log("Server has started.");
});
// app.listen(8000, function() {
// 	console.log('listening on port 8000');
// });


process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("Unhandeled Rejections-Shutting Down");
    server.close(() => {
        process.exit(1);
    });
});