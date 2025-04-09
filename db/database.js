// filepath: c:\Users\rahen\Desktop\BYU\CSE341-Project2\db\database.js
const { MongoClient } = require('mongodb');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');

let database;

const mongoURI = process.env.MONGODB_URL;
const dbName = "feedback"

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db(); 
            console.log('Database connected!');
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized!');
    }
    return database;
};

const storage = new GridFsStorage({
    url: `${mongoURI}/${dbName}`,
    file: (req, file) => {
      return {
        filename: Date.now() + '-' + file.originalname,
        bucketName: 'uploads', // cria 'uploads.files' e 'uploads.chunks'
      };
    }
  });
  
  const upload = multer({ storage });
  
  module.exports = { connectDB, upload, dbClient: client, initDb, getDatabase, };

