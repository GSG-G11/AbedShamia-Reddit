const {getAllPosts, createPost, deletePost} = require('../controllers');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

router.route('/').get(getAllPosts).post(verifyToken, createPost);

router.route('/:id').delete(deletePost);

module.exports = router;
