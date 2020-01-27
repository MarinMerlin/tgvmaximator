const account = require('./auth/lib.js');
const Trip = require('../schema/Trip');
const User = require('../schema/User');

async function createNewTrip(new_trip,body){
    new_trip.origin = body.origin;
    new_trip.destination = body.destination;
    new_trip.date = new Date(body.date);
    const users = body.users;
    for(let i = 0; i<users.length; i++){
        const email = users[i];
        await User.findOne({email}, (err,user) => {
            console.log(user);
            new_trip.users.push(user);
        })
    };
    new_trip.save();
};

function deleteTrip(trip_id){
    Trip.deleteOne({ _id: trip_id }, function (err,trip) {
        if (err) return console.log(err);
        else return console.log(`Removed trip ${trip_id}`);
      });
};

module.exports = function (app) {
    app.get('/',account.isAuth, (req, res, next) => {
        console.log("Accessing trip info");
        Trip.find({}, function(err, trips) {
            return res.status(200).json(trips);
        })
    });

    app.post('/postNewTrip',account.isAuth, (req,res,next) => {
        let new_trip = new Trip;
        createNewTrip(new_trip,req.body);
        
    });
    app.delete('/deleteTrip',account.isAuth, (req,res,next) => {
        deleteTrip(req.body.trip_id)
    });
}