const {getLoginPage, indexPage} = require('./pagesController');
const {registerUser, loginUser, logoutUser} = require('./authController');
const {getAllPosts, createPost, deletePost, getPost} = require('./postsController');
const {upVote, downVote, sumPostVotes} = require('./votesController');
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
};
