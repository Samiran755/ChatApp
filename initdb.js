const mongoose=require("mongoose");
const chat=require("./model/chat.js");

//making connection with mongodb
main()
.then((res)=>{
    console.log("Connection Successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Chatapp');
}
let allchat=[{
 from:"Shyamal",
 msg:"Give me a blue pen",
 to:"Dipen",
 created_at:new Date()
},{
 from:"ssd",
 msg:"let's go out ",
 to:"h2",
  created_at:new Date()
   
},{
    from:"kumra",
 msg:"how is your study going on",
 to:"adam",
  created_at:new Date()

},{
    from:"Bob",
 msg:"get ready",
 to:"eve",
  created_at:new Date()

}]
chat.insertMany(allchat).then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})
