var taskConnection = require("../data/tasksConnection.js");

function Task(title, description, comments, deadline, priority) {
	"use strict";
	this.title = title;
    this.description = description || "";
    this.registrationDate = new Date(Date.now());
    this.done = false;
    this.comments = comments || "";
    this.deadline = deadline || (new Date(Date.now() + 2592000000)); // 1 mes
	this.priority = priority || false;
}

/* Get all tasks */
function GetAll(response) {
	"use strict";
	taskConnection.GetAll(response);
}

/* Get task by id */
function Get(id, response) {
	"use strict";
	taskConnection.Get(id, response);
}

/* Validate the task and add default informations before submit to insert */
function Insert(taskPost, response) {
	"use strict";
	if(Validate(taskPost, response)){
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
	console.log(taskPost);
	//console.log(taskPost.length);
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
	if(Validate(taskUpdate, response)){
		taskConnection.Update(id, taskUpdate, response);
	}
}

/*Update a task by id */
function Done(id, response) {
	"use strict";
	taskConnection.Done(id, response);
}

/*================WARNING: REMOVE FROM PRODUCTION================*/
/* Delete all tasks */
function DeleteAll(response){
	"use strict";
	taskConnection.DeleteAll(response);
}
exports.DeleteAll = DeleteAll;
/*===========================================================*/
exports.Get = Get;
exports.GetAll = GetAll;
exports.Insert = Insert;
exports.Delete = Delete;
exports.Update = Update;
exports.Done = Done;
exports.Task = Task;
