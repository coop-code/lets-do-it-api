const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  title:  {type: String, required: true},
  description: {type: String, default : ""},
  comments: {type: String, default : ""},
  done: {type: Boolean, required: true, default: false},
  priority: {type: Boolean, required: true, default: false},
  registrationDate: { type: Date, required:true, default: Date.now },
  deadlineDate: {type: Date, get: returnEmptyStringWhenNull, default: ""}
}, {collection: 'tasks-test'});

taskSchema.set('toObject', { getters: true });
taskSchema.set('toJSON', { getters: true });

function returnEmptyStringWhenNull(field) {
  if (field == null) {
    return ""
  } else {
    return field;
  }
}

let Task = mongoose.model('Task', taskSchema);
module.exports = Task;
