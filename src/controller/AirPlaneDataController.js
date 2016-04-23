/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var MongoClient = require('mongodb').MongoClient;
var rsvp_1 = require('rsvp');
var AirPlanDataController = (function () {
    //TODO Clean up constructor as per requirments
    function AirPlanDataController() {
        this.getStatProp = this.getStat();
        this.mongoUrl = 'mongodb://localhost:27017/';
    }
    //TODO : Return real data
    //Add unit test
    AirPlanDataController.prototype.getStat = function () {
        return new rsvp_1.Promise(function (resolve, reject) {
            MongoClient.connect('mongodb://localhost:27017/', function (err, db) {
                if (err) {
                    reject(err);
                }
                var collection = db.collection('AirportReviews');
                collection.find().toArray(function (err, result) {
                    //Close DB
                    //db.close();
                    resolve(result);
                });
            });
        });
    };
    //TODO : Return real data
    //Add unit test
    AirPlanDataController.prototype.getStateByAirPortID = function () {
        var sampleJson = { name: "Data by ID" };
        return (sampleJson);
    };
    //TODO : Return real data
    //Add unit test
    AirPlanDataController.prototype.getReviewByAirPortID = function () {
        var sampleJson = { name: "Data for review by ID" };
        return (sampleJson);
    };
    return AirPlanDataController;
}());
exports.AirPlanDataController = AirPlanDataController;
