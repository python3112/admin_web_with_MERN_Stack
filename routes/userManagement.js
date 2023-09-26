var express = require('express');
var router = express.Router();


//Đường dẫn tới userManagement.controller.js 
var userManagementCtrl = require('../controller/userManagement.controller');

//Vào trang userManagement theo địa chỉ '/userManagement/'
router.get('/',userManagementCtrl.userManagement);
router.get('/:_id'  ,userManagementCtrl.userOne );
router.post('/delete/:id_u' , userManagementCtrl.userDelete);
router.post('/edit/:id_u' , userManagementCtrl.editUser);



module.exports = router;
