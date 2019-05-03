const express = require('express');
const router = express.Router();

module.exports = function(passport) {
	router.get('/info', passport.authenticate('jwt-auth', {
		session: false
	}), function(req, res, next) {
		res.send({
			email: req.user.email,
			name: req.user.name || null,
			phone: req.user.phone || null
		})
	});

	return router;
}