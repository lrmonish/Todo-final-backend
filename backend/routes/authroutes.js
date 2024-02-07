const AuthController = require('../auth/auth.controller');
const express = require('express');
const router = new express.Router();


router.post('/sign-up', AuthController.signup);
router.post('/login',AuthController.login)
router.delete('/deleteUser/:id',AuthController.deleteUser)
router.get('/getallusers',AuthController.getallusers)
router.delete("/deleteuserbyadmin/:id", AuthController.deleteuserbyadmin);
router.put("/edituserbyadmin/:id", AuthController.edituserbyadmin);
router.put("/editAll",AuthController.editAll);

module.exports=router;