const connection = require('../database/config/connection');
const {createError} = require('../errors/customError');

const userOwnPost = async (req, res, next) => {
  const userId = +req.user.id;
  const postId = await connection.query('SELECT user_id FROM posts WHERE id = $1', [
    req.params.postId,
  ]);

  if (userId !== +postId.rows[0].user_id) {
    throw createError('You dont have the permission to do this', 401);
  }

  next();
};

module.exports = userOwnPost;
