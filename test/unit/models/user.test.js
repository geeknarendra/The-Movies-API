
const jwt = require("jsonwebtoken");
const {Users}=require("../../../models/users");
const config=require('config');
const mongoose=require("mongoose");

describe("user.generateAuthToken",()=>{
  it("should return valid JWT",()=>{
      const payload={
        _id:new mongoose.Types.ObjectId().toHexString(),
        isAdmin:true};
      const user=new Users(payload);
      const token=user.generateAuthToken();
      const decode=jwt.verify(token,config.get("jwtPrivateKey"));
      expect(decode).toMatchObject(payload);
     });
});