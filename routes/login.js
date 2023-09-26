var express = require('express');
var router = express.Router();
var multer = require('multer');
var objUpLoad = multer( { dest: './tmp'} );
var loginCtrl = require('../controller/login.controller')
var middle = require('../middleware/checkLogin.middle');





router.get('/' ,loginCtrl.Login);
router.post('/' ,loginCtrl.Login);


// thêm admin ///
router.get('/signup' ,objUpLoad.single('userAvata'), loginCtrl.Signup);
router.post('/signup' ,objUpLoad.single('userAvata'), loginCtrl.Signup);


module.exports = router;