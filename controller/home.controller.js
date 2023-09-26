
exports.home = (req,res,next)=>{
  userInfo = req.session.userLogin
    res.render('home/home',{title: "Home" , userInfo:userInfo});
}


exports.Logout = (req , res  , next) => {
    req.session.destroy((err) => {
        if(err){
          console.log(err)
        }else{
          return res.redirect('/login');
        }
      })
}
