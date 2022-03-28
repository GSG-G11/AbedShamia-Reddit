const {checkVote, sumVotes, insertVote, updateVote} = require('./voteQueries');
const {
  getUserInfo,
  getUserPosts,
  userExist,
  userExistLogIn,
  createUser,
} = require('./userQueries');
const {getAllPosts, getPostUsername, createPost, deletePost} = require('./postQueries');
const {createComment, countComments, getPostComments} = require('./commentQueries');
module.exports = {
  checkVote,
  sumVotes,
  insertVote,
  updateVote,
  getUserInfo,
  getUserPosts,
  getAllPosts,
  getPostUsername,
  createPost,
  deletePost,
  createComment,
  countComments,
  getPostComments,
  userExist,
  userExistLogIn,
  createUser,
};
