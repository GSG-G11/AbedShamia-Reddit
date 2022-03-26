const connection = require('../database/config/connection');

const getUserId = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
};

const userInfo = async (req, res, next) => {
  const {username} = req.params;

  const userInfo = await connection.query(
    'SELECT id, username FROM users WHERE username = $1',
    [username]
  );

  const userPosts = await connection.query('SELECT * FROM posts WHERE user_id = $1', [
    userInfo.rows[0].id,
  ]);

  res.status(200).json({
    status: 'success',
    user: userInfo.rows[0],
    posts: userPosts.rows,
  });
};

module.exports = {getUserId, userInfo};
