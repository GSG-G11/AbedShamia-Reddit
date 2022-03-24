const connection = require('../database/config/connection');
const {createError} = require('../errors/customError');

const verifyPostId = async (req, res, next) => {
  const id = req.params.id;

  // Check the incoming id is a number
  if (isNaN(id)) {
    throw createError('Invalid ID', 400);
  }

  const posts = await connection.query('SELECT COUNT(*) FROM posts');

  if (+id > +posts.rows[0].count) {
    throw createError('Post not found', 404);
  }

  const post = await connection.query('SELECT id FROM posts WHERE id = $1', [id]);

  if (!post.rowCount) {
    throw createError('Post not found', 404);
  }

  next();
};

module.exports = verifyPostId;
