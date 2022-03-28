const checkVote = 'SELECT * FROM votes WHERE user_id = $1 AND post_id = $2';
const updateVote =
  'UPDATE votes SET vote = $1 WHERE user_id = $2 AND post_id = $3 RETURNING *';
const insertVote =
  'INSERT INTO votes (user_id, post_id, vote) VALUES ($1, $2, $3) RETURNING *';
const sumVotes = `SELECT SUM(CASE WHEN vote = 'up' THEN 1 WHEN vote = 'down' THEN -1 WHEN vote = 'none' THEN 0 END) AS total_votes FROM votes WHERE post_id = $1`;

module.exports = {
  checkVote,
  updateVote,
  insertVote,
  sumVotes,
};
