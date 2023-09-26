var md = require("../model/product.model");
var fs = require('fs');
var fsedit = require('fs').promises;


//Hiện thị
exports.listProducts = async (req, res, next) => {
    let msg = '';
    let list = null;
    let categories = null;
    try {
        categories = await md.cateModel.find();
        list = await md.productModel.find();
        msg = 'Lấy dữ liệu thành công !'
    } catch (error) {
        console.log(error);
    }
    res.render('product/list', { title: "Products", listProduct: list, msg: msg, categories: categories });
}

//Thêm

exports.addProduct = async (req, res, next) => {
    let msg = '';
    console.log( req.file);
    if (req.method == "POST") {
        fs.rename(req.file.path ,"./public/uploads/"+req.file.originalname , 
        (err) => {
            if(err){
                console.log(err);

            }else{
                console.log('http//localhost:3000/uploads/' + req.file.originalname)
            }
        } )
       
        try {
            let objP = new md.productModel();
            objP.name = req.body.name;
            objP.id_category = req.body.cateId;
            objP.description = req.body.description;
            objP.price = req.body.price;
            objP.image = req.file.originalname;
            await objP.save();
            msg = 'Đăng ký thành công!'
            res.redirect("/products");
        } catch (error) {
            msg = 'Lỗi: ' + error.message;
        }
    }
};
//Sửa
exports.editProduc = async (req, res, next) => {
    let msg = '';
    try {
        let id_p = req.params.id_p;

        if (req.method == "POST") {
            let objp = {};
            objp.name = req.body.name;
            objp.id_category = req.body.cateId;
            objp.description = req.body.description;
            objp.price = req.body.price;
            objp.image = req.body.image;
            await md.productModel.findByIdAndUpdate(id_p, objp);
            msg = "Cập nhập thành công!"
            res.redirect('/products');
        }
    } catch (error) {
        msg = "Lỗi: " + error.message;
    }
}
exports.deleteProduct = async (req, res, next) => {
    let msg = '';
    let id_p = req.params.id_p;
    if (req.method == "POST") {
        try {
            await md.productModel.findByIdAndDelete(id_p);
            res.redirect('/products')
        } catch (error) {
            msg = "Lỗi: " + error.message;
        }
    }
};
//Chi tiết 
exports.viewProducts = async(req,res,next)=>{
    let msg ='';
    let id_p = req.params.id_p;
    let objp = null;
    let categories = null;
    try {
        categories = await md.cateModel.find();
        objp = await md.productModel.findById(id_p);
        msg ="Lấy dữ liệu thành công";
    } catch (error) {
        msg ="Lỗi :" + error.message;
    }
    res.render('product/view', { title: "Details product", product: objp, msg: msg, categories: categories });

}