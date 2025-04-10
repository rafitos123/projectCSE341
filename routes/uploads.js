const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const uploadController = require('../controllers/uploads');

// #swagger.tags = ['Uploads']
router.post('/',
  upload.single('file'),
  /**
   #swagger.consumes = ['multipart/form-data']
   #swagger.parameters['file'] = {
     in: 'formData',
     type: 'file',
     required: true,
     description: 'Arquivo a ser enviado'
   }
   #swagger.parameters['userId'] = {
     in: 'formData',
     type: 'string',
     required: true,
     description: 'ID do usuário'
   }
   #swagger.parameters['reviewId'] = {
     in: 'formData',
     type: 'string',
     required: true,
     description: 'ID da review'
   }
   */
  uploadController.postUpload
);

module.exports = router;
