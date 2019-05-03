const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtAuth = require('passport-jwt');

const JWTStrategy = jwtAuth.Strategy;

const jwtPrivateKey = 'temporary private key #123';

module.exports = function(passport, User, Token) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({ 
			where: { id: id } 
		}).then(function (err, user) {
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
			User.findOne({ 
				where: { email: email } 
			}).then(function(user) {
				if(!user) return done(null);
				bcrypt.compare(password, user.password, function(err, res) {
					if(err) return done(err);
					if(res === false) return done(null, false);
					else {
						return done(null, user);
					}
				});
			});
		}
	));

	passport.use('jwt-auth', new JWTStrategy({
		jwtFromRequest: req => req.header('Authorization'),
		secretOrKey: jwtPrivateKey
	}, function(payload, done) {
		console.log(payload);
		User.findOne({
			where: { email: payload.email }
		}).then(user => {
			console.log(user);
			if(!user) return done(null, false);
			return done(null, user);
		});
	}));

	router.post('/login', function(req, res, next) {
		passport.authenticate('local', function(err, user, info) {
			if(err) {
				console.log(err);
				return res.send({
					loggedIn: false,
					status: 'passport authenticate error'
				});
			}
			if(!user) {
				return res.status(400).send({
					loggedIn: false
				});
			}

			const token = jwt.sign({
				email: user.email
			}, jwtPrivateKey, (err, token) => {
				if(err) return res.status(500).send({
					loggedIn: false,
					status: 'token generation error'
				});

				Token.create({
					userId: user.id,
					token: token
				}).then(tokenInDB => {
					return res.send({
						loggedIn: true,
						token: tokenInDB.token
					});
				});
			});
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