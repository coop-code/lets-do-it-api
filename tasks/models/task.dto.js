exports.CreateTaskDto = class CreateTaskDto {
    constructor({title, description, comments, priority}) {
        this.title = title;
        this.description = description;
        this.comments = comments;
        this.priority = priority;
    }
}

exports.PatchTaskDto = class PatchTaskDto {
    constructor({title, description, comments, priority, done}) {
        this.title = title;
        this.description = description;
        this.comments = comments;
        this.priority = priority;
        this.done = done;
    }
}