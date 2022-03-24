const getUserId = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
};

module.exports = {getUserId};
