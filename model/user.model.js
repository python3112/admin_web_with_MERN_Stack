var db = require('./db');

var userSchema = new db.mongoose.Schema(
    {
        userName:{type:String , require:true},
        userEmail:{type:String , require:true},
        userPass:{type:String , require:true} , 
        userAvata:{type:String , require:true},
        userPms:{type:String , require:true}
    }, 
    {
        collection:'tb_users'
    }
)

let userModel = db.mongoose.model('userModel' , userSchema);
module.exports = {userModel};