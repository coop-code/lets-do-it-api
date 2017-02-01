var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var taskHandler = require('../service/taskHandler.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Ping */
router.get('/ping', function(req, res, next) {
	res.send("pong!");
});


router.route('/tasks')
	/* Get all tasks */
	.get(function(req, res, next) {
		taskHandler.GetAll(res);
	})
	/* Post a Task (with title and description). The task handler add default informations before inserting */
	.post(function(req, res, next) {
	var task = req.body;
  	taskHandler.Insert(task, res);
	});

router.route('/tasks/:id')
	/* Get Task by id */
	.get(function(req, res, next) {
		taskHandler.Get(req.params.id, res);
	})
	/* Delete a task by id */
	.delete(function(req, res, next) {
		taskHandler.Delete(req.params.id, res);
	})
	/* Update Task by id */
	.put(function(req, res, next) {
		var task = req.body;
		delete task.done;
		taskHandler.Update(req.params.id, task, res);
	});

router.route('/tasks/:id/done')
	/* Ends a task */
	.put(function(req, res, next) {
		taskHandler.Done(req.params.id, res);
	});

	
/*================WARNING: REMOVE FROM PRODUCTION================/*
/* Delete all tasks */
router.delete('/tasks', function(req, res, next) {
	taskHandler.DeleteAll(res);
});
/*===========================================================/*
 * 
 */
module.exports = router;