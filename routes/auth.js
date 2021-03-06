const config=require("config");
const _ =require('lodash');
const jwt=require('jsonwebtoken');
const bcrypt=require("bcrypt");
const Joi=require("joi");
const {Users}=require("../models/users");
const express=require('express');
const router=express.Router();



router.post("/",async(req,res)=>{
  const {error}=validate(req.body)
  if(error) return res.status(400).send(error.details[0].message);

  let user=await Users.findOne({email:req.body.email});
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword=await bcrypt.compare(req.body.password,user.password)

  const token=user.generateAuthToken();
  res.send(token); 



  // if(!validPassword){
  //   return res.status(400).send("Invalid email or password");
  // }
  // res.send("Login Succesful");

    
});

function validate(req) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  };

  return Joi.validate(req, schema);
}



module.exports=router;