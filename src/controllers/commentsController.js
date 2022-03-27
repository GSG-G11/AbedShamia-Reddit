const connection = require('../database/config/connection');
const {createError} = require('../errors/customError');
const getPostComments = async (req, res) => {
  const {postId} = req.params;

  const comments = await connection.query(
    'SELECT comments.body, comments.created_at, users.username FROM comments JOIN users ON users.id = comments.user_id WHERE post_id = $1',
    [postId]
  );

  res.status(200).json(comments.rows);
};

const createComment = async (req, res) => {
  const {body} = req.body;
  const {postId} = req.params;
  const {id} = req.user;

  if (!body) {
    throw createError('No body provided', 400);
  }

  const comment = await connection.query(
    'INSERT INTO comments (body, post_id, user_id) VALUES ($1, $2, $3) RETURNING *',
    [body, postId, id]
  );

  res.status(201).json(comment.rows[0]);
};

const getCommentsNumber = async (req, res) => {
  const {postId} = req.params;

  const commentsNumber = await connection.query(
    'SELECT COUNT(*) FROM comments WHERE post_id = $1',
    [postId]
  );

  res.status(200).json(commentsNumber.rows[0]);
};

module.exports = {
  getPostComments,
  createComment,
  getCommentsNumber,
};
