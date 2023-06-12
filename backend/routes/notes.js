const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require('../middleware/fetchUser');
const {body, validationResult} = require("express-validator");
//router 1 to fetch all notes of a user logged , required logged user details
router.get('/fetchAllNotes',fetchUser,async(req,res)=>{
    try{
        const notes = await Notes.find({user: req.user.user._id});//getting notes by using userid
        res.json(notes);
    }catch(err){
        res.status(500).json("internal server error");
    }
});

//router 2 to addNewnotes of a user logged , required logged user details
router.post('/addNewNote',fetchUser,[
        //validation for user entered details
        body("title","title should be of minimum 3 chars").isLength({min:3}),
        body("description","des must be atleast of 5 chars").isLength({min:5})
    ],async(req,res)=>{
        try{
            const error = validationResult(req);// returns error if there is any
            //if there are any errors, return bad request and the errors.
            if(!error.isEmpty()){
                return res.status(400).json({error: error.array()});
            }
            const {title,description,tag}=req.body;//using destructuring and getting details from req.body
            //creating notes object
            const note = new Notes({
                title,description,tag,user:req.user.user._id
            });
            //saving notes object in database
            const savedNote = await note.save();
            res.json(savedNote)
        }catch(err){
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
});

router.put("/updateNote/:id",fetchUser,async(req,res)=>{
    try{
        const {title,description,tag} = req.body;//using destructuring and getting details from req.body
        //creating new Note and adding the updated details
        const newNote = {};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        //checking wheather the notes you want to update is in db or not.
        const notes = await Notes.findById(req.params.id);
        if(!notes){return res.status(400).send("Not Found")};//if not send error
        //checking the notes is related to logged user or not, if not sending not allowed msg.
        if(notes.user.toString() !== req.user.user._id){ 
            return res.status(401).send("Not Allowed");
        }
        //if everything fine then finding the notes and updating it in database.
        const newNotes = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
        res.send(newNotes);
    }catch(error){
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/deleteNote/:id",fetchUser,async(req,res)=>{
    try{
        const note = await Notes.findById(req.params.id);
        if(!note){return res.send(400).send("Not FOund")};

        if(note.user.toString()!==req.user.user._id){
            return res.send(401).send("Not Allowed");
        }
        const notes = await Notes.findByIdAndDelete(req.params.id);
        res.json({"success":"Note has been deleted",note:note});
    }catch(error){
        res.status(500).send("Internal Server Error");
    }
})
module.exports= router;