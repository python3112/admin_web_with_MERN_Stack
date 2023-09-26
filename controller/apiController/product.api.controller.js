var md  = require('../../model/product.model');
 


exports.getProduct = async(req , res , next) => {
    let objRes = {
        msg : "", 
        status : 0,
        data:[]


    } 
    try {

        objRes.data = await md.productModel.find().sort({_id: -1}).populate('id_category');
        objRes.status = 200;
        objRes.msg = "lấy dữ liệu thành công";

        
    } catch (error) {
        objRes.msg = "lỗi sản phẩm : " + error.message;
    }

    return res.json(objRes);
}

exports.getOneProduct = async(req , res , next) => {
    let objRes = {
        msg : "", 
        status : 0,
        data:[]


    } 


    let id_pro = req.params.id;
    try {

      const resKq = await md.productModel.findById(id_pro).populate('id_category');
      if(resKq){
        objRes.data = resKq;
        objRes.status = 200;
        objRes.msg= 'lấy 1 sản phẩm thành công';
      }else{
        objRes.data = [];
        objRes.status = 404;
        objRes.msg= 'không tìm thấy sản phẩm ';
      }

        
    } catch (error) {
        objRes.msg = "lỗi sản phẩm : " + error.message;
    }

    return res.json(objRes);
}

exports.postProduct = async(req , res  ,next ) => {
    objRes = {
        msg: "",
        status: 0,
        data: []
    }
    
    try {
        let product = new md.productModel();
        product.name = req.body.name;
        product.id_category = req.body.idCate;
        product.description = req.body.description;
        product.price = req.body.price;
        product.image = req.body.image;


        await product.save();
        objRes.msg = 'thêm sản phẩm thành công '
        objRes.status = 200;
        objRes.data = await md.productModel.find();

    } catch (error) {
        objRes.msg = "lỗi add product : " + error.message;
    }

    return res.json(objRes);
}