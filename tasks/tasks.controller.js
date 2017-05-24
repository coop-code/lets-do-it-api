var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var taskService = require('./tasks.service.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.route('/')
	/* Get all tasks */
	.get(function(req, res) {
		"use strict";
		taskService.GetByFilter(req.query.finished, res);
	})
	/* Post a Task (with title and description). The task handler add default informations before inserting */
	.post(function(req, res) {
		"use strict";
		var task = req.body;
		taskService.Insert(task, res);
	});

router.route('/:id')
	/* Get Task by id */
	.get(function(req, res) {
		"use strict";
		taskService.GetById(req.params.id, res);
	})
	/* Delete a task by id */
	.delete(function(req, res) {
		"use strict";
		taskService.Delete(req.params.id, res);
	})
	/* Update Task by id */
	.put(function(req, res) {
		"use strict";
		var task = req.body;
		taskService.Update(req.params.id, task, res);
	});

	
/*================WARNING: REMOVE FROM PRODUCTION================/*
/* Delete all tasks */
router.delete('/', function(req, res) {
	"use strict";
	taskService.DeleteAll(res);
});
/*===========================================================/*
 * 
 */
module.exports = router;