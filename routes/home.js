var express = require('express');
var router = express.Router();
var middle = require('../middleware/checkLogin.middle');

//Đường dẫn tới home.controller.js 
var homeCtrl = require('../controller/home.controller')

//Vào trang home theo địa chỉ '/'

router.get('/',middle.checkLogin,homeCtrl.home)

router.get('/logout' , homeCtrl.Logout)


//Xuất router
module.exports = router;
