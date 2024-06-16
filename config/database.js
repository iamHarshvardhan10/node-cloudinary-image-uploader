const mongoose = require('mongoose')
require('dotenv').config()


exports.dbConnection =  () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('mongo Db Connected')
        })
        .catch((error) => {
            console.log(error)
            process.exit(1)
        })
}