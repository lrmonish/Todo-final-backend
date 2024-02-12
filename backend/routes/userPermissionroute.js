const express = require('express');
const router = new express.Router();
const userPermissioncontroller = require('../auth/userPermission.controller');




router.post("/user-permissions", userPermissioncontroller.postUser);
router.get("/GetP", userPermissioncontroller.getP);
router.put("/updateUserCreateP", userPermissioncontroller.createP);
router.put("/updateUserUpdateP", userPermissioncontroller.updateP);
router.put("/updateUserDeleteP", userPermissioncontroller.deleteP);
router.put("/updateUserCompletedP", userPermissioncontroller.completedP);




module.exports=router;






