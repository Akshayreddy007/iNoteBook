const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const User = require('../models/User');
const router = express.Router();

// need the logged user details
router.post('/',fetchUser,async(req,res)=>{
    try{
        const userId = req.user.user._id;
        const user = await User.findById(userId).select("-password");
        res.send({user});
    }catch(error){
        res.status(500).send("internal server error");
    }
});

module.exports=router;