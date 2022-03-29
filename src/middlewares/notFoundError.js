const path = require('path');
const notFoundError = (err, req, res, next) => {
  if (err.code === 404 || err.code == 'ENOENT' || err.message == 'Username not found') {
    console.log(err.message);
    return res.sendFile(path.join(__dirname, '..', '..', 'public', '404.html'));
  } else {
    next(err);
  }
};

module.exports = notFoundError;
