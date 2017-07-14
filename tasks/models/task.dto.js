exports.CreateTaskDto = class CreateTaskDto {
    constructor({title, description, comments, priority, deadlineDate}) {
        this.title = title;
        this.description = description;
        this.comments = comments;
        this.priority = priority;
        this.deadlineDate = deadlineDate
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