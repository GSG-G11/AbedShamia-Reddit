const getPostComments =
  'SELECT comments.body, comments.created_at, users.username FROM comments JOIN users ON users.id = comments.user_id WHERE post_id = $1';
const createComment =
  'INSERT INTO comments (body, post_id, user_id) VALUES ($1, $2, $3) RETURNING *';
const countComments = 'SELECT COUNT(*) FROM comments WHERE post_id = $1';

module.exports = {
  getPostComments,
  createComment,
  countComments,
};
