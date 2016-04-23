//ToDo; Clean file 
//Replace var with let
//Console log on console need to be looked and changed
"use strict";
/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var AirPlaneDataController_1 = require('./../src/controller/AirPlaneDataController');
var CSVuploadController_1 = require('./../src/controller/CSVuploadController');
var app = express();
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
    AirPlaneDataController_1.AirPlanDataController.prototype.getStat().then(function (data) {
        res.json({ message: data });
    });
});
app.use('/api/stats/:airportId', function (req, res) {
    var id = req.param("airportId");
    res.json({ message: AirPlaneDataController_1.AirPlanDataController.prototype.getStateByAirPortID() });
});
app.use('/api/reviews/:airportId', function (req, res) {
    var id = req.param("airportId");
    res.json({ message: AirPlaneDataController_1.AirPlanDataController.prototype.getReviewByAirPortID() });
});
app.use('/api/uploadUrl', function (req, res) {
    res.json({ message: CSVuploadController_1.CSVuploadController.prototype.processCSV() });
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
