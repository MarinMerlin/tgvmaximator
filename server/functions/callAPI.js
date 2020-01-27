const request = require('request');
const _ = require('lodash');

ping_sncf = function(departing_day, departure_city_code, arrival_city_code){
    return new Promise((resolve,reject) => {
        let options = '/12-HAPPY_CARD/2/fr/fr?extendedToLocality=true&onlyDirectTrains=true' // Don't care, don't touch;
        let url = 'https://www.oui.sncf/calendar/cdp/api/proposals/v3/outward';
        let full_url = url + '/FR' + departure_city_code + '/FR' + arrival_city_code + '/' + departing_day + options;
        
        // Send the HTTP request to the Messenger Platform
        var options2 = {
            url: full_url,
            method: 'GET',
            json: true,
            headers: { 'Content-Type': 'application/json' }
        };
        
        request.get(options2, (err,res,data) => {
            if(err){
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

CallAPI = async function(trip){
    let departing_day = trip.date.toISOString().split('T')[0];
    let departure_city_code = trip.origin; 
    let arrival_city_code = trip.destination;
    let jsoned_data = await ping_sncf(departing_day, departure_city_code, arrival_city_code);
    let useful_info = []
    _.forEach(jsoned_data,(billet)=>{
        // Useful infos : billet['id'], billet['totalPrice'] (in centimes), billet['departureDate'] and billet['arrivalDate'] (only care about the time, discard the rest)
        let maxDate = new Date(8640000000000000);
        let minDate = new Date(-8640000000000000);
        let billet_info = {'id': -1, 'departure_time': minDate, 'arrival_time': maxDate, 'price': 10000000000000000, 'is_tgvmax': false, 'is_trakos': true};

        let departure_time = Date.parse(billet.departureDate);
        let arrival_time = Date.parse(billet.arrivalDate);

        billet_info.id = billet.id;
        billet_info.price = parseInt(billet.totalPrice);
        billet_info.departure_time = departure_time;
        billet_info.arrival_time = arrival_time;
        billet_info.is_tgvmax = (billet_info.price == 0);
        // A 'gros trakos' is defined as a way too early or way too late departure time
        //billet_info['is_trakos'] = (7 > billet_info['departure_time'].hour or billet_info['departure_time'].hour > 22)

        useful_info.push(billet_info)
    })

    return useful_info
}

module.exports = CallAPI;
