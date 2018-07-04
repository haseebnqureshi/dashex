Handling all the Express boilerplate with easy-outs.

# DashEX

![npm monthly downloads](https://img.shields.io/npm/dm/dashexpress.svg)
![github license](https://img.shields.io/github/license/haseebnqureshi/dashex.svg)

### npm install dashexpress --save

### Purpose & Features
For (1) quickly spinning up alpha projects, (2) without worry about keeping your boilerplate simple, concise and consistent between projects, (3) full access to lower level dependencies, giving you 100% power and flexibility, (4) authentication strategies and view components to come.

### Getting Started - Easy Start
```
var dashex = require('dashexpress')();

var app = dashex.app; //remember, js 'points' to the our dashex.app object, so we're not creating more overhead here

var express = dashex.express;

// view available objects, low-level dependencies and parameters
console.log(dashex);
```

### Options - Intermediate / Advanced Start
```
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

var dashex = require('dashexpress')(options);
```

### Public and Views Directories
By default, DashEX will create your ```public``` and ```views``` directories, for your static assets and template views respectively. If you want to bypass this behavior, simply pass empty strings to both ```publicDir``` and ```viewsDir``` options.

```
var defaults = {
	publicDir: ''
	viewsDir: ''
};

var dashex = require('dashexpress')(options);
```

### Methods
```dashex.run()``` instantiates ```express.listen``` for our application

