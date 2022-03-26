const {join} = require('path');
const getLoginPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'signup-in.html'));
};

const indexPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'protected', 'homepage.html'));
};

const userPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'user.html'));
};
module.exports = {getLoginPage, indexPage, userPage};
