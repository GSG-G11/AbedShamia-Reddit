const {getLoginPage, indexPage, userPage} = require('./pagesController');
const {registerUser, loginUser, logoutUser} = require('./authController');
const {getAllPosts, createPost, deletePost, getPost} = require('./postsController');
const {upVote, downVote, sumPostVotes, didVote} = require('./votesController');
const {getPostComments, createComment, getCommentsNumber} = require('./commentsController');
const {getUserId, userInfo} = require('./userController');

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
  userPage,
  getCommentsNumber,
  userInfo,
};
