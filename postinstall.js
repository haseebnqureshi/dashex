'use strict';

var fs = require('fs-extra');
var from = __dirname + '/dashdb';
var to = `${process.env.PWD}/dashdb`;
fs.move(from, to, { overwrite: true });
