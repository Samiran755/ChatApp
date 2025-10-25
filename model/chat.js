const mongoose=require("mongoose");

const chatSchema = new mongoose.Schema({
 from:{
    type:String,
    required:true
 },
 msg:{
    type:String,
    maxLength:100
 },
 to:{
    type:String,
    required:true
 },
 created_at:Date
});
 const chat=mongoose.model("chat",chatSchema);
 module.exports=chat;