const getUserInfo = 'SELECT id, username FROM users WHERE username = $1';
const getUserPosts = 'SELECT * FROM posts WHERE user_id = $1';
const userExist = 'SELECT username, email FROM users WHERE username = $1 OR email = $2';
const createUser =
  'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *';
const userExistLogIn = 'SELECT * FROM users WHERE username = $1';
module.exports = {
  getUserInfo,
  getUserPosts,
  userExist,
  createUser,
  userExistLogIn,
};
