require('dotenv').config();
const cors = require('cors');
const express =require('express');
const app =express();

const db = require('./db')
const { User } = require('./models/user')
const allowedOrigins = [
  'https://sneak-out.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://www.sneakout.me',
  'https://sneakout.me', // Add both www and non-www versions
  'https://sneakout-kxmb.onrender.com' // Your actual Render URL
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

async function ensureAdminUser() {
  try {
    const username = 'Aniketh@admin';
    let admin = await User.findOne({ username });
    if (!admin) {
      admin = new User({
        firstName: 'Aniketh',
        lastName: 'Admin',
        username: username,
        email: 'admin@sneakout.me',
        password: 'Aniketh@admin'
      });
      await admin.save();
      console.log('Admin user created: Aniketh@admin / Aniketh@admin');
    } else {
      console.log('Admin user already exists');
    }
  } catch (e) {
    console.error('Failed ensuring admin user:', e.message);
  }
}

app.listen(PORT, async () => {
  console.log(`running on ${PORT}`);
  await ensureAdminUser();
});