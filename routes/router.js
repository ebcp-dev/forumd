const express = require('express');
const router = express();

// Import controllers
const userController = require('./../controllers/userController');
const postController = require('./../controllers/postController');
const commentController = require('./../controllers/commentController');

// Checks if user is authenticated
ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        //console.log(req.user);
        //res.json(req.user);
        return next();
    } else {
        //console.log('Not authenticated.')
        res.json({
            authenticated: false
        });
    }
};

// User routes
router.get('/user', ensureAuthenticated, userController.get);
router.get('/allUsers', userController.getAll);
router.get('/logout', userController.logout);
router.post('/register', userController.createNewUser);
router.post('/updateUser', ensureAuthenticated, userController.updateUser);
router.post('/addBookmark', ensureAuthenticated, userController.addBookmark);
router.post('/removeBookmark', ensureAuthenticated, userController.removeBookmark);
router.post('/login', userController.loginAuthentication);

// Post routes
router.get('/post', postController.get);
router.get('/post/:postTitle/:shortId', postController.getPost);
router.get('/allPosts', postController.getAll);
router.get('/allUserPosts', ensureAuthenticated, postController.getAllUserPosts);
router.post('/submitPost', ensureAuthenticated, postController.submitNewPost);
router.post('/editPost', ensureAuthenticated, postController.editPost);
router.post('/deletePost', ensureAuthenticated, postController.deletePost);

// Comments routes
router.get('/comment', commentController.get);
router.get('/comment/:shortId', commentController.getComment);
router.get('/allComments', commentController.getAll);
router.get('/allUserComments', ensureAuthenticated, commentController.getAllUserComments);
router.post('/post/:postTitle/:postId/submitComment', ensureAuthenticated, commentController.submitNewComment);
router.post('/deleteComment', ensureAuthenticated, commentController.deleteComment);

module.exports = router;