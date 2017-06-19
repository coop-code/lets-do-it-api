const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title:  {type: String, required: true},
  description: String,
  comments: String,
  done: {type: Boolean, required: true, default: false},
  priority: {type: Boolean, required: true, default: false},
  registrationDate: { type: Date, required:true, default: Date.now },
  deadlineDate: Date
}, {collection: 'tasks-test'});

let Task = mongoose.model('Task', taskSchema);
module.exports = Task;
