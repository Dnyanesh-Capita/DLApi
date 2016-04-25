//ToDo; Clean file 
//Replace var with let
//Console log on console need to be looked and changed

/// <reference path="../typings/tsd.d.ts" />

let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');

import nconf = require('nconf');
import { AirPlaneAllStatController } from './../src/controller/AirPlaneAllStatController'
import { DiscCSVToMongoController } from './../src/controller/DiscCSVToMongoController';
import { CSVDownloadController } from './../src/controller/CSVDownloadController';
import { URLCSVToMongoDBController } from './../src/controller/URLCSVToMongoDBController';
import { AirPlaneReviewByAirportNameController } from './../src/controller/AirPlaneReviewByAirportNameController';
import { AirPlaneStatByAirportNameController } from './../src/controller/AirPlaneStatByAirportNameController';
import { AllReviewsOverAllRatingAboveTowController } from './../src/controller/AllReviewsOverAllRatingAboveTowController';


let app = express();

nconf.argv()
  .env()
  .file({ file: __dirname + '/config.json' });


app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


app.get('/api/all/stats', function(req, res) {
  AirPlaneAllStatController.prototype.getStat()
    .then((data) => {
      res.json({ result: data });
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');
    });
});

app.get('/api/:airportName/stats', function(req, res) {

  AirPlaneStatByAirportNameController.prototype.getStatByAirPortName(req.param("airportName"))
    .then((data) => {
      res.json({ result: data });
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');
    });

});

app.get('/api/:airportName/reviews', function(req, res) {

  AirPlaneReviewByAirportNameController.prototype.getReviewByAirPortName(req.param("airportName"))
    .then((data) => {
      res.json({ result: data });
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');
    });
});

app.get('/api/reviews/overAllRating/above/2', function(req, res) {

  AllReviewsOverAllRatingAboveTowController.prototype.getReviewsOverAllRatingAboveTwo()
    .then((data) => {
      res.json({ result: data });
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');
    });
});


//**** Following 3 enpoints I have kept intentianlly app.use 
// as there are not endpoints as such but  just for devlopment and testing ease
// they are here
//Actually theses endpoints can be convered to cron job and set to one month or so 
//EndPoint:1
app.use('/api/csvdownload', function(req, res) {
  CSVDownloadController.prototype.downloadCSVAndSaveToDisc()
    .then((data) => {
      res.json({ result: "CSV Download Sucessfully!!" });
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');
    });
});
//EndPoint:2
app.use('/api/uploadDiscCSVTOMongoDB', function(req, res) {

  DiscCSVToMongoController.prototype.pushDiscCSVToMongoDB()
    .then((data) => {
      res.json({ result: "CSV data push to mongo DN Sucessfully!!" });
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');4
    });
});
//EndPoint:3
app.use('/api/urlCSVTOMongoDB', function(req, res) {

  URLCSVToMongoDBController.prototype.pushURLCSVToMongoDB()
    .then((data) => {
      res.json({ result: "Data from URL CSV pushed to mongo DB sucessfully!!!" });
    })
    .catch((err) => {
      res.status(500).send('Something went wrong');
    });
});

// If no route is matched
app.use(function(req, res, next) {
  res.status(404).send('No match fount!!! Try something else :)');
});
 
 
// Start the server
app.set('port', 5000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
