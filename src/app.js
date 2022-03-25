require('express-async-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const pageRouter = require('./routes/pageRoutes');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const voteRouter = require('./routes/voteRoutes');
const commentRoutes = require('./routes/commentRoutes');
app.use(cookieParser());
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('protected'));

app.use('/', pageRouter);
app.use('/api/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/votes', voteRouter);
app.use('/api/v1/comments/posts', commentRoutes);
app.use(errorHandler);

module.exports = app;
