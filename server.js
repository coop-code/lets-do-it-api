var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Get port from environment and store in Express.
 */

app.set('port', process.env.PORT || '3000');

//Start the server
var server = app.listen(app.get('port'), function () {
  console.log ('Lets Do It API listening on port ' + server.address().port);
});
