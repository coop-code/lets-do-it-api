//External requires
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Joi = require('joi');
let jsonPatch = require('fast-json-patch');

//Internal requires
let {
	CreateTaskDto,
	PatchTaskDto
} = require('./models/task.dto');
var tasksRepository = require('./tasks.repository.js');
let postTaskSchema = require('./validators/post-task.schema');
let patchTaskSchema = require('./validators/patch-task.schema');
const errorNames = require('../config/error-names');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));


//----------------------------------------//
const validationErrorObject = (validationError) => {
	let error = {};
	error.name = errorNames.UnprocessableEntityError;
	error.message = "Validation Error";
	error.details = validationError.details;
	return error;
}

//----------------------------------------//
/* Functions associated to routes */
//Get list of tasks
const getTasksAsync = async function getTasksAsync(req, res) {
	let tasks = await tasksRepository.GetByFilter(req.query.finished);
	res.status(200).send(tasks);
}

//Get task by ID
const getTaskAsync = async function getTask(req, res, next) {
	try {
		let task = await tasksRepository.GetById(req.params.id);
		console.log(task);
		res.status(200).send(task);
	} catch (err) {
		next(err);
	}
}

//POST task (Insert new task)
const postTaskAsync = async function postTaskAsync(req, res, next) {
	const createTaskDto = new CreateTaskDto(req.body);

	//Task fields validation
	const validationResult = Joi.validate(createTaskDto, postTaskSchema);
	if (validationResult.error) {
		next(validationErrorObject(validationResult.error));
	} else {
		try {
			const task = await tasksRepository.Insert(createTaskDto);
			res.status(201).send(task);
		} catch (error) {
			next(error);
		}
	}
}

//PATCH task (Update a task)
const patchTaskAsync = async function patchTaskAsync(req, res, next) {
	try {
		let task = await tasksRepository.GetById(req.params.id);
		let taskToUpdate = jsonPatch.applyPatch(task, req.body).newDocument;
		taskToUpdate = new PatchTaskDto(taskToUpdate);

		//Task fields validation (after the update)
		const validationResult = Joi.validate(taskToUpdate, patchTaskSchema);

		if (validationResult.error) {
			next(validationErrorObject(validationResult.error));
		} else {
			await tasksRepository.Update(req.params.id, taskToUpdate);
			res.status(204).send();
		}
	} catch (error) {
		next(error);
	}
}
	

//Delete a task
const deleteTaskAsync = async function deleteTaskAsync(req, res, next) {
	try {
		await tasksRepository.Delete(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
}

//Delete all tasks
//******* Warning : this function is NOT ADVISED on production environments **********
const deleteAllTasksAsync = async function deleteAllTasksAsync(req, res, next) {
	try {
		await tasksRepository.DeleteAll();
		res.status(204).send();
	} catch (error) {
		next(error);
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