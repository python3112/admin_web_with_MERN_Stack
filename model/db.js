//Kết nối cơ sở dữ liệu
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/assignment_mob402_ph29660").catch((error)=>{
    console.log(error);
});

module.exports = {mongoose}
