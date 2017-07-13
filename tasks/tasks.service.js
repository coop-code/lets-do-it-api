var taskConnection = require("./tasks.repository.js");
let moment = require('moment');

async function GetByFilter(finished) {
	let tasks = JSON.parse(JSON.stringify(await taskConnection.GetByFilter(finished)));
	return customizeFieldsOfArray(tasks);
}

async function GetById(id) {
	let task = JSON.parse(JSON.stringify(await taskConnection.GetById(id)));
	return customizeFieldsOfElement(task);
}
async function Post(task) {
	return await taskConnection.Post(task);
}

async function Update(id, task) {
	return await taskConnection.Update(id, task);
}

async function Delete(id) {
	return await taskConnection.Delete(id);
}


/*================WARNING: REMOVE FROM PRODUCTION================*/
/* Delete all tasks */
async function DeleteAll() {
	return await taskConnection.DeleteAll();
}

function customizeFieldsOfArray(tasks) {
	tasks.forEach(function (task) {
		task.registrationDate = ParseDate(task.registrationDate);
		task.deadlineDate = ParseDate(task.deadlineDate);
	});
	return tasks;
}

function customizeFieldsOfElement(task) {
	task.registrationDate = ParseDate(task.registrationDate);
	task.deadlineDate = ParseDate(task.deadlineDate);
	return task;
}

function ParseDate(timestamp) {
	if (timestamp) {
		return moment(timestamp).format();
	} else {
		return undefined;
	}
}

exports.DeleteAll = DeleteAll;
/*===========================================================*/

exports.GetByFilter = GetByFilter;
exports.GetById = GetById;
exports.Post = Post;
exports.Update = Update;
exports.Delete = Delete;