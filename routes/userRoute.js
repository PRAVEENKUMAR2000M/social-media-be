const express = require('express');
const userController = require('../controllers/user')
const userRouter = express.Router()

userRouter.post('/signup', userController.signup)
userRouter.post('/signin', userController.signup);

module.exports = userRouter