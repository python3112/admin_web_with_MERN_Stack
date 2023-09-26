var md = require('../model/user.model');
const { use } = require('../routes/userManagement');

exports.userManagement = async (req, res, next) => {
    let msg = '';
    let list = null;


    try {
        list = await md.userModel.find();
    } catch (error) {
        console.log(error)
    }


    res.render('userManagement/userManagement', { title: "User management", listUser: list, msg: msg });
}


exports.userOne = async(req,res,next)=>{
    let msg=  '';
    let user = null;

    let id  = req.params._id;

    try {
         user = await md.userModel.findById(id);
    } catch (error) {
       console.log(error)
    }


    res.render('userManagement/viewUser',{title: "User management"  , oneUser : user , msg : msg});
}

exports.userDelete = async(req,res,next)=>{
    let msg = '';
    let id_u = req.params.id_u;
    if (req.method == "POST") {
        try {
            await md.userModel.findByIdAndDelete(id_u);
            res.redirect('/user-management')
        } catch (error) {
            msg = "Lỗi: " + error.message;
        }
    }

}


exports.editUser = async (req, res, next) => {
    let msg = '';
    try {
        let id_u = req.params.id_u;

        if (req.method == "POST") {
            let objp = {};
            objp.userName = req.body.userName;
            objp.userAvata = req.body.userAvata;
            objp.userEmail = req.body.userEmail;
            objp.userPass = req.body.userPass;
            objp.userPms = req.body.cateId;
            await md.userModel.findByIdAndUpdate(id_u, objp);
            msg = "Cập nhập thành công!"
            res.redirect('/user-management');
        }
    } catch (error) {
        msg = "Lỗi: " + error.message;
    }
}





