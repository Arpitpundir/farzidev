const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./app/models/User');
const Organization = require('./app/models/Organization');
const Role = require('./app/models/Role');
const UserOrgRole = require('./app/models/UserOrgRole');
const Token = require('./app/models/Token');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());


const auth = require('./app/routes/auth')(passport, User, Token);
const user = require('./app/routes/user')(passport, config);
const mobile = require('./app/routes/mobile')(config);