// routes/upload.js
const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudConfig');
const router = express.Router();

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ url: req.file.path }); // Send back the image URL
    } else {
        res.status(400).send('File upload failed');
    }
});

module.exports = router;
