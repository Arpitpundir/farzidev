const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const config = require('./app/configs/config');
const passport = require('passport');

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

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
const Token = require('./app/models/Token')(sequelize);

const auth = require('./app/routes/auth')(passport, User, Token);
const user = require('./app/routes/user')(passport, config);
const mobile = require('./app/routes/mobile')(config);
app.use('/', auth);
app.use('/users', user);
app.use('/mobile', mobile);

app.listen(8000, function() {
	console.log('listening on port 8000');
});