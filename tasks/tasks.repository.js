//External requires
const mongoose = require('mongoose');

//Internal requires
const Task = require('./models/task.schema');
const errorNames = require('../config/error-names');
mongoose.Promise = Promise;

//Get List of tasks (finished or done parameter is false by default)
async function GetByFilter(finished = 'false') {

	let isFinished = finished.toLowerCase() === 'true';
	const tasks = await Task.find({
		done: isFinished
	});
	return tasks;
}

/* Get a task by Id */
async function GetById(id) {
	try {
		const task = await Task.findById(id).exec();
		return task;
	} catch (err) {
		const error = new Error();
		error.name = errorNames.NotFoundError;
		throw error;
	}
}

/* Insert a new task */
async function Insert(task) {
	let newTask = Task({
		title: task.title,
		description: task.description,
		comments: task.comments,
		priority: task.priority,
		deadlineDate: task.deadlineDate
	});
	return await newTask.save();
}

async function Update(id, task) {
	return await Task.findByIdAndUpdate(id, {
		$set: {
			title: task.title,
			description: task.description,
			comments: task.comments,
			priority: task.priority,
			deadlineDate : task.deadlineDate,
			done: task.done
		}
	}).exec();
}

/*Delete a task by id */
async function Delete(id) {
	try {
		return await Task.findByIdAndRemove(id).exec();
	} catch (err) {
		const error = new Error();
		error.name = errorNames.NotFoundError;
		throw error;
	}
}

/*================WARNING: REMOVE FROM PRODUCTION================*/
/* Delete all tasks */
async function DeleteAll(response) {
	return await Task.remove({}).exec();
}

exports.DeleteAll = DeleteAll;
/*===========================================================*/

exports.GetByFilter = GetByFilter;
exports.GetById = GetById;
exports.Insert = Insert;
exports.Update = Update;
exports.Delete = Delete;