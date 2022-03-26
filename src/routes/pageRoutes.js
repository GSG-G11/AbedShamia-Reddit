const router = require('express').Router();
const {getLoginPage, indexPage, userPage} = require('../controllers');
const isUserLoggedIn = require('../middlewares/loggedIn');
router.get('/', indexPage);
router.get('/users/:username', userPage);
router.get('/reddit/login', isUserLoggedIn, getLoginPage);

module.exports = router;
