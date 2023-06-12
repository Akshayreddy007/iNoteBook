const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecretCode = "AkshayKumarReddy";

router.post('/',[
    //validating user entered details
        body('email',"please enter valid email").isEmail(),
        body('password',"password can not be empty").exists()
    ],async(req,res)=>{
        let success = false;
        const error = validationResult(req);
        if(!error.isEmpty){
            return res.status(400).json({success,error: error.array()});
        }
        const {email,password} = req.body;
        try{
            let user = await User.findOne({email});// getting user details from db by email
            if(!user){
                return res.status(400).json({success,error:"please enter correct email"});
            }
            const passVerify = await bcrypt.compare(password,user.password);//comparing passwords
            if(!passVerify){
                return res.status(400).json({success,error:"please enter correct password"});
            }
            const token = jwt.sign({user},jwtSecretCode); //generating token for logged user
            success=true;
            res.json({success,token});
        }catch(error){
            res.status(500).json("internal server error");
        }
});

module.exports = router;