const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    

    // Pegando dados do body (ou de req.user se estiver logado com passport)
    const { reviewId, userId } = req.body;

    const metadata = {
      reviewId: new ObjectId(reviewId),
      userId: new ObjectId(userId),
      fileType: req.file.mimetype,
      gridFsFileId: req.file.id,
      uploadDate: new Date()
    };

     const response = await mongodb.getDatabase().collection('uploads').insertOne(metadata);
    if (!response.acknowledged) {
      return res.status(500).json({ message: 'Erro ao salvar os metadados do arquivo.' });
    }


    res.status(200).json({
      message: 'Arquivo enviado e metadados salvos com sucesso!',
      fileMetadata: metadata
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao processar o upload.',
      error: error.message
    });
  }
};