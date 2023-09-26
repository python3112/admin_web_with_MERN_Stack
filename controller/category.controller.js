var md = require("../model/category.model");
//Hiển thị
exports.listCategories = async (req,res,next)=>{
    let msg = '';
    let list =[{_id:'',name:''}];
    try {
        list = await md.categoryModel.find();
        msg ='Lấy dữ liệu thành công !'
    } catch (error) {
        console.log(error);
    }
    res.render('category/list',{title: "Categories",listCategory: list,msg:msg});
}
//Thêm
exports.addCategories = async (req,res,next)=>{
    let msg ='';
    if(req.method == "POST"){
        try {
            let objC = new md.categoryModel();
            objC.name = req.body.name;
            await objC.save();
            msg='Đăng ký thành công!'
            res.redirect("/categories");
        } catch (error) {
            msg = 'Lỗi: '+error.message;
        }
    }
};
//Sửa
exports.editCategories = async(req,res,next)=>{
    let msg = '';    
    try {
        let id_c = req.params.id_c;

        if(req.method == "POST"){            
            let objc = {};
            objc.name = req.body.name;
            
            await md.categoryModel.findByIdAndUpdate(id_c,objc);
            msg ="Cập nhập thành công!"
            res.redirect('/categories');
        }
    } catch (error) {
        msg ="Lỗi: "+ error.message;
    }
}
//Xóa
exports.deleteCategories = async(req,res,next)=>{
    let msg ='';
    let id_c =req.params.id_c;
    if(req.method == "POST"){
        try {
            await md.categoryModel.findByIdAndDelete(id_c);
            res.redirect('/categories')
        } catch (error) {
            msg = "Lỗi: "+error.message;
        }
    }
};
