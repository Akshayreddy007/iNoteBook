const express = require('express');
const router = express.Router();
const User = require('../models/User'); //user Schema
const{body,validationResult} = require('express-validator');//for data validation
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;
const jwtSecretCode = "AkshayKumarReddy";

//creating user using post method "/api/auth/createUser"
router.post('/',[
    body("name","Enter a valid name").isLength({min:3}),
    body("email","Enter a valid Email").isEmail(),
    body("password","Enter a valid password of min 8 char").isLength({min:8})
],async(req,res)=>{
    let success=false;
    const error = validationResult(req); // returns error if there is any
    //if there are any errors, return bad request and the errors
    if(!error.isEmpty()){
        return res.status(400).json({success,error: error.array()});
    }
    try{
        let user = await User.findOne({email:req.body.email}); //gives if there is any document already there based on given condition
        //if there is a document, return bad request and the msg that document already exists.
        if(user){
            return res.status(400).json({success,error:"an user with these email already exists"});
        };
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        //if there is no document, then we will create one as below
        user= await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })
        const token = jwt.sign({user},jwtSecretCode);
        success=true;
        res.send({success,token});//sending the token.
    }catch(err){
        res.status(500).send("some error happened");//if there is any error during process, catching and sending that error.
    }
    /*.then((user)=>{
        res.json(user);
    }).catch((err)=>{
        res.json({error: "please enter correct values as mentioned",message:err.message});
    })*/
});

module.exports=router;