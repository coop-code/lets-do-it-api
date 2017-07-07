let {
	CreateTaskDto,
	PutTaskDto
} = require('./models/task.dto');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var taskService = require('./tasks.service.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

/* Functions associated to routes */
const getTasksAsync = async function getTasksAsync(req, res) {
	let tasks = [];
	try {
		tasks = await taskService.GetByFilter(req.query.finished);
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).send({
			"status": 500,
			"error": error.message
		});
	}
}

const getTaskAsync = async function getTask(req, res) {
	let task = {};
	try {
		task = await taskService.GetById(req.params.id);
		if (task) {
			res.status(200).send(task);
		} else {
			res.status(404).send();
		}
	} catch (error) {
		res.status(500).send({
			"status": 500,
			"error": error.message
		});
	}
}

const postTaskAsync = async function postTaskAsync(req, res) {
	let task = {};
	let createTaskDto = new CreateTaskDto(req.body);
	try {
		task = await taskService.Post(createTaskDto);
		res.status(201).send(task);
	} catch (error) {
		res.status(500).send({
			"status": 500,
			"error": error.message
		});
	}
}

const putTaskAsync = async function putTaskAsync(req, res) {
	try {
		let status = {};
		let putTaskDto = new PutTaskDto(req.body);
		status = await taskService.Put(req.params.id, putTaskDto);
		if (status.code == 404) {
			res.status(404).send();
		} else {
			res.status(204).send();
		}
	} catch (error) {
		res.status(500).send({
			"status": 500,
			"error": error.message
		});
	}
}

const deleteTaskAsync = async function deleteTaskAsync(req, res) {
	try {
		let status = {};
		status = await taskService.Delete(req.params.id);
		if (status.code == 404) {
			res.status(404).send();
		} else {
			res.status(204).send();
		}
	} catch (error) {
		res.status(500).send({
			"status": 500,
			"error": error.message
		});
	}
}

/* Routes definitions */

router.route('/')
	.get(getTasksAsync)
	.post(postTaskAsync);

router.route('/:id')
	.get(getTaskAsync)
	.put(putTaskAsync)
	.delete(deleteTaskAsync);
	
//================WARNING: REMOVE FROM PRODUCTION================//
// Delete all tasks
router.delete('/', function (req, res) {
	"use strict";
	taskService.DeleteAll(res);
});
//===========================================================//

module.exports = router;