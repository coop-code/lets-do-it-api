var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var taskHandler = require('../service/taskHandler.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Ping */
router.get('/ping', function(req, res) {
	"use strict";
	res.send("pong!");
});


router.route('/tasks')
	/* Get all tasks */
	.get(function(req, res) {
		"use strict";
		taskHandler.GetByFilter(req.query.finished, res);
	})
	/* Post a Task (with title and description). The task handler add default informations before inserting */
	.post(function(req, res) {
		"use strict";
		var task = req.body;
		taskHandler.Insert(task, res);
	});

router.route('/tasks/:id')
	/* Get Task by id */
	.get(function(req, res) {
		"use strict";
		taskHandler.GetById(req.params.id, res);
	})
	/* Delete a task by id */
	.delete(function(req, res) {
		"use strict";
		taskHandler.Delete(req.params.id, res);
	})
	/* Update Task by id */
	.put(function(req, res) {
		"use strict";
		var task = req.body;
		taskHandler.Update(req.params.id, task, res);
	});

	
/*================WARNING: REMOVE FROM PRODUCTION================/*
/* Delete all tasks */
router.delete('/tasks', function(req, res) {
	"use strict";
	taskHandler.DeleteAll(res);
});
/*===========================================================/*
 * 
 */
module.exports = router;