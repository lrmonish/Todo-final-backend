const express = require('express');
const router = new express.Router();

const userPermissioncontroller = require('../auth/userPermission.controller');





router.put("/createp", userPermissioncontroller);
router.put("/updatep", userPermissioncontroller.updateP);
router.put("deletep", userPermissioncontroller.deleteP);
router.put("completedboxp", userPermissioncontroller.completedboxP);





module.exports=router;