var taskConnection = require("./tasks.repository.js");

async function GetByFilter(finished) {
	return await taskConnection.GetByFilter(finished);
}

async function GetById(id) {
	return await taskConnection.GetById(id);
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
exports.DeleteAll = DeleteAll;
/*===========================================================*/

exports.GetByFilter = GetByFilter;
exports.GetById = GetById;
exports.Post = Post;
exports.Update = Update;
exports.Delete = Delete;