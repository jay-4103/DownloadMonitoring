const mongoose = require("mongoose");

mongoose.set('strictQuery', false);


const uri = "mongodb+srv://Jay:lZqO9hytpsNFauu1@cluster0.wpyapa4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false
    // useCreateIndex:true
}).then(()=>{
    // console.log(res);
    console.log("Connected To MONGO-DB - mongoose");
}).catch((err)=>{
    console.log("ERROR FROM connect.js");
    console.log(err);
})