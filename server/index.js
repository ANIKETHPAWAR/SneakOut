require('dotenv').config();
const cors = require('cors');
const express =require('express');
const app =express();

const db = require('./db')
const allowedOrigins = [
  'https://sneak-out.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://www.sneakout.me',
  'https://sneakout-server.onrender.com' // Add your Render URL here
];
app.use(cors({
  origin: function(origin, callback){
    // Allow all localhost ports for development
    if (!origin || 
        allowedOrigins.includes(origin) || 
        origin.startsWith('http://localhost:')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}));

// Handle preflight requests for all routes
app.options('*', cors());
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