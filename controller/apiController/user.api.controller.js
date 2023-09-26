var md = require('../../model/user.model');

exports.getUser = async (req, res, next) => {
    let objRes = {
        msg: '',
        status: 0,
        data: {}
    };


    try {
        objRes.data = await md.userModel.find();
        objRes.msg = "Lấy dữ liệu thành công";
        objRes.status = 1;
    } catch (err) {
        console.log(err);
        objRes.msg = err.message;
    }
    res.json(objRes);
}





exports.postUser = async (req, res, next) => {
    let objRes = {
        msg: '',
        status: 0,
        data: {}
    };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (req.body.userName.length < 5 || req.body.userPass.length < 5 || (req.body.userPms !== "admin" && req.body.userPms !== "user") || !emailRegex.test(req.body.userEmail) ) {
        if (req.body.userName.length < 5) {
            objRes.msg = "user name phải có ít nhất 5 kí tự";
            return res.json(objRes);
        }

        if (req.body.userPass.length < 5) {
            objRes.msg = "password phải có ít nhất 5 kí tự";
            return res.json(objRes);
        }

        if (req.body.userPms !== "admin" && req.body.userPms !== "user") {
            objRes.msg = "vai trò phải là admin hoặc user ";
            return res.json(objRes);
        }
        if(!emailRegex.test(req.body.userEmail)){
            objRes.msg = "email không hợp lệ";
            return res.json(objRes)
        }







    }
    try {
        const check = await md.userModel.findOne({ userName: req.body.userName });
        if (check) {
            objRes.msg = "Người dùng đã tồn tại trong database";
            return res.json(objRes);
        }

        let user = new md.userModel();
        user.userName = req.body.userName;
        user.userEmail = req.body.userEmail;
        user.userPass = req.body.userPass;
        user.userAvata = req.body.userAvata;
        user.userPms = req.body.userPms;

        objRes.data = await user.save();
        objRes.msg = " thêm thành  công "
        objRes.status = 200;

    } catch (error) {

        objRes.msg = error.message;
    }

    return res.json(objRes);

}


exports.putUser = async (req, res, next) => {
    let objRes = {
        msg: '',
        status: 0,
        data: {}
    };
    let idU = req.params.id;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (req.body.userName.length < 5 || req.body.userPass.length < 5 || (req.body.userPms !== "admin" && req.body.userPms !== "user") ||!emailRegex.test(req.body.userEmail)) {
        if (req.body.userName.length < 5) {
            objRes.msg = "user name phải có ít nhất 5 kí tự";
            return res.json(objRes);
        }
        if (req.body.userPass.length < 5) {
            objRes.msg = "password phải có ít nhất 5 kí tự";
            return res.json(objRes);
        }
        if(!emailRegex.test(req.body.userEmail)){
            objRes.msg = "email không hợp lệ";
            return res.json(objRes);
        }

       
    }


    try {

        let model2 = {};
        model2.userName = req.body.userName;
        model2.userEmail = req.body.userEmail;
        model2.userPass = req.body.userPass;
        model2.userAvata = req.body.userAvata;
        model2.userPms = req.body.userPms;

        const resUpdate = await md.userModel.findByIdAndUpdate(idU, model2);

        if (resUpdate) {
            objRes.msg = "update thành công : " + idU;
        } else {
            objRes.msg = "không tìm thấy bản ghi :" + idU;
        }

        objRes.status = 200;
        objRes.data = await md.userModel.findById(idU);
    } catch (error) {
        msg = "lỗi put : " + error.msg;
        objRes.msg = msg;
    }

    return res.json(objRes);
}


exports.deleteUser = async (req, res, next) => {
    let objRes = {
        msg: '',
        status: 0,
        data: {}
    };


    let id_u = req.params.id;


    // xóa
    try {
        const resDelete = await md.userModel.findByIdAndDelete(id_u);
        if (resDelete) {
            objRes.msg = "xóa thành công : " + id_u;
            objRes.status = 200;


        } else {

        }


    } catch (err) {
        objRes.msg = err.message;
    }


    return res.json(objRes);
}


exports.getOneUser = async (req, res, next) => {
    let objRes = {
        msg: '',
        status: 0,
        data: {}
    };

    try {
        let idUser = req.params.id;
        const resGetOne = await md.userModel.findById(idUser);
        if (resGetOne.userPms === 'user') {
            objRes.msg = "tìm được user"
            objRes.status = 200;
            objRes.data = resGetOne;
        } else {
            objRes.msg = " không tìm thấy bản ghi"
            objRes.status = 404;
        }


    } catch (error) {
        objRes.msg = "lỗi get 1 user : " + error.message;
    }

    return res.json(objRes);
}


