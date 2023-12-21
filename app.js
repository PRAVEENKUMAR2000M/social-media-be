
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoute')
const postRouter = require('./routes/postRoutes')

const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)

module.exports = app