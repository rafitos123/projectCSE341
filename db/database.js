// filepath: c:\Users\rahen\Desktop\BYU\CSE341-Project2\db\database.js
const { MongoClient } = require('mongodb');


let database;

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


  

  module.exports = {
    initDb,
    getDatabase,
  };