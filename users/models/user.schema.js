const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName:  {type: String, required: true },
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true, minlength: 8},
  password: {type: String, required: true},
}, {collection: 'users'});

userSchema.set('toObject', { getters: true });
userSchema.set('toJSON', { getters: true });

userSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
