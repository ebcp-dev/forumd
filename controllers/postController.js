const models = require('../models/models');
const ids = require('short-id');

const postController = {};

/* GET methods */

// Test api access
postController.get = (req, res) => {
    let shortId = ids.generate();
    console.log(`shortIdExists: ${shortIdExists('b6c6cb')}`);
    while (shortIdExists(shortId)) {
        shortId = ids.generate();
    }
    res.json({
        message: 'From post controller.'
    });
};

// Retrieve specific post by title
postController.getPost = (req, res) => {
    // Parse url paramater
    let postShortId  = req.params.shortId;
    models.Post.findOne({ shortId: postShortId }).then((result) => {
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    });
};

// Retrieve all posts
postController.getAll = (req, res) => {
    models.Post.find({}).then((result) => {
        //console.log(result);
        return res.json(result);
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    });
};

/* GET methods */

/* POST methods */

// Submit new post
postController.submitNewPost = (req, res) => {
    const { title, link, text } = req.body;
    const userId = req.user._id;
    let shortId = ids.generate();

    // Check if shortId is unique
    while (shortIdExists(shortId)) {
        console.log(shortId)
        console.log(shortIdExists(shortId));
        shortId = ids.generate();
    }

    // Validate between link and text
    // Can't be both

    const newPost = new models.Post({
        shortId,
        title,
        link,
        text,
        _author: userId
    });

    newPost.save().then((result) => {
        console.log(result);
        return res.status(200).json({
            success: true,
            data: result
        });
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({
            message: error
        });
    });
};

// Vote on a post
postController.postVote = (req, res) => {
    const shortId = req.params.shortId;
    const userId = req.user._id;
    const voteValue = req.body.vote > 0 ? 1 : -1;
    
};

// Sets posts to isDeleted: true only if
// user.id matches that of post's _author field
postController.deletePost = (req, res) => {
    let shortId = req.body.shortId;
    let userId = req.user._id;

    models.Post.findOneAndUpdate(
        { 
            shortId,
            _author: userId 
        },
        {
            $set: {
                isDeleted: true
            }
        },
        {
            new: true
        }
    ).then((deleted) => {
        console.log(deleted);
        return res.status(200).json({
            success: true,
            data: deleted,
            message: 'Post deleted.'
        });
    }).catch((error) => {
        return res.status(200).json({
            success: true,
            data: error
        });
    });
};

/* POST methods */

/* Helper functions */

// Check if shortId is unique
const shortIdExists = (shortId) => {
    let result = false;
    models.Post.findOne({ shortId }).then((post) => {
        if (post) result = true;
        console.log('ShortId not unique.');
        return result = true;
    }).catch((error) => {
        console.log(error.errors);
    });
    return result ;
};

/* Helper functions */

module.exports = postController;