'use strict';

try {
	var exec = require('child_process').execSync;
	var path = require('path');
	var from = path.resolve(__dirname, '/dashex/');
	var to = path.resolve('..', __dirname, '/dashex/');
	exec(`cp -R ${from} ${to}`);
}
catch (err) {
	console.log('dashexpress postinstall.js', err);
}
