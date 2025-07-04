require('dotenv').config();
const express =require('express');
const app =express();
const cors = require('cors');
const db = require('./db')
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mainroute = require('./routes/mainRoute');
app.get('/',(req,res)=>{
    res.send('Welcome')
})
app.use('/SneakOut/',mainroute)
app.listen(3000 ,()=>{
})