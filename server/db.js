const mongoose = require('mongoose');
require('dotenv').config()
const MongoDbURI= process.env.MONGODB_URI ;
mongoose.connect(MongoDbURI).then(()=>{console.log('MongoDb connected!')});
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