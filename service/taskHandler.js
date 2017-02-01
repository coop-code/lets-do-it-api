var taskConnection = require("../data/tasksConnection.js");

function Task(title, description, comments, deadline) {
    this.title = title;
    this.description = description || "";
    this.registrationDate = new Date(Date.now());
    this.done = false;
    this.comments = comments || "";
    this.deadline = new Date(Date.now()) + 2592000000 || 0 ; // 1 mes
}

/* Get all tasks */
function GetAll(response) {
    taskConnection.GetAll(response);
}

/* Get task by id */
function Get(id, response) {
    taskConnection.Get(id, response);
}

/* Validate the task and add default informations before submit to insert */
function Insert(taskPost, response) {
    if(Validate(taskPost, response)){
    	var task = new Task(taskPost.title, taskPost.description, taskPost.comments, taskPost.deadline);
    	taskConnection.Insert(task, response);
    }
}

/*Delete a task by id */
function Delete(id, response) {
    taskConnection.Delete(id, response);
}

function Validate(taskPost, response) {
    if (taskPost && taskPost.length > 0) {
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
    taskConnection.Delete(id, response);
}

/*Update a task by id */
function Update(id, taskUpdate, response) {
	if(Validate(taskUpdate, response)){
		taskConnection.Update(id, taskUpdate, response);
	}
}

/*Update a task by id */
function Done(id, response) {
    taskConnection.Done(id, response);
}

/*================WARNING: REMOVE FROM PRODUCTION================*/
/* Delete all tasks */
function DeleteAll(response){
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
