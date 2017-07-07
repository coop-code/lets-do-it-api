var assert = require('assert');
const mongoose = require('mongoose');
const Task = require('./models/task.schema');
mongoose.Promise = Promise;

/*****************
Connection URL is composed by user, password and host
Right now, the database is hosted in mongodb atlas. Feel free to change if you already have a database.
The current environment is just for studying purposes, so there's no need provide any additional security yet.
*****************/
const dbUser = 'lets-do-it-api';
const dbPassword = 'lets-do-it-password';
const dbHost = 'clustermongodb-shard-00-00-fpkbe.mongodb.net:27017,clustermongodb-shard-00-01-fpkbe.mongodb.net:27017,clustermongodb-shard-00-02-fpkbe.mongodb.net:27017/letsdoit?ssl=true&replicaSet=ClusterMongoDB-shard-0&authSource=admin'
const connectionString = 'mongodb://' + dbUser + ':' + dbPassword + '@' + dbHost;

async function GetByFilter(finished = 'false') {

	await getConnection(connectionString);
	let isFinished = finished.toLowerCase() === 'true';
	const tasks = await Task.find({
		done: isFinished
	});
	return tasks;
}

/* Get a task by Id */
async function GetById(id) {
	await getConnection(connectionString);
	try {
		const task = await Task.findById(id).exec();
		return task
	} catch (err) {
		return null;
	}
}

/* Insert a task and return status 201 (created) on success */
async function Post(task) {
	await getConnection(connectionString);
	let newTask = Task({
		title: task.title,
		description: task.description,
		comments: task.comments,
		priority: task.priority
	});
	return await newTask.save();
}

/*Delete a task by id */
async function Delete(id) {
	await getConnection(connectionString);
	try {
		let task = await Task.findById(id).exec();
		return await task.remove();
	} catch (error) {
		return {
			"code": 404
		};
	}

}

/* Update an existing task */
function Update(id, task, response) {
	"use strict";
	mongoose.connect(connectionString, function (err) {
		if (err) {
			console.log('Connection Failed. Error: ', err);
		} else {
			Task.findByIdAndUpdate(id, task, function (err, updatedTask) {
				if (err) {
					response.status(404).send()
				} else {
					response.status(204).send();
				}
			});
		}
	});
}

/*================WARNING: REMOVE FROM PRODUCTION================*/
/* Delete all tasks */
function DeleteAll(response) {
	"use strict";
	console.log("Deleting all tasks...");
	mongoose.connect(connectionString, function (err) {
		if (err) {
			console.log('Connection Failed. Error: ', err);
		} else {
			Task.remove({}, function (err) {
				if (err) {
					response.status(500).send()
				} else {
					response.status(204).send();
				}
			});
		}
	});
}

/* Private Functions */
function ParseDate(timestamp) {
	"use strict";
	if (timestamp) {
		var date = new Date(timestamp);
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
		var year = date.getFullYear();
		//var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		//var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		//var sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		return month + "/" + day + "/" + year;


	} else {
		return undefined;
	}
}

function handleConnectionError() {
	throw new Error("Connection Problem");
}

async function getConnection(connectionString) {
	try {
		await mongoose.connect(connectionString);
		let connection = mongoose.connection;
		connection.on("error", handleConnectionError);
		return connection;
	} catch (err) {
		handleConnectionError();
	}
}

exports.DeleteAll = DeleteAll;
/*===========================================================*/
exports.GetByFilter = GetByFilter;
exports.GetById = GetById;
exports.Post = Post;
exports.Delete = Delete;
exports.Update = Update;