const connection = require('../database/config/connection');
const {createError} = require('../errors/customError');
const Joi = require('joi');
const getAllPosts = async (req, res) => {
  const posts = await connection.query('SELECT * FROM posts');

  if (!posts.rowCount) {
    throw createError('No posts found', 404);
  }

  res.status(200).json({
    status: 'success',
    posts: posts.rows,
  });
};

const createPost = async (req, res) => {
  const {title, body} = req.body;
  const user_id = req.user.id;

  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
  });

  try {
    const {error} = await schema.validate({title, body});
  } catch (error) {
    throw createError('Invalid title or body', 400);
  }

  const post = await connection.query(
    'INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, body, user_id]
  );

  res.status(201).json({
    status: 'success',
    post: post.rows[0],
  });
};

const deletePost = async (req, res) => {
  const id = req.params.id;

  // Check the incoming id is a number
  if (isNaN(id)) {
    throw createError('Invalid ID', 400);
  }

  const isExist = await connection.query('SELECT * FROM posts WHERE id = $1', [id]);

  if (!isExist.rowCount) {
    throw createError('Post not found', 404);
  }

  await connection.query('DELETE FROM posts WHERE id = $1', [id]);

  res.send(204);
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
};
