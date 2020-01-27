//Définition des modules
const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require('body-parser');
const http = require('http');
const cron = require('node-cron');
const _ = require('lodash');
const path = require('path');
const Trip = require('./schema/Trip');
const User = require('./schema/User');
const callAPI = require('./functions/callAPI');
const checkNewTrains = require('./functions/checkNewTrains');
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

//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

//Définition du routeur
const user_router = express.Router();
app.use("/user", user_router);
require(__dirname + "/controllers/userController")(user_router);
const trip_router = express.Router();
app.use("/dashboardActions", trip_router);
require(__dirname + "/controllers/tripController")(trip_router);

//On définit la route Hello
app.get('/*',function(req,res){
  res.sendFile(HTML_FILE);
})

//User.create({email:'marin.merlin@me.com',password:'plop',name:'Merlin',messenger_psid:'1907097259403451'}, (err,user) => {

//});

cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
    Trip.find({}, function(err, trips) {
      _.forEach(trips,(trip)=>{
        callAPI(trip).then((trains) => {
          checkNewTrains(trip,trains);
        })
      })
    });
});

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));


