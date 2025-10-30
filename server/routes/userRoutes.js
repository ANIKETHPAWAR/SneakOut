const express = require('express');
const router = express.Router();
const {User} = require('../models/user')
const {Auth,generateToken}=require('../middlewares/auth')
const bcrypt=require('bcrypt')
// Basic user routes
// Shared register handler
const handleRegister = async (req, res) => {
    try{
        const data = req.body;
        
        // Validate required fields
        if (!data.firstName || !data.lastName || !data.username || !data.email || !data.password) {
            return res.status(400).json({error: 'All fields are required'});
        }
        
        const newUser = new User(data);
        const savedUser = await newUser.save();
        console.log('User saved!');
        const payLoad = {
            id: savedUser._id
        }
        const token = generateToken(payLoad);
        console.log("Your token is :", token);
        res.status(200).json({savedUser, token: token})
    }catch(err){
        console.log('Registration error:', err);
        
        // Handle specific MongoDB errors
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({error: `${field} already exists`});
        }
        
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({error: errors.join(', ')});
        }
        
        res.status(500).json({error: 'internal error'})
    }
}

// Allow both /register and /signup to avoid ad-blockers blocking "register"
router.post('/register', handleRegister)
router.post('/signup', handleRegister)

router.post('/login',async(req,res)=>{
    try{
        const {username, password} = req.body;
        
        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({error: 'Username and password are required'});
        }
        
        const user = await User.findOne({username: username});
        
        if(!user || !(await user.comparePassword(password))){
            console.log('Login failed for user:', username);
            return res.status(401).json({error: 'Invalid credentials'})
        }
        
        console.log('Authenticating user:', username);
        const payLoad = {
            id: user._id,
        }
        const token = generateToken(payLoad);
        res.json({token, user: {id: user._id, username: user.username, email: user.email}})
        console.log('Token sent for user:', username);
    }
    catch(err){
        console.error('Login error:', err);
        res.status(500).json({error: 'internal server error'})
    }
})

router.get('/me', Auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
