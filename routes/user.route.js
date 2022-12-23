
const express = require("express");
const userController = require('../controllers/users.controller');

const router = express.Router();

// router format should be like it
router.route('/signup')
    .post(userController.createUser)

router.route('/login')
    .post(userController.loginUser)


module.exports = router;