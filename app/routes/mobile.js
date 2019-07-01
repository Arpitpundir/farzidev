const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');

module.exports = function(config) {
	const s3 = new AWS.S3({
		region: config.aws.region
	});

	const bucket = config.aws.bucket;

	router.use((req, res, next) => {
		if(req.headers['user-agent'].toLowerCase().indexOf('pheoko') < 0) {
			return res.redirect('http://pheoko.com');
		}

		else {
			next();
		}
	});

	router.get('/ls', (req, res, next) => {
		if(!req.query.directory) {
			return res.send({
				status: 'err',
				error: 'Missing required parameters'
			});
		}

		const prefix = req.query.directory.replace(/\\/g, '/');

		s3.listObjects({
			Bucket: bucket,
			Prefix: prefix
		}, (err, data) => {
			if(err) {
				console.log(err);
				return res.send({
					status: 'err',
					error: 'Could not query S3'
				});
			}

			res.send(data);
		});
	});

	router.post('/decision', (req, res, next) => {
		console.log(req.body);

		const { decision, tag, key } = req.body

		if(!decision || !tag || !key) {
			return res.send({
				status: 'err',
				error: 'Missing required parameters'
			});
		}

		res.send({
			status: 'ok',
			decision,
			tag,
			key
		});
	});

	return router;
};