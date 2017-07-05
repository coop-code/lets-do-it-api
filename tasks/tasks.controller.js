var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var taskService = require('./tasks.service.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

const getTasksAsync = async function getTasksAsync(req, res) {
	let tasks = [];
	try {
		tasks = await taskService.GetByFilter(req.query.finished);
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).send(error.message);
	}
}

router.route('/')
	/* Get all tasks */
	.get(getTasksAsync)
	.post(function (req, res) {
		"use strict";
		var task = req.body;
		taskService.Insert(task, res);
	});

router.route('/:id')
	/* Get Task by id */
	.get(function (req, res) {
		"use strict";
		taskService.GetByFilter(req.params.id, res);
	})
	/* Delete a task by id */
	.delete(function (req, res) {
		"use strict";
		taskService.Delete(req.params.id, res);
	})
	/* Update Task by id */
	.put(function (req, res) {
		"use strict";
		var task = req.body;
		taskService.Update(req.params.id, task, res);
	});

/*================WARNING: REMOVE FROM PRODUCTION================/*
/* Delete all tasks */
router.delete('/', function (req, res) {
	"use strict";
	taskService.DeleteAll(res);
});



/*===========================================================/*
 * 
 */
module.exports = router;