const connection = require('../database/config/connection');
const {createError} = require('../errors/customError');

const verifyPostId = async (req, res, next) => {
  const id = req.params.postId;

  // Check the incoming id is a number
  if (isNaN(id)) {
    throw createError('Invalid ID', 400);
  }

  const posts = await connection.query('SELECT MAX(id) AS max_id FROM posts');

  if (+id > +posts.rows[0].max_id) {
    throw createError('Post not found', 404);
  }

  const post = await connection.query('SELECT id FROM posts WHERE id = $1', [id]);

  if (!post.rowCount) {
    throw createError('Post Does not exist', 404);
  }

  next();
};

module.exports = verifyPostId;
