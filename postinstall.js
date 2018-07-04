'use strict';

var exec = require('child_process').execSync;
var from = __dirname + '/dashex/';
var to = `${process.env.PWD}/dashex/`;
exec(`cp -R ${from} ${to}`);
