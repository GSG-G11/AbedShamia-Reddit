require('express-async-errors');
const router = require('express').Router();
const {registerUser, loginUser, logoutUser} = require('../controllers');
const {getUserId} = require('../controllers');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/login/user', verifyToken, getUserId);
router.post('/logout', logoutUser);

module.exports = router;
