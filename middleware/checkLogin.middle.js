exports.checkLogin = (req , res , next) => {
    if(req.session.userLogin){
        next();
    }else{
        return res.redirect('/login')
    }
}
exports.validate = (req  , res , next) => {
    
}

exports.validateProduct = async (req, res, next) => {
    const name = req.body.name;
    const cateId = req.body.cateId;
    const description = req.body.description;
    const price = req.body.price;

    if (!name || name.trim() === '' ||
        !cateId || cateId.trim() === '' ||
        !description || description.trim() === '' ||
        !price || price.trim() === '' ||
        !req.file || req.file.path === undefined )
    {
        return res.send({msg:'cần nhập đầy đủ'});
    } else if (name.length < 4 || description.length <10 || description.length > 200 ) {
        return;
    } else {
        next();
    }
};