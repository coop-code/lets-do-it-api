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
		priority: task.priority,
		deadlineDate: task.deadlineDate
	});
	return await newTask.save();
}

async function Update(id, task) {
	await getConnection(connectionString);
	return await Task.findByIdAndUpdate(id, {
		$set: {
			title: task.title,
			description: task.description,
			comments: task.comments,
			priority: task.priority,
			done: task.done
		}
	}).exec();
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

/*================WARNING: REMOVE FROM PRODUCTION================*/
/* Delete all tasks */
async function DeleteAll(response) {
	await getConnection(connectionString);
	return await Task.remove({}).exec();
}

/* Private Functions */

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
exports.Update = Update;
exports.Delete = Delete;