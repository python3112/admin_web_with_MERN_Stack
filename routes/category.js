var express = require('express');
var router = express.Router();

//Đường dẫn tới categories.controller.js 
var categoryCtrl = require('../controller/category.controller');

//Vào trang categories theo địa chỉ '/categories/'
//Lấy ra danh sách
router.get('/',categoryCtrl.listCategories);
//Thêm
router.post('/add',categoryCtrl.addCategories);
//Sửa
router.post('/edit/:id_c',categoryCtrl.editCategories);
//Xóa
router.post('/delete/:id_c',categoryCtrl.deleteCategories);

module.exports = router;
