require('dotenv').config();
const cors = require('cors');
const express =require('express');
const app =express();

const db = require('./db')
const allowedOrigins = ['https://sneak-out.vercel.app', 'http://localhost:5173'];
app.use(cors({
  origin: function(origin, callback){
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mainroute = require('./routes/mainRoute');
app.get('/',(req,res)=>{
    res.send('Welcome')
})
app.use('/SneakOut/',mainroute)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});