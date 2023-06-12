/*const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const connectToMongo =()=>{
    client.connect().then(()=>{
        console.log("connected");
    }).catch((err)=>{
        console.log(err);
    })
}*/
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";
const connectToMongo=async()=>{
    try{
        await mongoose.connect(mongoURI,{useNewUrlParser: true});
        console.log("connected");
    }catch(err){
        console.log(err);
    }
};
module.exports = connectToMongo;