const connection = require('../database/config/connection');
const postQueries = require('../database/queries');
const {createError} = require('../errors/customError');
const Joi = require('joi');
const multer = require('multer');
const fs = require('fs');

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
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync('./protected/images/posts')) {
        fs.mkdirSync('./protected/images/posts');
      }
      cb(null, './protected/images/posts');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const upload = multer({storage}).single('image');

  upload(req, res, async err => {
    if (err) {
      throw createError(err, 400);
    }

    const {title, body} = req.body;

    const {id} = req.user;
    const path = req.file ? req.file.path : null;
    const post = await connection.query(postQueries.createPost, [title, body, id, path]);

    res.status(201).json({
      status: 'success',
      post: post.rows[0],
    });
    console.log(post.rows[0]);
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
