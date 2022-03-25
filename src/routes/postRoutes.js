const router = require('express').Router();
const {getAllPosts, createPost, deletePost, getPost} = require('../controllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyPostId = require('../middlewares/verifyPostId');
const userOwnPost = require('../middlewares/userOwnPost');

router.route('/').get(getAllPosts).post(verifyToken, createPost);

router
  .route('/:postId')
  .delete(verifyPostId, verifyToken, userOwnPost, deletePost)
  .get(verifyPostId, getPost);

module.exports = router;
