const router = require('express').Router();
const verifyUsername = require('../middlewares/verifyUsername');
const {userInfo} = require('../controllers');

router.get('/:username', verifyUsername, userInfo);

module.exports = router;
