const express  = require('express')
const router = express.Router()

const {imageUpload , videoUpload , imageReducerUpload , localFileUpload} = require('../controllers/fileUpload.controllers')


// api route
// router.post('/image-upload', imageUpload)
// router.post('/video-upload', videoUpload)
// router.post('/image-reducer-upload', imageReducerUpload)
router.post('/localFileUpload', localFileUpload)
router.post('/imageFileUpload' , imageUpload)
router.post('/videoFileUpload' , videoUpload)
router.post('/imageReducerUpload' , imageReducerUpload)


module.exports = router;
