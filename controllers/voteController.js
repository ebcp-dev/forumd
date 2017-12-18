const models = require('../models/models');

const voteController = {};

/* GET methods */

// Test API access
voteController.get = (req, res) => {
    res.json({
        message: 'From vote controller.'
    });
};
// Retrieve all users from database
voteController.getAll = (req, res) => {
    models.User.find({}).then((result) => {
        //console.log(result);
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

/* GET methods */

/* POST methods */

// Registers new user
voteController.postVote = (req, res) => {
    const { username, password, email, name } = req.body;

    const newUser = new models.Vote({
        userIds,
        password,
        email,
        name
    });

    models.User.createUser(newUser, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: error
            });
        } else {
            return res.status(200).json({
                success: true,
                data: result
            });
        }
    });
};

/* POST methods */

module.exports = voteController;