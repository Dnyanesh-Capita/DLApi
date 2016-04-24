/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var MongoClient = require('mongodb').MongoClient;
var rsvp_1 = require('rsvp');
var nconf = require('nconf');
//Controller: To return reviews by AirportName
var AirPlaneReviewByAirportNameController = (function () {
    //TODO Clean up constructor as per requirments
    function AirPlaneReviewByAirportNameController() {
        this.mongoUrl = 'mongodb://localhost:27017/';
    }
    /**
    * @api {get} /api/stats/:airportName Request for Reviews by AirportName
    * @apiName GetReviewByAirPortName
    * @apiGroup Reviews
    *
    * @apiParam {airpotName} name of AirPort.
    *
    * @apiSuccess {String} overall_rating Name of Airport.
    * @apiSuccess {String} recommended  Count of recommendations in Syatem.
    * @apiSuccess {String} date Date of review.
    * @apiSuccess {String} author_country  Country of author.
    * @apiSuccess {String} content  Content of review.
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "overall_rating": "4.55",
    *       "recommended": "5",
    *       "date": "23/04/2016",
    *       "author_country": "Switzerland",
    *       "content": "Transiting via Zurich used to be great. Thanks to Terminal E the whole process is a mess."
    *     }
    *
    * @apiError UserNotFound The id of the User was not found.
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *       "error": "UserNotFound"
    *     }
    */
    //TODO : Return real data
    //Add unit test
    AirPlaneReviewByAirportNameController.prototype.getReviewByAirPortName = function (airpotName) {
        console.log("info: Entered in function to return Review by AirPortName");
        return new rsvp_1.Promise(function (resolve, reject) {
            MongoClient.connect(nconf.get("mongoUrl"), function (err, db) {
                if (err) {
                    console.log("error: Mongon DB can not be connected with error" + err);
                    console.log("info: Promise reject with error");
                    reject(err);
                }
                console.log("info: Mongo db connected sucessfully");
                db.collection('AirportReviews').aggregate([
                    { $match: { airport_name: airpotName } },
                    { $sort: { date: -1 } },
                    { $project: { overall_rating: 1, recommended: 2, date: 3, author_country: 4, content: 5 } }
                ]).toArray(function (err, result) {
                    console.log("info: Resolving promise for Review by AirPortName");
                    resolve(result);
                });
            });
        });
    };
    return AirPlaneReviewByAirportNameController;
}());
exports.AirPlaneReviewByAirportNameController = AirPlaneReviewByAirportNameController;
