var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var tasksController = require('./tasks/tasks.controller');
var pingController = require('./ping/ping.controller');

var app = express();

/* Allow access from anywhere, including from local app */
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


//Routes and Controllers configurations
app.use('/tasks', tasksController);
app.use('/ping', pingController);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	"use strict";
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//Default port is 4001 if not set by environment variable
app.set('port', process.env.PORT || '4001');

//Start the server
var server = app.listen(app.get('port'), function () {
	"use strict";
	console.log ('Lets Do It API listening on port ' + server.address().port);
});
