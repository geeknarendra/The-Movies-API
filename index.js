const mongoose = require('mongoose');
const Joi=require("joi")
Joi.objectId=require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rental=require('./routes/rental');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rental',rental);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));