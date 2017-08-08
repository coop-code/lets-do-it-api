exports.CreateUserDto = class CreateUserDto {
    constructor({firstName, lastName, email, username, password}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

exports.GetUserDto = class GetUserDto {
    constructor({_id, firstName, lastName, email}) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.token = "";
    }
}

exports.LoginUserDto = class GetUserDto {
    constructor({email, password}) {
        this.email = email;
        this.password = password;
    }
}