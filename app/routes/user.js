const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
	region: 'ap-southeast-1'
});

module.exports = function(passport) {
	router.use(passport.authenticate('jwt-auth', {
		session: false
	}));

	router.get('/info', function(req, res, next) {
		res.send({
			email: req.user.email,
			name: req.user.name || null,
			phone: req.user.phone || null
		})
	});

	router.get('/getuploadurl', function(req, res, next) {
		if(!req.query.filePath || !req.query.contentType) {
			return res.send({
				status: 'err',
				error: 'Missing required parameters'
			});
		}

		const filePath = req.query.filePath.replace(/\\/g, '/');

		const key = req.user.email + '/' + filePath;

		s3.getSignedUrl('putObject', {
			Bucket: 'storage.pheoko.com',
			Key: key,
			Expires: 60 * 60, // seconds
			ACL: 'bucket-owner-full-control',
			ContentType: req.query.contentType
		}, (err, url) => {
			if(err) {
				console.log('Could not get presigned URL from AWS S3');
				return res.send({
					status: 'err',
					error: 'Could not get pre-signed URL'
				});
			}

			res.send({
				status: 'ok',
				url: url
			});
		});
	});

	return router;
}