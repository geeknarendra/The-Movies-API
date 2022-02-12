const mongoose=require("mongoose");
const Joi=require("joi");



const Users=mongoose.model("Users",new mongoose.Schema({
  uname:{
    type:String,
    require:true
  },
  email:{
    type:String,
    unique:true,
    require:true
  },
  password:{
    type:String,
    require:true,
  }
}));

function validateUser(user) {
  const schema = {
    uname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  };

  return Joi.validate(user, schema);
}


exports.Users=Users;
exports.validate=validateUser;
