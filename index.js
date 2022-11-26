// Requiring module
const express = require("express");
var path = require('path');

const app = express();

function authentication(req, res, next) {
	// Function that authenticate the users
	var authheader = req.headers.authorization;
	console.log(req.headers);
	//Checking if user is authenticated
	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}
	//vars to get login and password from user
	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
	//checking users login and password
	if (user == 'lol' && pass == 'lol') {
		// If user and password is correct go to next step, if not print the error
		// If Authorized user
		next();
	} else {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}

}
// First step is the authentication of the client
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));

// Server setup
app.listen((3000), () => {
	console.log("Server is Running");
})
