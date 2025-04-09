const express = require('express');
const { upload } = require('./db/database');
const { uploadFile } = require('../controllers/uploads');
const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
