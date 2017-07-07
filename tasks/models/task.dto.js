exports.CreateTaskDto = class CreateTaskDto {
    constructor({title, description, comments, priority}) {
        this.title = title;
        this.description = description;
        this.comments = comments;
        this.priority = priority;
    }
}

exports.PutTaskDto = class PutTaskDto {
    constructor({title, description, comments, priority, done}) {
        this.title = title;
        this.description = description;
        this.comments = comments;
        this.priority = priority;
        this.done = done;
    }
}