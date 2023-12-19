const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoute')

const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/user', userRouter)

module.exports = app