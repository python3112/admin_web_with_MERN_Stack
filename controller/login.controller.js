var Model = require('../model/user.model');
var fs = require('fs');
exports.Login = async (req, res, next) => {
    let msg = '';
    if (req.method == 'POST') {
        try {
            let objU = await Model.userModel.findOne({ userName: req.body.userName });

            console.log(objU);
            if (objU != null) {
                // tồn tại username ==> kiểm tra passwd
                if (objU.userPass == req.body.userPass) {
                    // đúng thông tin tài khoản ==> lưu vào session
                    if (objU.userPms.toString() === 'admin') {
                        req.session.userLogin = objU;
                        return res.redirect("/");
                        // chuyển trang về trang quản trị
                    } else {
                        msg = 'không phải admin'
                    }

                } else {
                    msg = 'Sai password';
                }


            } else {
                msg = 'Không tồn tại tài khoản: ' + req.body.userName;

            }
            console.log(msg)


        } catch (error) {
            msg = error.message;
        }
    }


    res.render('home/login', { msg: msg })
}

exports.Signup = async (req, res, next) => {
    let msg = '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (req.method == 'POST') {
        console.log(req.file , req.body);
        fs.rename(req.file.path ,"./public/uploads/"+req.file.originalname , 
        (err) => {
            if(err){
                console.log(err);

            }else{
                console.log('http//localhost:3000/uploads/' + req.file.originalname)
            }
        });
    
            if (req.body.userName.length < 3) {
                msg = 'username phải có 3 kí tự trở lên '
                return res.render('home/signup', { msg: msg });
            }
            else if(await Model.userModel.findOne({userName:req.body.userName})){
                msg = 'đã có tên tài khoản này rồi'
                return res.render('home/signup', { msg: msg });
            }
            else if (req.body.userPass.length < 3) {
                msg = 'password phải 3 kí tự trở  lên '
                return res.render('home/signup', { msg: msg });

            }else if(!emailRegex.test(req.body.userEmail)){
                msg = 'email phải có @ gmail.com'
                return res.render('home/signup', { msg: msg });
            }
           
                try {

                    let objU = new Model.userModel();
                    objU.userName = req.body.userName;
                    objU.userEmail = req.body.userEmail;
                    objU.userPass = req.body.userPass;
                    objU.userAvata = req.file.originalname;
                    objU.userPms = req.body.userPms;
                    const resKq = objU.save();
                    if (resKq) {
                        res.redirect('/login')
                    }
                }
                catch (error) {
                    msg = 'lỗi đăng kí'
                }




            }
        

            return res.render('home/signup', { msg: msg });
        }
    
