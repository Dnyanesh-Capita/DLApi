/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var MongoClient = require('mongodb').MongoClient;
var rsvp_1 = require('rsvp');
var nconf = require('nconf');
var AllReviewsOverAllRatingAboveTowController = (function () {
    function AllReviewsOverAllRatingAboveTowController() {
    }
    /**
    * @api {get} /api/all/stats All reviews for Airports with overall_rating more than 2
    * @apiName GetStat
    * @apiGroup Reviews
    *
    *
    * @apiSuccess {String} airportName Name of Airport.
    * @apiSuccess {String} countOfReviews  Count of review in Syatem.
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       "airportName": "london-heathrow-airport",
    *       "countOfReviews": "5"
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
    AllReviewsOverAllRatingAboveTowController.prototype.getReviewsOverAllRatingAboveTwo = function () {
        return new rsvp_1.Promise(function (resolve, reject) {
            console.log("info: Entered in function to return All Stat");
            MongoClient.connect(nconf.get("mongoUrl"), function (err, db) {
                if (err) {
                    console.log("error: Mongon DB can not be connected with error" + err);
                    reject(err);
                }
                console.log("info: Mongo db connected sucessfully");
                db.collection('AirportReviews').find({ overall_rating: { $gt: 2 } })
                    .toArray(function (err, result) {
                    console.log("info: Resolving promise for All Stat Data");
                    resolve(result);
                });
            });
        }).catch(function (err) {
            console.log("error: AirPlaneAllStatController.getStat - Rejected promise for All Stat " + err);
            throw err;
        });
    };
    return AllReviewsOverAllRatingAboveTowController;
}());
exports.AllReviewsOverAllRatingAboveTowController = AllReviewsOverAllRatingAboveTowController;
