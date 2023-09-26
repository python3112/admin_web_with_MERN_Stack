var express = require('express');
var router = express.Router();
var multer = require('multer');
var middle = require('../middleware/checkLogin.middle');
var objUpload = multer({dest: './tmp'});

//Đường dẫn tới products.controller.js 
var productCtrl = require('../controller/product.controller');

//Vào trang product theo địa chỉ '/products/'
router.get('/',productCtrl.listProducts);
//Chi tiết
router.get('/view/:id_p',productCtrl.viewProducts);
//Thêm
router.post('/add',objUpload.single('image'),productCtrl.addProduct);
//Sửa
router.post('/edit/:id_p',productCtrl.editProduc);
//Xóa
router.post('/delete/:id_p',productCtrl.deleteProduct);

module.exports = router;
