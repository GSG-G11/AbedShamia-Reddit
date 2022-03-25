const connection = require('../database/config/connection');
const {createError} = require('../errors/customError');
const upVote = async (req, res) => {
  const {postId} = req.params;
  const {id} = req.user;

  //Check if user has already voted
  const checkVote = await connection.query(
    'SELECT * FROM votes WHERE user_id = $1 AND post_id = $2',
    [id, postId]
  );

  if (checkVote.rowCount) {
    //If user has already voted, update vote
    let vote;
    checkVote.rows[0].vote === 'up' ? (vote = 'none') : (vote = 'up');
    await connection.query('UPDATE votes SET vote = $1 WHERE user_id = $2 AND post_id = $3', [
      vote,
      id,
      postId,
    ]);

    res.status(201).json({
      status: 'Successfully Updated',
    });
  } else {
    //If user has not voted, insert vote
    const voteQuery = await connection.query(
      'INSERT INTO votes (user_id, post_id, vote) VALUES ($1, $2, $3) RETURNING *',
      [id, postId, 'up']
    );
    res.status(201).json({
      status: 'success',
      vote: voteQuery.rows[0],
    });
  }
};

const downVote = async (req, res) => {
  const {postId} = req.params;
  const {id} = req.user;

  //Check if user has already voted
  const checkVote = await connection.query(
    'SELECT * FROM votes WHERE user_id = $1 AND post_id = $2',
    [id, postId]
  );

  if (checkVote.rowCount) {
    //If user has already voted, update vote
    let vote;
    checkVote.rows[0].vote === 'down' ? (vote = 'none') : (vote = 'down');
    await connection.query('UPDATE votes SET vote = $1 WHERE user_id = $2 AND post_id = $3', [
      vote,
      id,
      postId,
    ]);

    res.status(201).json({
      status: 'Successfully Updated',
    });
  } else {
    //If user has not voted, insert vote
    const voteQuery = await connection.query(
      'INSERT INTO votes (user_id, post_id, vote) VALUES ($1, $2, $3) RETURNING *',
      [id, postId, 'down']
    );
    res.status(201).json({
      status: 'success',
      vote: voteQuery.rows[0],
    });
  }
};

const sumPostVotes = async (req, res) => {
  const {postId} = req.params;
  const sumVotes = await connection.query(
    `SELECT SUM(CASE WHEN vote = 'up' THEN 1 WHEN vote = 'down' THEN -1 WHEN vote = 'none' THEN 0 END) AS total_votes FROM votes WHERE post_id = $1`,
    [postId]
  );

  res.status(200).json({
    status: 'success',
    total_votes: +sumVotes.rows[0].total_votes,
  });
};

const didVote = async (req, res) => {
  const {postId} = req.params;
  const {id} = req.user;

  const checkVote = await connection.query(
    'SELECT * FROM votes WHERE user_id = $1 AND post_id = $2',
    [id, postId]
  );

  res.status(200).json({
    status: 'success',
    vote: checkVote.rows[0].vote,
  });
};

module.exports = {
  upVote,
  downVote,
  sumPostVotes,
  didVote,
};
