//ToDo; Clean file 
//Replace var with let
//Console log on console need to be looked and changed
"use strict";
/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var AirPlaneAllStatController_1 = require('./../src/controller/AirPlaneAllStatController');
var DiscCSVToMongoController_1 = require('./../src/controller/DiscCSVToMongoController');
var CSVDownloadController_1 = require('./../src/controller/CSVDownloadController');
var URLCSVToMongoDBController_1 = require('./../src/controller/URLCSVToMongoDBController');
var AirPlaneReviewByAirportNameController_1 = require('./../src/controller/AirPlaneReviewByAirportNameController');
var AirPlaneStatByAirportNameController_1 = require('./../src/controller/AirPlaneStatByAirportNameController');
var AllReviewsOverAllRatingAboveTowController_1 = require('./../src/controller/AllReviewsOverAllRatingAboveTowController');
var app = express();
nconf.argv()
    .env()
    .file({ file: __dirname + '/config.json' });
app.use(logger('dev'));
app.use(bodyParser.json());
app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    }
    else {
        next();
    }
});
app.get('/api/all/stats', function (req, res) {
    AirPlaneAllStatController_1.AirPlaneAllStatController.prototype.getStat()
        .then(function (data) {
        res.json({ result: data });
    })
        .catch(function (err) {
        res.status(500).send('Something went wrong');
    });
});
app.get('/api/:airportName/stats', function (req, res) {
    AirPlaneStatByAirportNameController_1.AirPlaneStatByAirportNameController.prototype.getStatByAirPortName(req.param("airportName"))
        .then(function (data) {
        res.json({ result: data });
    })
        .catch(function (err) {
        res.status(500).send('Something went wrong');
    });
});
app.get('/api/:airportName/reviews', function (req, res) {
    AirPlaneReviewByAirportNameController_1.AirPlaneReviewByAirportNameController.prototype.getReviewByAirPortName(req.param("airportName"))
        .then(function (data) {
        res.json({ result: data });
    })
        .catch(function (err) {
        res.status(500).send('Something went wrong');
    });
});
app.get('/api/reviews/overAllRating/above/2', function (req, res) {
    AllReviewsOverAllRatingAboveTowController_1.AllReviewsOverAllRatingAboveTowController.prototype.getReviewsOverAllRatingAboveTwo()
        .then(function (data) {
        res.json({ result: data });
    })
        .catch(function (err) {
        res.status(500).send('Something went wrong');
    });
});
//**** Following 3 enpoints I have kept intentianlly app.use 
// as there are not endpoints as such but  just for devlopment and testing ease
// they are here
//Actually theses endpoints can be convered to cron job and set to one month or so 
//EndPoint:1
app.use('/api/csvdownload', function (req, res) {
    CSVDownloadController_1.CSVDownloadController.prototype.downloadCSVAndSaveToDisc()
        .then(function (data) {
        res.json({ result: "CSV Download Sucessfully!!" });
    })
        .catch(function (err) {
        res.status(500).send('Something went wrong');
    });
});
//EndPoint:2
app.use('/api/uploadDiscCSVTOMongoDB', function (req, res) {
    DiscCSVToMongoController_1.DiscCSVToMongoController.prototype.pushDiscCSVToMongoDB()
        .then(function (data) {
        res.json({ result: "CSV data push to mongo DN Sucessfully!!" });
    })
        .catch(function (err) {
        res.status(500).send('Something went wrong');
    });
});
//EndPoint:3
app.use('/api/urlCSVTOMongoDB', function (req, res) {
    URLCSVToMongoDBController_1.URLCSVToMongoDBController.prototype.pushURLCSVToMongoDB()
        .then(function (data) {
        res.json({ result: "Data from URL CSV pushed to mongo DB sucessfully!!!" });
    })
        .catch(function (err) {
        res.status(500).send('Something went wrong');
    });
});
// If no route is matched
app.use(function (req, res, next) {
    res.status(404).send('No match fount!!! Try something else :)');
});
// Start the server
app.set('port', 5000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
