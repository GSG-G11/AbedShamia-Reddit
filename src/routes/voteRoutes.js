const router = require('express').Router();
const {upVote, downVote, sumPostVotes, didVote} = require('../controllers');
const {verifyToken, verifyPostId} = require('../middlewares');

router.post('/upvote/:postId', verifyPostId, verifyToken, upVote);
router.post('/downvote/:postId', verifyPostId, verifyToken, downVote);
router.get('/:postId', verifyPostId, sumPostVotes);
router.get('/posts/:postId', verifyPostId, verifyToken, didVote);

module.exports = router;
