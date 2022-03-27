const router = require('express').Router();
const {verifyUsername} = require('../middlewares');
const {userInfo} = require('../controllers');

router.get('/:username', verifyUsername, userInfo);

module.exports = router;
