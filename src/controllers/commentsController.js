const connection = require('../database/config/connection');
const commentQueries = require('../database/queries');
const {createError} = require('../errors/customError');

// Get all comments for a post
const getPostComments = async (req, res) => {
  const {postId} = req.params;

  const comments = await connection.query(commentQueries.getPostComments, [postId]);

  res.status(200).json(comments.rows);
};

const createComment = async (req, res) => {
  const {body} = req.body;
  const {postId} = req.params;
  const {id} = req.user;

  if (!body) {
    throw createError('No body provided', 400);
  }

  const comment = await connection.query(commentQueries.createComment, [body, postId, id]);

  res.status(201).json(comment.rows[0]);
};

const getCommentsNumber = async (req, res) => {
  const {postId} = req.params;

  const commentsNumber = await connection.query(commentQueries.countComments, [postId]);

  res.status(200).json(commentsNumber.rows[0]);
};

module.exports = {
  getPostComments,
  createComment,
  getCommentsNumber,
};
