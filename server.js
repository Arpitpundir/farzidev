const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8000, function() {
	console.log('listening on port 8000');
});