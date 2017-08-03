exports.CreateUserDto = class CreateUserDto {
    constructor({firstName, lastName, username, password}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
}