//External require
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');

//Internal require
let tasksController = require('./tasks/tasks.controller');
let pingController = require('./ping/ping.controller');

let app = express();

/* Allow access from anywhere, including from local app */
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Url that points to the API Documentation
app.use('/docs', express.static(path.join(__dirname, '/docs')))

//Routes and Controllers configurations
//Further routes starting from the routes below are defined in each controller.
app.use('/tasks', tasksController);
app.use('/ping', pingController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	res.status(404).send(err.message);
});

//Default port is 4001 if not set by environment variable
app.set('port', process.env.PORT || '4001');

//Start the server
var server = app.listen(app.get('port'), function () {
	console.log ('Lets Do It API listening on port ' + server.address().port);
});
