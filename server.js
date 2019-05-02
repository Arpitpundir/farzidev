const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const config = require('./app/configs/config');
const passport = require('passport');
const session = require('express-session');

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({
	secret: 'random secret key',
	resave: false,
	saveUninitialized: false
}));

const sequelize = new Sequelize(
	config.sql.database, 
	config.sql.username,
	config.sql.password,
	{
		host: config.sql.host,
		dialect: config.sql.dialect
	}
);

sequelize
	.authenticate()
	.then(() => {
		console.log('Connected to database successfully.');
	})
	.catch(err => {
		console.log('Unable to connect to database: ');
		console.log(err);
	});

const User = require('./app/models/User')(sequelize);
const Organization = require('./app/models/Organization')(sequelize);
const Role = require('./app/models/Role')(sequelize);
const UserOrgRole = require('./app/models/UserOrgRole')(sequelize);

const auth = require('./app/routes/auth')(User, passport);
app.use('/', auth);

app.listen(8000, function() {
	console.log('listening on port 8000');
});