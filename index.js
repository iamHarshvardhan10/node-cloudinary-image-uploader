const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const { dbConnection } = require('./config/database')
const { cloudinaryConnect } = require('./config/cloudinary')
const app = express()
app.use(express.json())
const fileUpload = require('express-fileupload')

// image 
app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
// routes import 
const UploadImage = require('./routes/file.route')

// database 
dbConnection()
cloudinaryConnect()

// routes 

app.use('/api/v1/upload', UploadImage)

app.listen(process.env.PORT, () => {
    console.log(`server is running `)
})