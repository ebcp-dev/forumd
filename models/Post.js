const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const postSchema = new Schema({
    shortId: {
        type: String,
        unique: 'ShortId not unique.'
    },
    title: {
        type: String,
        required: true,
        maxlength: 25
    },
    link: {
        type: String
    },
    text: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // References User collection
    _author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    // References Comment collection by objectId
    _comments: [
        {
            type: Schema.ObjectId,
            ref: 'Comment'
        }
    ]
});

// Use plugin
postSchema.plugin(beautifyUnique, {
    defaultMessage: 'Must be unique.'
});

// Show author field when queried
const populateAuthor = function(next) {
    this.populate({
        path: '_author',
        select: 'username createdAt -_id'
    });
    next();
};
// Show comments array when queried
const populateComments = function(next) {
    this.populate({
        path: '_comments',
        select: '_author createdAt isDeleted text _post shortId -_id',
        // match: {
        //     'isDeleted': false
        // }
    });
    next();
};
// Execute populate methods before find query
postSchema.pre('find', populateAuthor);
postSchema.pre('findOne', populateAuthor);
postSchema.pre('find', populateComments);
postSchema.pre('findOne', populateComments);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;