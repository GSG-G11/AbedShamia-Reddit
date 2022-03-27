const router = require('express').Router();
const pageRouter = require('./pageRoutes');
const authRouter = require('./authRoutes');
const postRouter = require('./postRoutes');
const voteRouter = require('./voteRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

router.use('/', pageRouter);
router.use('/api/auth', authRouter);
router.use('/api/v1/posts', postRouter);
router.use('/api/v1/votes', voteRouter);
router.use('/api/v1/comments/posts', commentRoutes);
router.use('/api/v1/users', userRoutes);

module.exports = router;
