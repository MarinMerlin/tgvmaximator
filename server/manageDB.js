//Définition des modules
const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require('body-parser');
const _ = require('lodash');
const Trip = require('./schema/Trip');
const User = require('./schema/User');

//Connexion à la base de donnée
mongoose
  .connect("mongodb+srv://tgvmaximator:MaximatorTGV@tgvmax-9wfym.gcp.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });



User.create({email:'marin.merlin@me.com',password:'plop',name:'Merlin',messenger_psid:'1907097259403451'}, (err,user) => {

});

  // Trip.find({}, function(err, trips) {
//     User.findOne({name:'Merlin'}, (err,user) => {
//         _.forEach(trips,(trip)=>{
//             trip.users = [user];
//             trip.save().then((trip)=>{console.log(trip)});
//         })
// });              
              



