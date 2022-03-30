const getAllPosts = `SELECT posts.id, posts.title, posts.body, posts.image_url, posts.created_at, posts.user_id, users.username, SUM(CASE WHEN votes.vote = 'up' THEN 1 WHEN votes.vote = 'down' THEN -1 WHEN votes.vote = 'none' THEN 0 ELSE 0 END) AS upvotes FROM posts LEFT JOIN users ON posts.user_id = users.id LEFT JOIN votes ON posts.id = votes.post_id GROUP BY posts.id, users.username ORDER BY upvotes DESC`;
const createPost =
  'INSERT INTO posts (title, body, user_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *';
const deletePost = 'DELETE FROM posts WHERE id = $1';
const getPostUsername =
  'SELECT users.username, posts.id FROM users LEFT JOIN posts ON users.id = posts.user_id WHERE posts.id = $1';

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getPostUsername,
};
