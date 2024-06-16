const fs = require('fs');
const path = require('path');
const File = require('../models/File');
const cloudinary = require('cloudinary').v2

exports.localFileUpload = async (req, res) => {
    try {
        // Check if files were uploaded
        if (!req.files || !req.files.files) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Fetch file
        const file = req.files.files;
        console.log('File Uploaded:', file);

        // Ensure the directory exists
        const uploadDir = path.join(__dirname, '..', 'files');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // Path
        const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
        console.log('Path:', filePath);

        // Move file
        file.mv(filePath, (err) => {
            if (err) {
                console.error('File move error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Internal file error'
                });
            }

            res.json({
                success: true,
                message: 'Local File Upload Successfully'
            });
        });
    } catch (error) {
        console.error('Internal error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// cloudinary image upload

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileTOCloudinary(file, folder , quality) {
    const options = { folder }
    options.resource_type = "auto"
    if(quality){
        options.quality = quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)

}

exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        console.log(name, tags, email)

        const file = req.files.imageFile;
        console.log(file)

        // validation 
        const supportedTypes = ['jpg', 'jpeg', 'png']
        const fileType = file.name.split('.')[1].toLowerCase()

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File type not supported'
            })
        }

        // file format supported 
        const result = await uploadFileTOCloudinary(file, 'harsh')
        console.log(result)
        // db 
        console.log(result)
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: result.secure_url
        })

        res.json({
            success: true,
            message: 'Image successfully',
            fileData
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// video file upload

exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        console.log(name, tags, email)

        const file = req.files.videoFile;
        console.log(file)

        // validation 
        const supportedTypes = ['mp4', 'mov']
        const fileType = file.name.split('.')[1].toLowerCase()

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File type not supported'
            })
        }

        // file format supported 
        const result = await uploadFileTOCloudinary(file, 'harsh')
        console.log(result)
        // db 
        console.log(result)
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: result.secure_url
        })

        res.json({
            success: true,
            message: 'Video successfully',
            fileData
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.imageReducerUpload = async (req, res) => {

    try {
        const { name, tags, email } = req.body;

        console.log(name, tags, email)

        const file = req.files.imageFile;
        console.log(file)

        // validation 
        const supportedTypes = ['jpg', 'jpeg', 'png']
        const fileType = file.name.split('.')[1].toLowerCase()

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File type not supported'
            })
        }

        // file format supported 
        const result = await uploadFileTOCloudinary(file, 'harsh',50)
        console.log(result)
        // db 
        console.log(result)
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: result.secure_url
        })

        res.json({
            success: true,
            message: 'Image successfully',
            fileData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}