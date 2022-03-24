const {getLoginPage, indexPage} = require('./pagesController');
const {registerUser, loginUser, logoutUser} = require('./authController');
const {getAllPosts, createPost, deletePost, getPost} = require('./postsController');

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
};
