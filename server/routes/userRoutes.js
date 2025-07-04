const express = require('express');
const router = express.Router();
const {User} = require('../models/user')
const {Auth,generateToken}=require('../middlewares/auth')
const bcrypt=require('bcrypt')
// Basic user routes
router.post('/register',async(req,res)=>{
    try{
        const data =req.body;
        const newUser = new User(data);
        const savedUser = await newUser.save();
        const payLoad ={
            id:savedUser._id
        }
        const token = generateToken(payLoad);
        res.status(200).json({savedUser,token : token})
    }catch(err){
        res.status(500).json({error: 'internal error'})
    }
})

router.post('/login',async(req,res)=>{
    
try{
    const {username,password} = req.body;
    
    const user = await User.findOne({username:username});
    
    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error: 'user didnt match'})
    }
    
    const payLoad = {
      id :user._id,
    }
    
    const token = generateToken(payLoad);
    res.json({token})
    }
    catch(err){
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
