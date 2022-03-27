const errorHandler = require('./errorHandler');
const loggedIn = require('./loggedIn');
const userOwnPost = require('./userOwnPost');
const verifyPostId = require('./verifyPostId');
const verifyToken = require('./verifyToken');
const verifyUsername = require('./verifyUsername');

module.exports = {
  errorHandler,
  loggedIn,
  userOwnPost,
  verifyPostId,
  verifyToken,
  verifyUsername,
};
