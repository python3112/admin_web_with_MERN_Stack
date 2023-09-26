var express = require('express');
var router = express.Router();
var useApiCrl = require('../controller/apiController/user.api.controller');
var cateApiCrl = require('../controller/apiController/category.api.controller');
var productCtrl = require('../controller/apiController/product.api.controller');

///////// user api ///////////////
router.get('/users' ,useApiCrl.getUser);
router.get('/users/:id' , useApiCrl.getOneUser)
router.post('/users' , useApiCrl.postUser );
router.put('/users/:id' , useApiCrl.putUser);
router.delete('/users/:id' , useApiCrl.deleteUser);

/// product api /////////
router.get('/product' , productCtrl.getProduct)
router.get('/product/:id' , productCtrl.getOneProduct)
router.post('/product' , productCtrl.postProduct)




////////// catetory api ///////////////
router.get('/category' , cateApiCrl.getCategory);
router.get('/category/:id' , cateApiCrl.getOneCategory);
router.post('/category' , cateApiCrl.postCategory);
router.put('/category/:id' , cateApiCrl.putCategory);
router.delete('/category/:id' , cateApiCrl.deleteCategory);


module.exports = router;

