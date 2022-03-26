const {
  getPostComments,
  createComment,
  getUserInfoThroughComment,
  getCommentsNumber,
} = require('../controllers');
const verifyPostId = require('../middlewares/verifyPostId');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

router.get('/:postId', verifyPostId, getPostComments);
router.post('/:postId', verifyPostId, verifyToken, createComment);
router.get('/users/:postId', verifyPostId, getUserInfoThroughComment);
router.get('/sum/:postId', verifyPostId, getCommentsNumber);

module.exports = router;
