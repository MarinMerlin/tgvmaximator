const _ = require('lodash');
const notify_user_messenger = require('./messenger_api'); 
checkNewTrains = function(trip,trains){
    let train_ids = [];

    _.forEach(trains, (train) => {
        if(train.is_tgvmax){
            if(!_.includes(trip.trains,train.id)){
                console.log(`New train detected, Départ : ${train.departure_time}`);
                notify_user_messenger(trip,train)
            }
            train_ids.push(train.id)
        }
            
    })
    trip.trains = train_ids;
    trip.save(); //Async call if you need to wait declare the func async and precede with await
}

module.exports = checkNewTrains;
