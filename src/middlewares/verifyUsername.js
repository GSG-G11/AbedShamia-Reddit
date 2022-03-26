const connection = require('../database/config/connection');
const {createError} = require('../errors/customError');
const verifyUsername = async (req, res, next) => {
  const {username} = req.params;

  if (!username) {
    throw createError('No username provided', 400);
  }

  const user = await connection.query('SELECT * FROM users WHERE username = $1', [username]);

  if (!user.rows[0]) {
    throw createError('Username not found', 404);
  }

  next();
};

module.exports = verifyUsername;
