const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 10
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 10
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
});

//bcrypt 
userSchema.pre('save',async function(next){
    const user =this;
    if(!user.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(15);
        const hash = await bcrypt.hash(user.password,salt);
        user.password=hash;
    }catch(err){
        next(err)
    }
})

userSchema.methods.comparePassword = async function(userPassword){
    
    try{
        const isMatch = await bcrypt.compare(userPassword,this.password);
        return isMatch;
    }catch(err){
        throw new Error(err);
    }
} 

const User = mongoose.model('User',userSchema);

module.exports={
    User
}