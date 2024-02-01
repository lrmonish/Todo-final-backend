const AuthController = require('../auth/auth.controller');
const express = require('express');
const router = new express.Router();


router.post('/sign-up', AuthController.signup);
router.post('/login',AuthController.login)
router.delete('/deleteUser/:id',AuthController.deleteUser)


module.exports=router;