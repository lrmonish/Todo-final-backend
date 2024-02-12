const express = require('express');
const router = new express.Router();
const adminPermissioncontroller = require('../auth/adminPermission.controller');




router.post("/admin-permissions", adminPermissioncontroller.postUser);
router.get("/GetadminP", adminPermissioncontroller.getP);
router.put("/updateAdminCreateP", adminPermissioncontroller.createP);
router.put("/updateAdminUpdateP", adminPermissioncontroller.updateP);
router.put("/updateAdminDeleteP", adminPermissioncontroller.deleteP);
router.put("/updateAdminCompletedP", adminPermissioncontroller.completedP);




module.exports=router;






