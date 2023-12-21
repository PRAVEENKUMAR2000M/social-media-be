const express = require('express');

const postController = require('../controllers/post');
const authMiddleware = require('../middleware/authmiddleware')

const postRouter = express.Router()

postRouter.post('/', authMiddleware.verifyToken, postController.createPost)

module.exports = postRouter;