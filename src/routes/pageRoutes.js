const router = require('express').Router();
const {getLoginPage, indexPage, userPage} = require('../controllers');
const {loggedIn, verifyUsername} = require('../middlewares');
router.get('/', indexPage);
router.get('/users/:username', verifyUsername, userPage);
router.get('/login', loggedIn, getLoginPage);

module.exports = router;
