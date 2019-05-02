const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

module.exports = function(User, passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		Users.findOne({ id: id }, function (err, user) {
			if(err) { return done(err); }
			done(null, user);
		});
	});


	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done) {
			User.findOne({ email: email }, function(err, user) {
				if(err) return done(err);
				if(!user) return done(null);
				bcrypt.compare(password, user.password, function(res) {
					if(res === false) return done(null, false);
					else {
						return done(null, user);
					}
				});
			});
		}
	));

	router.post('/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if(err) {
				console.log(err);
				return res.send({
					loggedIn: false,
					status: 'error'
				});
			}
			if(!user) {
				return res.status(400).send({
					loggedIn: false
				});
			}
			req.logIn(user, function(err) {
				if(err) { 
					console.log(err);
					return res.send({
						loggedIn: false,
						status: 'error'
					});
				}
				console.log(req.session);
				return res.status(200).send({
					loggedIn: true,
					sessionID: req.sessionID
				});
			})
		})(req, res, next);
	});

	router.post('/register', function(req, res) {
		console.log(req.body);

		if(!req.body.email || !req.body.password) {
			return res.status(400).send({
				status: 'err',
				error: 'You are missing some required fields, please try again.'
			});
		}

		bcrypt.hash(req.body.password, 10).then((pw) => {
			return User.create({
				name: req.body.name || null,
				email: req.body.email,
				password: pw,
				phone: req.body.phone || null,
				verified: false
			});
		}).then(newUser => {
			if(newUser) {
				res.status(200).send(newUser);
			}
		});
	});

	return router;
};