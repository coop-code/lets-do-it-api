//Import driver
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var objectID = require('mongodb').ObjectID;
var fs = require('fs');
var TASKS_COLLECTION = 'tasks';

//Connection URL (local mongodb server)
var url = 'mongodb://127.0.0.1:27017/lets-do-it';

/*Get All tasks (title, description, registrationDate and done)*/
function GetAll(response){

	mongoClient.connect(url, function (err, db){
		if (err) {
			console.log ('Connection Failed. Error: ', err);
		} else {
			var collection = db.collection(TASKS_COLLECTION);
			/*Fields title, description, registrationDate and done. {} means no filters*/
			collection.find({}, { title: 1, description: 1, registrationDate: 1, deadline:1, comments: 1 , done: 1, _id : 1 }).toArray
                (function(err, result){		
					//Parse date to a legible format
					for (var i = 0; i < result.length; i++) {
						result[i].registrationDate = ParseDate(result[i].registrationDate);
					    result[i].deadline = ParseDate(result[i].deadline);
					}
					response.status(200);
					response.send(result);
			});
			db.close();
		}
	});
}

/* Get a task by Id */
function Get(id, response) {
	mongoClient.connect(url, function(err, db){
		if (err) {
			console.log ('Connection Failed. Error: ', err);
		} else {
			var collection = db.collection(TASKS_COLLECTION);
			try {
				var o_Id = new objectID (id);
				collection.findOne({_id : o_Id}, function (err, result){
				if (err) {
					res.status(500).send(err.message);
				}
				if (result) {
					//A task was found.
					//Parse date to a legible format
					result.registrationDate = ParseDate(result.registrationDate);
					result.deadline = ParseDate(result.deadline);
					response.status(200).send(result);
				} else {
					//Task not found.
					response.status(404).send("Task not found");
				}
			});	
			} catch (err) {
				response.status(400).send("Id is not valid.");
			}
		db.close();	
		}
	});
}

/* Insert a task and return status 201 (created) on success */
function Insert(task, response){
	mongoClient.connect(url, function(err, db){
		if (err) {
			console.log ('Connection Failed. Error: ', err);
		} else {
			db.collection(TASKS_COLLECTION).insert(task, function(err, result){
				assert.equal(err, null);
				result.ops[0].registrationDate = ParseDate(result.ops[0].registrationDate);
				result.ops[0].deadline = ParseDate(result.ops[0].deadline);
				response.send(result.ops[0]);
				response.status(201).send("Task created");
			});
			db.close();
		}
	});
}


/*Delete a task by id */
function Delete(id, response) {
	mongoClient.connect(url, function(err, db){
		if (err) {
			console.log ('Connection Failed. Error: ', err);
		} else {
			var collection = db.collection(TASKS_COLLECTION);
			try {
				var o_Id = new objectID (id);
				collection.deleteOne({_id : o_Id}, function (err, result){
					if (err) {
						response.status(500).send(err.message);
					}
					if (result && result.result.n > 0 ) {
						//A task was deleted
						response.status(200).send("Task deleted");
					} else {
						//No task were deleted, which means that there's no task with this id.
						response.status(404).send("Task not found");
					}
				});
			} catch (err) {
				response.status(400).send("Id is not valid.");
			}
			db.close();
		}
	});
}

function ParseDate(timestamp) {
	
	if (timestamp) {
        var date = new Date(timestamp);
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
		var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
		var year = date.getFullYear();
		var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  		var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		var sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		
	return day + "/" + month + "/" + year +  " " + hour + ":" + min + ":" + sec;

	} else {
		return "";
	} 
}

/* Update an existing task */
function Update(id, task, response){
	mongoClient.connect(url, function(err, db){
		if (err) {
			console.log ('Connection Failed. Error: ', err);
		} else {
			var o_Id = new objectID (id);
			try{
				db.collection(TASKS_COLLECTION).updateOne(
					{_id : o_Id},
					{$set: task},
					function(err, result) {
						if (err){
							response.status(500).send(err.message);
						}else{
							if (result && result.result.n > 0 ) {
								//A task was finished
								response.status(200).send("Task updated");
							} else {
								//No task were deleted, which means that there's no task with this id.
								response.status(404).send("Task not found");
							}
						}
					}
				);
			} catch (err) {
				response.status(400).send("Id is not valid");
			}
			db.close();
		}
	});
}

function Done(id, response){
	mongoClient.connect(url, function(err, db){
		if (err) {
			console.log ('Connection Failed. Error: ', err);
		} else {
			var o_Id = new objectID (id);
			try{
				db.collection(TASKS_COLLECTION).updateOne(
					{_id : o_Id},
					{$set: {done: true}},
					function(err, result) {
						if (err){
							console.warn(err.message)
							response.status(500).send(err.message);
						}else{
							if (result && result.result.n > 0 ) {
								//A task was finished
								response.status(200).send("Task finished");
							} else {
								//No task were deleted, which means that there's no task with this id.
								response.status(404).send("Task not found");
							}
						}
					}
				);
			} catch (err) {
				response.status(400).send("Id is not valid");
			}
			db.close();
		}
	});
}

/*================WARNING: REMOVE FROM PRODUCTION================*/
/* Delete all tasks */
function DeleteAll(response){
	console.log("Deleting all tasks...")
	mongoClient.connect(url, function (err, db){
		if (err) {
			console.log ('Connection Failed. Error: ', err);
		} else {
			var collection = db.collection(TASKS_COLLECTION);
			collection.remove({}, function (err, result){
				if (err) {
					response.status(500).send(err.message);
				}
				if (result && result.result.n > 0 ){
					//Tasks were deleted (all?)
					response.status(200).send("All tasks deleted");
				} else {
					//No task to delete
					response.status(404).send("No task found");
				}
			});
			db.close();
		}
	});
}
exports.DeleteAll = DeleteAll;
/*===========================================================*/
exports.GetAll = GetAll;
exports.Get = Get;
exports.Insert = Insert;
exports.Delete = Delete;
exports.Update = Update;
exports.Done = Done;