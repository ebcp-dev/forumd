const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const commentSchema = new Schema({
    shortId: {
        type: String,
        unique: true
    },
    text: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    postLink: {
        type: String,
        required: true
    },
    // References User collection
    _author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    // References Post collection
    _post: {
        type: Schema.ObjectId,
        ref: 'Post',
    },
});

// Show author reference when queried
const populateAuthor = function(next) {
    this.populate({
        path: '_author',
        select: 'username createdAt -_id',
        match: {
            'isDeleted': false
        }
    });
    next();
};
// Show post reference when queried
// CAUSES INFINITE LOOP WHEN Post ALSO POPULATES COMMENTS
// const populatePost = function(next) {
//     this.populate({
//         path: '_post',
//         select: 'title createdAt -_id'
//     });
//     next();
// };
// Execute populate methods before find query
commentSchema.pre('find', populateAuthor);
commentSchema.pre('findOne', populateAuthor);
//commentSchema.pre('find', populatePost);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;