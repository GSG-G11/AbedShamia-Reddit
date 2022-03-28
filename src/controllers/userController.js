const connection = require('../database/config/connection');
const userQueries = require('../database/queries');

// Get Logged in User Id
const getUserId = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
};

// Get User Info
const userInfo = async (req, res, next) => {
  const {username} = req.params;

  const userInfo = await connection.query(userQueries.getUserInfo, [username]);

  const userPosts = await connection.query(userQueries.getUserPosts, [userInfo.rows[0].id]);

  res.status(200).json({
    status: 'success',
    user: userInfo.rows[0],
    posts: userPosts.rows,
  });
};

module.exports = {getUserId, userInfo};
