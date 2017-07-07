exports.CreateTaskDto = class CreateTaskDto {
    constructor({title, description, comments, priority}) {
        this.title = title;
        this.description = description;
        this.comments = comments;
        this.priority = priority;
    }
}