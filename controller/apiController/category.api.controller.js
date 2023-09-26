var mdCate = require('../../model/category.model');


exports.getCategory = async (req, res, next) => {
    objRes = {
        msg: "",
        status: 0,
        data: {}
    }


    try {
        objRes.data = await mdCate.categoryModel.find();
        objRes.status = 200;
        objRes.msg = "lấy dữ liệu thành công";



    } catch (error) {
        objRes.msg = "lỗi thể loại : " + error.message;
    }

    return res.json(objRes);
}

exports.getOneCategory = async (req, res, next) => {
    objRes = {
        msg: "",
        status: 0,
        data: {}
    }
    let id = req.params.id

    try {
        objRes.data = await mdCate.categoryModel.findById(id);
        objRes.status = 200;
        objRes.msg = "lấy dữ liệu thành công";



    } catch (error) {
        objRes.msg = "lỗi thể loại : " + error.message;
    }

    return res.json(objRes);
}

exports.postCategory = async (req, res, next) => {
    objRes = {
        msg: "",
        status: 0,
        data: {}
    }
    
    if (req.body.cateName.length == 0) {
        objRes.msg = 'không để trống thể loại';
        return res.json(objRes);
    }

    try {
        let cate = new mdCate.categoryModel();
        cate.name = req.body.cateName;

        const resKq = await cate.save();

        if(resKq){
            objRes.status = 200;
            objRes.msg = "thêm thành công thành công";
           
        }

    } catch (error) {
        objRes.msg = "lỗi thể loại : " + error.message;
    }

    return res.json(objRes);
}

exports.putCategory = async (req, res, next) => {
    objRes = {
        msg: "",
        status: 0,
        data: {}
    }
    let idcate = req.params.id
    if (req.body.cateName.length == 0) {
        objRes.msg = 'không để trống thể loại';
        return res.json(objRes);
    }

    try {
        let cate = {};
        cate.name = req.body.cateName;

        const resKq = await mdCate.categoryModel.findByIdAndUpdate(idcate , cate );

        if(resKq){
            objRes.status = 200;
            objRes.msg = "update thành công";
            objRes.data = await mdCate.categoryModel.findById(idcate);
        }else{
            objRes.status = 404;
            objRes.msg = "không tìm thấy id";
            objRes.data = await mdCate.categoryModel.findById(idcate); 
        }

    } catch (error) {
        objRes.msg = "lỗi thể loại : " + error.message;
    }

    return res.json(objRes);
}

exports.deleteCategory = async (req, res, next) => {
    objRes = {
        msg: "",
        status: 0,
        data: {}
    }
    let idcate = req.params.id
 
    try {
       

        const resKq = await mdCate.categoryModel.findByIdAndDelete(idcate);

        if(resKq){
            objRes.status = 200;
            objRes.msg = "xóa thành công";
            objRes.data = await mdCate.categoryModel.find();
        }else{
            objRes.status = 404;
            objRes.msg = "không tìm thấy id";
            objRes.data = await mdCate.categoryModel.find(); 
        }

    } catch (error) {
        objRes.msg = "lỗi thể loại : " + error.message;
    }

    return res.json(objRes);
}

