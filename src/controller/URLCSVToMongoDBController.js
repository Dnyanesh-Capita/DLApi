"use strict";
var fs = require('fs');
var async = require('async');
var Converter = require("csvtojson").Converter;
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var nconf = require('nconf');
var rsvp_1 = require('rsvp');
//Controller to take data from URL CSV and push it to Mongo DB
var URLCSVToMongoDBController = (function () {
    function URLCSVToMongoDBController() {
        //TODO: Add related properties and functions;
    }
    //Function: Read data from URL CSV file and upload to mongo collection
    URLCSVToMongoDBController.prototype.pushURLCSVToMongoDB = function () {
        console.log("info: Entered to the Push Disc CSV To MongoDB function");
        return new rsvp_1.Promise(function (resolve, reject) {
            var csvConverter = new Converter();
            csvConverter.on("end_parsed", function (jsonObj) {
                MongoClient.connect((nconf.get("mongoUrl")), function (err, db) {
                    if (err) {
                        console.log("error: URLCSVToMongoDBController.pushURLCSVToMongoDB - Mongon DB can not be connected with error" + err);
                        console.log("info: Promise reject with error");
                        reject(err);
                    }
                    console.log("info: Mongo db connected sucessfully");
                    db.collection('AirportReviews').insert(jsonObj);
                    console.log('info: AirportReviews Data Inserted Sucessfully');
                    resolve({ "msg": "Data Uploaded Sucessfully" });
                });
            });
            //read from file
            request(nconf.get("csvURL")).pipe(csvConverter);
        }).catch(function (err) {
            console.log("error: URLCSVToMongoDBController.pushURLCSVToMongoDB - Rejected promise for Stat by AirPortName " + err);
        });
    };
    return URLCSVToMongoDBController;
}());
exports.URLCSVToMongoDBController = URLCSVToMongoDBController;
