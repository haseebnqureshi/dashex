'use strict';

var fs = require('fs-extra');
var path = require('path');

try {
	var to = process.cwd();
	var from = path.resolve(path.dirname(__dirname), 'dashex');
	fs.moveSync(from, to, { overwrite: true });
}
catch (err) {
	console.log('dashexpress postinstall.js', err);
}
