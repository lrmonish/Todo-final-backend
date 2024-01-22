const UserModel = require('./user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const secretString = process.env.SECRET_STRING; 

const AuthController = {


signup :  (req, res) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const userModel = new UserModel({
          username: req.body.username,
          password: hash
        });
  
        return userModel.save();
      })
      .then(result => {
        res.status(201).json({
          message: 'User created',
          result: result
        });
      })
      .catch(err => {
  
          if (err.name === 'ValidationError') {
          res.status(300).json({
            error: 'Username already exists',
            details: err.errors
          });
        } else {
          res.status(500).json({ error: 'Internal server error' });
        }
      });
  },

  login: (req,res) => {

    let userFound;

    UserModel.findOne({username: req.body.username})
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: 'User not found'
                })
            }
            userFound = user
            return bcrypt.compare(req.body.password, user.password)
        })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message: 'Password is incorrect'
            })
        }

        const token = jwt.sign({username: userFound.username, userId: userFound._id},secretString, {expiresIn:"1h"})
        res.setHeader('Authorization', `Bearer ${token}`);

        // const tokens = window.location.headers.authorization.split(' ')[1];
        // const encryptedToken = SJCL.encrypt('secret_string', tokens);
        // localStorage.setItem('my-app-token', encryptedToken);

       

        return res.status(200).json({
            token: token,
            expiresIn: 3600
        })
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Error with authentication'
        })
    })
}
 
}

module.exports= AuthController;