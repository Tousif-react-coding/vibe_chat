// config/cloudinary.js
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'chatapp_DEV', 
        allowedFormats: ['png', 'jpg', 'jpeg'], // supports promises as well
    },
});

module.exports = { cloudinary, storage };
