const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,

    },
    tags: {
        type: String,
    },
    email: {
        type: String
    }
})

fileSchema.post("save", async function (doc) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        async function Mail(){

            const info = await transporter.sendMail({
                from: `Cloudinary Image Uploader || <${process.env.MAIL_HOST}> `,
                to: doc.email,
                subject: "Image Uploadation on Cloudinary",
                text: `Image Uploaded Successfully on Cloudinary by ${doc.name}`,
                html:`<a href=${doc.imageUrl}>URL IMAGE URL</a>`

            })
            console.log(info)
        }
        Mail().console.log('Mail send Successfully')
    } catch (error) {
        console.log(error)
    }
})

const File = mongoose.model("File", fileSchema)

module.exports = File;