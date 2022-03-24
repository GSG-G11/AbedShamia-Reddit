const {getAllPosts, createPost, deletePost, getPost} = require('../controllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyPostId = require('../middlewares/verifyPostId');
const router = require('express').Router();

router.route('/').get(getAllPosts).post(verifyToken, createPost);

router.route('/:id').delete(verifyPostId, deletePost).get(verifyPostId, getPost);

module.exports = router;
