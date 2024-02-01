const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const Todo = require('../todo/todo-schema');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar:{
      type:Buffer,
      contentType: String,
    }
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserModel", userSchema);

