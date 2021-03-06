const {Rental,validate}=require('../models/rental');
const {Movie}=require("../models/movie");
const {Customer}=require('../models/customer');
const mongoose=require("mongoose");
const Fawn =require("fawn");
const express=require("express");
const router=express.Router();


Fawn.init(mongoose);
router.get('/',async(req,res)=>{
  const rental=await Rental.find().sort("name");
  res.send(rental);
})


router.post('/',async(req,res)=>{
  const {error}=validate(req.body)
  if(error) return res.status(400).send(error.details[0].message);

  // if(!mongoose.Types.ObjectId.isValid(req.body.customerId))
  //   return res.status(400).send("Invalid id");

  const customer=await Customer.findById(req.body.customerId);
  if(!customer) return res.status(400).send("NO customer With this id");

  const movie=await Movie.findById(req.body.movieId);
  if(!movie) return res.status(400).send("NO Movie With this id");

  if (movie.numberInStock==0) return res.status(400).send("Movie Not available");

  let rental =new Rental({
    customer:{
      _id:customer._id,
      name:customer.name,
      phone:customer.phone
    },
    movie:{
      _id:movie._id,
      title:movie.title,
      dailyRentalRate:movie.dailyRentalRate

    }
  });

  //Fawn 2 Phase Commit 

  new Fawn.Task()
    .save("rentals",rental)
    .update("movies",{_id:movie._id},{
      $inc:{numberInStock:-1}
    })
    .run()
    .then(function(){
      res.send(rental);
    })
    .catch(function(err){
      console.log(err);
    });


    // try{
    //   new Fawn.Task()
    //   .save("rentals",rental)
    //   .update("movies",{_id:movie._id},{
    //     $inc:{numberInStock:-1}
    //   })
    //   .run();
    //   res.send(rental);
    // }catch(err){
    //   console.log(err)
    // }
  


  // rental=await rental.save();
  // movie.numberInStock--;
  // movie.save();
  // res.send(rental);

});

router.get('/:id',async(req,res)=>{
  const rental=await Rental.findById(req.params.id);
  if(!rental) return res.status(404).send("Rental id not found");
  res.send(rental);
})


module.exports=router;