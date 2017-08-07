//External require
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');

//Internal require
let tasksController = require('./tasks/tasks.controller');
let usersController = require('./users/users.controller');
let pingController = require('./ping/ping.controller');
const errorHandlingMiddleware = require('./middlewares/error-handling');
const config = require('./config/main');
const connection = require('./middlewares/connection');
const passportConfig = require('./config/passport');
const passport = require('passport');

let app = express();

/* Allow access from anywhere, including from local app */
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Url that points to the API Documentation
app.use('/docs', express.static(path.join(__dirname, '/docs')))

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });

//Routes and Controllers configurations
//Further routes starting from the routes below are defined in each controller.
app.use('/tasks', requireAuth, tasksController);
app.use('/users', usersController);
app.use('/ping', pingController);

//Error Handling Middleware
app.use(errorHandlingMiddleware); 

//connect to mongoDB
connection.connect();

//Default port is 4001 if not set by environment variable
app.set('port', config.port);

//Start the server
var server = app.listen(app.get('port'), function () {
	console.log ('Lets Do It API listening on port ' + server.address().port);
});
