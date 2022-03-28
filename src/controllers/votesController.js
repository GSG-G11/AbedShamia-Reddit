const connection = require('../database/config/connection');
const voteQueries = require('../database/queries');

// Upvote a post
const upVote = async (req, res) => {
  const {postId} = req.params;
  const {id} = req.user;

  //Check if user has already voted
  const checkVote = await connection.query(voteQueries.checkVote, [id, postId]);

  if (checkVote.rowCount) {
    //If user has already voted, update vote
    let vote;
    checkVote.rows[0].vote === 'up' ? (vote = 'none') : (vote = 'up');
    await connection.query(voteQueries.updateVote, [vote, id, postId]);

    res.status(201).json({
      status: 'Successfully Updated',
    });
  } else {
    //If user has not voted, insert vote
    const voteQuery = await connection.query(voteQueries.insertVote, [id, postId, 'up']);
    res.status(201).json({
      status: 'success',
      vote: voteQuery.rows[0],
    });
  }
};

// Downvote a post
const downVote = async (req, res) => {
  const {postId} = req.params;
  const {id} = req.user;

  //Check if user has already voted
  const checkVote = await connection.query(voteQueries.checkVote, [id, postId]);

  if (checkVote.rowCount) {
    //If user has already voted, update vote
    let vote;
    checkVote.rows[0].vote === 'down' ? (vote = 'none') : (vote = 'down');
    await connection.query(voteQueries.updateVote, [vote, id, postId]);

    res.status(201).json({
      status: 'Successfully Updated',
    });
  } else {
    //If user has not voted, insert vote
    const voteQuery = await connection.query(voteQueries.insertVote, [id, postId, 'down']);
    res.status(201).json({
      status: 'success',
      vote: voteQuery.rows[0],
    });
  }
};

// Get total number of votes for a post
const sumPostVotes = async (req, res) => {
  const {postId} = req.params;
  const sumVotes = await connection.query(voteQueries.sumVotes, [postId]);

  res.status(200).json({
    status: 'success',
    total_votes: +sumVotes.rows[0].total_votes,
  });
};

// Check if user has already voted
const didVote = async (req, res) => {
  const {postId} = req.params;
  const {id} = req.user;

  const checkVote = await connection.query(voteQueries.checkVote, [id, postId]);

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
