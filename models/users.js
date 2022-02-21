const mongoose=require("mongoose");
const Joi=require("joi");
const jwt=require("jsonwebtoken");
const config=require("config");

 const userSchema=new mongoose.Schema({
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
  },
  isAdmin:{
    type:Boolean,
    default:false

  }
});

userSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get("jwtPrivateKey") );
  return token;
}

const Users=mongoose.model("Users",userSchema);


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
