var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

/* Allow access from anywhere, including from local app */
var cors = require('cors');
app.use(cors());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	"use strict";
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/**
 * Get port from environment and store in Express.
 */

app.set('port', process.env.PORT || '4001');

//Start the server
var server = app.listen(app.get('port'), function () {
	"use strict";
	console.log ('Lets Do It API listening on port ' + server.address().port);
});
