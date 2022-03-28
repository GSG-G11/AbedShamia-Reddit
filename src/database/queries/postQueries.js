const getAllPosts = `SELECT posts.id, posts.title, posts.body, posts.created_at, posts.user_id, users.username, COUNT(CASE WHEN votes.vote = 'up' THEN 1 ELSE NULL END ) AS upvotes FROM posts LEFT JOIN users ON posts.user_id = users.id LEFT JOIN votes ON posts.id = votes.post_id GROUP BY posts.id, users.username ORDER BY upvotes DESC`;
const createPost = 'INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *';
const deletePost = 'DELETE FROM posts WHERE id = $1';
const getPostUsername =
  'SELECT users.username, posts.id FROM users LEFT JOIN posts ON users.id = posts.user_id WHERE posts.id = $1';

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getPostUsername,
};
