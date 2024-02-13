const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin:{type:Boolean, default:false},
    role: { type: String, default: 'user' }
},
{
  timestamps:true
});


userSchema.methods.getPublicProfile = function () {
  const user = this
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

userSchema.methods.getPublicUsers = function () {
  const user = this
  const userObject = user.toObject();
  delete userObject.role;
  return userObject;
}

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  if(this.username === 'admin')
  {
    this.role = 'superadmin';
  }

  else
  {
    
    this.role = this.isAdmin ? 'admin' : 'user';

  }
 

  next();
});
  
 

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserModel", userSchema);

