const mongoose = require('mongoose');
require('dotenv').config()
const MongoDbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sneakout';

// MongoDB connection options for Atlas
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  bufferCommands: false, // Disable mongoose buffering
};

mongoose.connect(MongoDbURI, options).then(()=>{
  console.log('MongoDb connected!')
}).catch(err => {
  console.error('MongoDB connection failed:', err);
});
const db = mongoose.connection;


db.on('connected',()=>{
    console.log('connected');  
 });
 db.on('disconnected',()=>{
    console.log('disconnected');

 });
 db.on('error',(err)=>{
    console.log('error:',err)
 });

 module.exports = db;