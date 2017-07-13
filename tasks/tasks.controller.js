let {
	CreateTaskDto,
	PatchTaskDto
} = require('./models/task.dto');


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var taskService = require('./tasks.service.js');
const Joi = require('joi');
const jsonPatch = require('fast-json-patch');
let postTaskSchema = require('./validators/post-task.schema');

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
	const result = Joi.validate(createTaskDto, postTaskSchema);
	if (result.error) {
		res.status(422).send(result.error.details);
	} else {
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
}

const patchTaskAsync = async function patchTaskAsync(req, res) {
	try {
		let task = await taskService.GetById(req.params.id);
		if (task) {
			let taskToUpdate = new PatchTaskDto(task);
			console.log(taskToUpdate);
			taskToUpdate = jsonPatch.applyPatch(taskToUpdate, req.body).newDocument;
			console.log(taskToUpdate);
			await taskService.Update(req.params.id, taskToUpdate);
			res.status(204).send();
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

//Function that removes all tasks (NOT ADVISED on production environments)
const deleteAllTasksAsync = async function deleteAllTasksAsync(req, res) {
	try {
		await taskService.DeleteAll();
		res.status(204).send();
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
	.post(postTaskAsync)
	.delete(deleteAllTasksAsync);

router.route('/:id')
	.get(getTaskAsync)
	.delete(deleteTaskAsync)
	.patch(patchTaskAsync);

module.exports = router;