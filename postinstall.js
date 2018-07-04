'use strict';

var exec = require('child_process').execSync;
var from = __dirname + '/dashdb/';
var to = `${process.env.PWD}/dashdb/`;
exec(`cp -R ${from} ${to}`);
