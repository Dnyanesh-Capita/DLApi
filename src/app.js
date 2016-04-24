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
AllReviewsOverAllRatingAboveTowController_1.AllReviewsOverAllRatingAboveTowController;
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
// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
// var router = express.Router();
// 
// router.get('/', function(req, res) {
//   res.json({ message: 'Test end point form DreamLines_API' });
// });
//app.use('/', require('./routes'));
//app.use('/api', router);
app.use('/api/all/stats', function (req, res) {
    AirPlaneAllStatController_1.AirPlaneAllStatController.prototype.getStat().then(function (data) {
        res.json({ result: data });
    });
});
app.use('/api/:airportName/stats', function (req, res) {
    AirPlaneStatByAirportNameController_1.AirPlaneStatByAirportNameController.prototype.getStatByAirPortName(req.param("airportName")).then(function (data) {
        res.json({ result: data });
    });
});
app.use('/api/:airportName/reviews', function (req, res) {
    AirPlaneReviewByAirportNameController_1.AirPlaneReviewByAirportNameController.prototype.getReviewByAirPortName(req.param("airportName")).then(function (data) {
        res.json({ result: data });
    });
});
app.use('/api/reviews/overAllRating/2', function (req, res) {
    AllReviewsOverAllRatingAboveTowController_1.AllReviewsOverAllRatingAboveTowController.prototype.getReviewsOverAllRatingAboveTwo().then(function (data) {
        res.json({ result: data });
    });
});
app.use('/api/csvdownload', function (req, res) {
    res.json({ message: CSVDownloadController_1.CSVDownloadController.prototype.downloadCSVAndSaveToDisc() });
});
app.use('/api/uploadDiscCSVTOMongoDB', function (req, res) {
    res.json({ message: DiscCSVToMongoController_1.DiscCSVToMongoController.prototype.pushDiscCSVToMongoDB() });
});
app.use('/api/urlCSVTOMongoDB', function (req, res) {
    res.json({ message: URLCSVToMongoDBController_1.URLCSVToMongoDBController.prototype.pushURLCSVToMongoDB() });
});
// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    //err.status = 404;
    next(err);
});
// Start the server
app.set('port', 5000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
