
const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    username:String,
    email:String,
    salt:String,
    password:String,
});

module.exports=mongoose.model("user",userSchema);