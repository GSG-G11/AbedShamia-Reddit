const connection = require('../database/config/connection');
const postQueries = require('../database/queries');
const {createError} = require('../errors/customError');
const Joi = require('joi');
const getAllPosts = async (req, res) => {
  // get all posts and order them by votes DESC
  const posts = await connection.query(postQueries.getAllPosts);

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
    const {error} = await schema.validateAsync({title, body});
  } catch (error) {
    throw createError('Invalid title or body', 400);
  }

  const post = await connection.query(postQueries.createPost, [title, body, user_id]);

  res.status(201).json({
    status: 'success',
    post: post.rows[0],
  });
};

const deletePost = async (req, res) => {
  const id = req.params.postId;
  console.log(id);
  await connection.query(postQueries.deletePost, [id]);
  res.sendStatus(204);
};

// Get Post owner info
const getPost = async (req, res) => {
  const id = req.params.postId;
  const post = await connection.query(postQueries.getPostUsername, [id]);
  res.status(200).json({
    status: 'success',
    post: post.rows[0],
  });
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getPost,
};
