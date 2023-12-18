const mongoose = require('mongoose');
const config = require('./utils/config')
console.log('conneting to mongodb')
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch((error) => {
        console.log('error connection to mongodb', error.message)
    })