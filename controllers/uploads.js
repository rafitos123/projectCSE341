// controllers/uploads.js
const { getDatabase } = require('../db/database');

const { ObjectId } = require('mongodb');

const postUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const db = getDatabase();

    const metadata = {
      userId: req.body.userId,
      reviewId: req.body.reviewId,
      fileType: req.file.mimetype,
      uploadDate: new Date(),
      originalName: req.file.originalname,
      size: req.file.size,
      fileBuffer: req.file.buffer.toString('base64') // exemplo: você pode salvar como base64
    };

    const result = await db.collection('uploads').insertOne(metadata);

    res.status(201).json({
      message: 'File sent and saved successfully!',
      fileId: result.insertedId,
      fileMetadata: metadata
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal error during upload.' });
  }
};

module.exports = {
  postUpload,
};
