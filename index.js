'use strict';

var _ = require('underscore');
var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

var defaults = {
	configureInit: null, /* function override for setting initialization, including dotenv and connect-flash */
	configureParsers: null, /* function override for setting body parsers, including json */
	configurePublic: null, /* function override for setting static assets location */
	configureSessions: null, /* function override for enabling and configuring express-session */
	configureViews: null, /* function override for setting view engine and views location */
	dirname: '', /* __dirname of your application, so that any directories mount correctly from your application */
	port: 8080, /* in case no PORT is defined in process.env, express can at least start on this defined port */
	publicDir: 'public', /* instead of overriding public configuration, naming the directory for any public static assets */
	sessionInit: { /* instead of overriding session configuration, passing various options to modify express-sesssion behavior */
		secret: 'dash',
		resave: false,
		saveUninitialized: true
	},
	viewsDir: 'views', /* instead of overriding views configuration, naming the directory for any views to be rendered */
	viewEngine: 'pug' /* instead of overriding views configuration, setting our application's view engine */
};

var lib = {

	configureInit: function() {
		require('dotenv').config();
		app.use(flash());
	},

	configureParsers: function() {
		if (_.isFunction(defaults.configureParsers)) {
			return defaults.configureParsers();
		}
		app.use(bodyParser.urlencoded({ extended: false }));
	},

	configurePublic: function() {
		if (_.isFunction(defaults.configurePublic)) {
			return defaults.configurePublic();
		}
		app.use(express.static(this.publicFilepath()));
	},

	configureSessions: function() {
		if (_.isFunction(defaults.configureSessions)) {
			return defaults.configureSessions();
		}
		app.use(session(defaults.sessionInit));
	},

	configureViews: function() {
		if (_.isFunction(defaults.configureViews)) {
			return defaults.configureViews();
		}
		app.set('view engine', defaults.viewEngine);
		app.set('views', this.viewsFilepath());
	},

	publicFilepath: function() {
		return path.resolve(defaults.dirname, defaults.publicDir);
	},

	viewsFilepath: function() {
		return path.resolve(defaults.dirname, defaults.viewsDir);
	}

};


var api = function() {

	lib.configureInit();
	lib.configureViews();
	lib.configurePublic();
	lib.configureSessions();
	lib.configureParsers();

	return {

		app,

		bodyParser,

		dirname: defaults.dirname,

		express,

		flash,

		publicFilepath: lib.publicFilepath(),

		run: function(callback) {
			this.app.listen(process.env.PORT || defaults.port, function() {
				if (callback) { 
					callback(); 
				}
			});
			return this.runUrl = `http://localhost:${process.env.PORT || defaults.port}`;
		},

		session,

		viewEngine: defaults.viewEngine,

		viewsFilepath: lib.viewsFilepath()

	};

};


module.exports = function(dirname, options) {

	defaults = _.extend(defaults, options || {});

	defaults.dirname = dirname || process.env.PWD;

	return api();

};

