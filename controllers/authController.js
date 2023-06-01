
const express = require('express');
const app = express.Router();
const User= require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup=async(req,res)=>{

 const {name,email,password,phoneNumber,urlNo}=req.body;
 try{
   console.log('in try block')
    if(!name || !email || !password || !phoneNumber){

     return   res.status(400).json({message:"Please fill the required Credentials"} );
    }
    console.log("checking if user exists")
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      console.log("user already exists")
      return res.status(400).json({message:"Email User already exists!"}) ;
    } 
    else{
       console.log('hasing pass')
        const hashed = await bcrypt.hash(password,10);
       
        const user = new User({name,email,password:hashed,phoneNumber, urlNo});
        await user.save();
        console.log("user registered succesfully")
         res.status(200).json({message:"User Registered succesfully"});
          }
         }
   catch(error){
      console.log(error);
      res.json({error});
   }      
}


exports.getUserData= async(req,res)=>{
   try{
     
      let user = await User.findById({_id:req.params.id})
      if(user){
         res.status(200).json({user});
      }
      else{
         return res.status(404).json({message:"User doesnt exist"})
      }
}catch(error){
   res.status(404).json({"error getting user":error});
}
}



exports.login = async(req,res)=>{

   const {email,password}= req.body;

   try{
    if(!email ||!password){ return res.json({message:'please fill all credentials'});}

   const  loggedin = await User.findOne({email:email});

    if(loggedin && ( await bcrypt.compare(password,loggedin.password))){
    const{_id,name,email}=loggedin;
    const token = jwt.sign({_id,name,email},process.env.secretKey);
    res.status(200).json({"token":token});
        
   }else{
      res.status(400).json({message:'User doesnt Exists or password is incorrect'});
   }
}catch(error){ 
   console.log(error);
   res.status(401).json({error});
}
}




