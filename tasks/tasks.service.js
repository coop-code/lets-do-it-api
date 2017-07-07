var taskConnection = require("./tasks.repository.js");

/* Get tasks with filters */
async function GetByFilter(finished) {
	let tasks = [];
	tasks = await taskConnection.GetByFilter(finished);
	return tasks;
}

/* Get task by id */
async function GetById(id) {
	return await taskConnection.GetById(id);
}
async function Post(task) {
	return await taskConnection.Post(task);
}

/*Delete a task by id */
function Delete(id, response) {
	"use strict";
	taskConnection.Delete(id, response);
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
exports.Post = Post;
exports.Delete = Delete;
exports.Update = Update;