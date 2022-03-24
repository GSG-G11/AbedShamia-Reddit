const {join} = require('path');
const getLoginPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'signup-in.html'));
};

const indexPage = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'protected', 'homepage.html'));
};

module.exports = {getLoginPage, indexPage};
