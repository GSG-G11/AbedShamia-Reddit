const {getPostComments, createComment} = require('../controllers');
const verifyPostId = require('../middlewares/verifyPostId');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

router.get('/:postId', verifyPostId, getPostComments);
router.post('/:postId', verifyPostId, verifyToken, createComment);
module.exports = router;
