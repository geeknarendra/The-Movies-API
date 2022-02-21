require("express-async-errors");
const config=require("config");
const error=require("./midldeware/error")
const mongoose = require('mongoose');
const Joi=require("joi")
Joi.objectId=require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rental=require('./routes/rental');
const users=require('./routes/users');
const auth=require('./routes/auth');
const express = require('express');
const req = require("express/lib/request");
const app = express();

if (!config.get("jwtPrivateKey")){
  console.error("jwtPrivateKey Not Defined");
  process.exit(1);
}
mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rental',rental);
app.use("/api/users",users);      //Register
app.use('/api/login',auth);       //Auth


//Error handling 
app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));