var taskConnection = require("./tasks.repository.js");

function Task(title, description, comments, deadline, priority) {
	"use strict";
	this.id = 0,
		this.title = title;
	this.description = description || "";
	this.registrationDate = new Date(Date.now());
	this.done = false;
	this.comments = comments || "";
	this.deadline = deadline || undefined
	this.priority = priority || false;
}

/* Get tasks with filters */
async function GetByFilter(finished) {
	"use strict";
	let tasks = [];
	tasks = await taskConnection.GetByFilter(finished);
	return tasks;
}

/* Get task by id */
function GetById(id, response) {
	"use strict";
	taskConnection.GetById(id, response);
}

/* Validate the task and add default informations before submit to insert */
function Insert(taskPost, response) {
	"use strict";
	if (Validate(taskPost, response)) {
		var task = new Task(taskPost.title, taskPost.description, taskPost.comments, taskPost.deadline, taskPost.priority);
		taskConnection.Insert(task, response);
	}
}

/*Delete a task by id */
function Delete(id, response) {
	"use strict";
	taskConnection.Delete(id, response);
}

function Validate(taskPost, response) {
	"use strict";
	if (taskPost) {
		if (!taskPost.title) {
			response.status(400).send("Please enter the title of the task.");
			return false;
		}
		return true;
	} else {
		response.status(400).send("Invalid Object");
		return false;
	}
}

/*Delete a task by id */
function Delete(id, response) {
	"use strict";
	taskConnection.Delete(id, response);
}

/*Update a task by id */
function Update(id, taskUpdate, response) {
	"use strict";
	if (Validate(taskUpdate, response)) {
		taskConnection.Update(id, taskUpdate, response);
	}
}

/*================WARNING: REMOVE FROM PRODUCTION================*/
/* Delete all tasks */
function DeleteAll(response) {
	"use strict";
	taskConnection.DeleteAll(response);
}
exports.DeleteAll = DeleteAll;
/*===========================================================*/
exports.GetByFilter = GetByFilter;
exports.GetById = GetById;
exports.Insert = Insert;
exports.Delete = Delete;
exports.Update = Update;
exports.Task = Task;