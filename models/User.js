const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: 'Username must be unique.',
        minlength: [5, 'Username must be 5 characters or more.']
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: 'Email must be unique.'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: String
});

// Use plugin
userSchema.plugin(beautifyUnique, {
    defaultMessage: 'Must be unique.'
});

const User = mongoose.model('User', userSchema);

User.createUser = (newUser, callback) => {
    // Hashes password before saving to database.
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

// Compares password in database for validation
User.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports = User;