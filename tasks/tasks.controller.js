//External requires
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Joi = require('joi');
let jsonPatch = require('fast-json-patch');

//Internal requires
let {CreateTaskDto, PatchTaskDto} = require('./models/task.dto');
var tasksRepository = require('./tasks.repository.js');
let postTaskSchema = require('./validators/post-task.schema');
let patchTaskSchema = require('./validators/patch-task.schema');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

//----------------------------------------//

/* Functions associated to routes */
//Get list of tasks
const getTasksAsync = async function getTasksAsync(req, res) {
	let tasks = [];
	try {
		tasks = await tasksRepository.GetByFilter(req.query.finished);
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).send({
			"status": 500,
			"error": error.message
		});
	}
}

//Get task by ID
const getTaskAsync = async function getTask(req, res) {
	let task = {};
	try {
		task = await tasksRepository.GetById(req.params.id);
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

//POST task (Insert new task)
const postTaskAsync = async function postTaskAsync(req, res) {
	let task = {};
	let createTaskDto = new CreateTaskDto(req.body);
	
	//Task fields validation
	const validationResult = Joi.validate(createTaskDto, postTaskSchema);
	if (validationResult.error) {
		res.status(422).send(validationResult.error.details);
	} else {
		try {
			task = await tasksRepository.Insert(createTaskDto);
			res.status(201).send(task);
		} catch (error) {
			res.status(500).send({
				"status": 500,
				"error": error.message
			});
		}
	}
}

//PATCH task (Update a task)
const patchTaskAsync = async function patchTaskAsync(req, res) {
	try {
		//Check if the task exists
		let task = await tasksRepository.GetById(req.params.id);
		if (task) {
			let	taskToUpdate = jsonPatch.applyPatch(task, req.body).newDocument;
			taskToUpdate = new PatchTaskDto(taskToUpdate);
			
			//Task fields validation (after the update)
			const validationResult = Joi.validate(taskToUpdate, patchTaskSchema);
			if (validationResult.error) {
				//Task is not valid
				res.status(422).send(validationResult.error.details);
			} else {
				//Task exists and is valid, proceed with the update...
				await tasksRepository.Update(req.params.id, taskToUpdate);
				res.status(204).send();
			}
		} else {
			//Task does not exists
			res.status(404).send();
		}
	} catch (error) {
		res.status(500).send({
			"status": 500,
			"error": error.message
		});
	}

}

//Delete a task
const deleteTaskAsync = async function deleteTaskAsync(req, res) {
	try {
		let status = {};
		status = await tasksRepository.Delete(req.params.id);
				
		if (status.code == 404) {
			//Task not found
			res.status(404).send();
		} else {
			//Task deleted successfully
			res.status(204).send();
		}
	} catch (error) {
		res.status(500).send({
			"status": 500,
			"error": error.message
		});
	}
}

//Delete all tasks
//******* Warning : this function is NOT ADVISED on production environments **********
const deleteAllTasksAsync = async function deleteAllTasksAsync(req, res) {
	try {
		await tasksRepository.DeleteAll();
		res.status(204).send();
	} catch (error) {
		res.status(500).send({
			"status": 500,
			"error": error.message
		});
	}
}

//----------------------------------------//

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