
const mongoose=require('mongoose');

const storySchema=mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    by:String,
    kids:[Number],
    score:Number,
    title:String,
    desc:String,
    id:Number,
});


module.exports=mongoose.model("story",storySchema);