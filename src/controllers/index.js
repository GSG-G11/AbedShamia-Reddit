const {getLoginPage, indexPage} = require('./pagesController');
const {registerUser, loginUser, logoutUser} = require('./authController');
const {getAllPosts, createPost, deletePost, getPost} = require('./postsController');
const {upVote, downVote, sumPostVotes, didVote} = require('./votesController');
const {
  getPostComments,
  createComment,
  getUserInfoThroughComment,
} = require('./commentsController');
const {getUserId} = require('./userController');

module.exports = {
  getLoginPage,
  registerUser,
  loginUser,
  logoutUser,
  indexPage,
  getAllPosts,
  createPost,
  deletePost,
  getPost,
  getUserId,
  upVote,
  downVote,
  sumPostVotes,
  didVote,
  getPostComments,
  createComment,
  getUserInfoThroughComment,
};
