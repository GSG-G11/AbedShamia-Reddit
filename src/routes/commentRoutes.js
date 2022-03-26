const {getPostComments, createComment, getUserInfoThroughComment} = require('../controllers');
const verifyPostId = require('../middlewares/verifyPostId');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

router.get('/:postId', verifyPostId, getPostComments);
router.post('/:postId', verifyPostId, verifyToken, createComment);
router.get('/users/:postId', verifyPostId, getUserInfoThroughComment);
module.exports = router;
