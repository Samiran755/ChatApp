const express=require("express");
const app=express();
const mongoose=require("mongoose");
const chat=require("./model/chat.js");
const ejs=require("ejs");
const path=require("path");
const methodOverride = require('method-override');

app.set("view engine","ejs")
app.set("views",(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//making connection with mongodb
main()
.then((res)=>{
    console.log("Connection Successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Chatapp');
}

//setting up the server
let port=3000;
app.listen(port,()=>{
    console.log("Server is listening on port 3000")
})


//index route--
app.get("/chats",async(req,res)=>{
    let chats=await chat.find();
    res.render("show.ejs",{chats});
})
//Edit route--
app.get("/chat/:id/edit",async(req,res)=>{
     let {id}=req.params;
     let chatt= await chat.findById(id);
     
     res.render("edit.ejs",{chatt})
})
//update route---
app.patch("/chat/:id",async(req,res)=>{
  let {id}=req.params;
  let {msg:newmsg}=req.body;
  let chatt= await chat.findById(id);
  chatt.msg=newmsg;
  chatt.save();
  res.redirect("/chats")
})
//create new chat route--
app.get("/chats/create",(req,res)=>{
  res.render("create.ejs")
})
app.post("/create",(req,res)=>{
  let{from:who,msg:message,to:whom}=req.body;
   let newChat= new chat({
    from:who,
    msg:message,
    to:whom,
    created_at:new Date()
   }) 
   newChat.save().then((res)=>{
    console.log("Successfully saved")
   });
   res.redirect("/chats");
})
//delete route--
app.get("/chat/:id/delete",async(req,res)=>{
  let {id}=req.params;
  await chat.findByIdAndDelete(id);
  res.redirect("/chats")
})
