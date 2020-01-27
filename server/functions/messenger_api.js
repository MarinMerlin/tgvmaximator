'use strict';
const request = require('request');
const _ = require('lodash')
const PAGE_ACCESS_TOKEN = 'EAADvFZA80kBIBAHmq7D3yk3RV9hTfnh90Yo1w2ZB1pZCyqEPjB6PbhOZA1USIYS94cC4ZBpFkRmOUv1maVkyidZB6j3hK9nyHrZABEdkZBS1ynwKU7CrQCZB6EXC7kZAJYRMeUSp3kZCIsqfeMeGfAvf8qGV6cJjQzoShUAoZC3S6domtQZDZD';
// Se référer à la documentation de Facebook for Developers pour les fonctions utilisant l'API Messenfger : https://developers.facebook.com/docs/messenger-platform/send-messages
const notify_users_messenger = function(trip,train) {
  var date = new Date(parseInt(train.departure_time));
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let departure_time = hours+'h'+minutes;
  let trip_date = _.slice(trip.date.toString().split(' '),0,4);
  trip_date = trip_date[0] + ' ' + trip_date[1] + ' ' + trip_date[2] + ' ' + trip_date[3];
  _.forEach(trip.users, (user) => {
    // Construct the message body
    let text = `Bonjour M. ${user.name},
                Un nouveau train TGVMax est disponible pour votre trajet de ${trip.origin} a ${trip.destination} le ${trip_date}. Il part à ${departure_time}. 
                Si cet horaire vous correspond vous pouvez aller manger nos couilles en salade.
                
                Cordialement,
                L'équipe TGVMaximator`
    let request_body = {
      'messaging_type': 'RESPONSE',
      'recipient': {
        'id': user.messenger_psid,
      },
      'message': {
        'text': text,
      },
    };
      // Send the HTTP request to the Messenger Platform
    request({
      'uri': 'https://graph.facebook.com/v2.6/me/messages',
      'qs': {'access_token': PAGE_ACCESS_TOKEN},
      'method': 'POST',
      'json': request_body,
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent! ', request_body.message.text);
      } else {
        console.error('Unable to send message:' + err);
      }
    });
  })
  
};

module.exports = notify_users_messenger;