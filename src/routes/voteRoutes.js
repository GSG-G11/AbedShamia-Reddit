const router = require('express').Router();
const {upVote, downVote, sumPostVotes} = require('../controllers');
const verifyToken = require('../middlewares/verifyToken');

router.post('/upvote/:postId', verifyToken, upVote);
router.post('/downvote/:postId', verifyToken, downVote);
router.get('/:postId', sumPostVotes);

module.exports = router;
