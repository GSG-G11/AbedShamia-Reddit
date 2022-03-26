const connection = require('../database/config/connection');
const {createError} = require('../errors/customError');
const getPostComments = async (req, res) => {
  const {postId} = req.params;

  const comments = await connection.query('SELECT * FROM comments WHERE post_id = $1', [
    postId,
  ]);

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

const getUserInfoThroughComment = async (req, res) => {
  const {postId} = req.params;

  const user = await connection.query(
    'SELECT username, comments.created_at FROM comments JOIN users ON users.id = comments.user_id WHERE post_id = $1',
    [postId]
  );

  res.status(200).json(user.rows);
};

module.exports = {
  getPostComments,
  createComment,
  getUserInfoThroughComment,
};
