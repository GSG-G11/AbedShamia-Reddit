const {getPostComments, createComment, getCommentsNumber} = require('../controllers');
const {verifyToken, verifyPostId} = require('../middlewares');
const router = require('express').Router();

router.get('/:postId', verifyPostId, getPostComments);
router.post('/:postId', verifyPostId, verifyToken, createComment);
router.get('/sum/:postId', verifyPostId, getCommentsNumber);

module.exports = router;
