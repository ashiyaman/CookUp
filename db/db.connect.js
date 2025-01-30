const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODB

const initialDatabase = async() => {
    await mongoose
        .connect(mongoURI)
        .then(() => console.log('Connected to Database'))
        .catch((error) => tconsole.log('Error Connecting to Database', error))
}

module.exports = {initialDatabase}