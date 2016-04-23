"use strict";
var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var readline = require('readline');
var request = require('request');
var Converter = require("csvtojson").Converter;
var MongoClient = require('mongodb').MongoClient;
var CSVuploadController = (function () {
    function CSVuploadController() {
        this.url = "https://raw.githubusercontent.com/quankiquanki/skytrax-reviews-dataset/master/data/airport.csv";
        //TODO: Add related properties and functions;
    }
    CSVuploadController.prototype.processCSV = function () {
        // 
        // 				var rd = readline.createInterface({
        // 					input: fs.createReadStream(this.url),
        // 					output: process.stdout,
        // 					terminal: false
        // 				});
        // 		
        // 				rd.on('line', function(line) {
        // 					console.log(line);
        // 				});
        //         request.get(this.url, function(error, response, body) {
        //             if (!error && response.statusCode == 200) {
        //                 var csv = body;
        //                 // Continue with your processing here.
        // 				
        // 				var parser = parse({ delimiter: ',' }, function(err, data) {
        // 					async.eachSeries(data, function(line, callback) {
        // 						console.log(line);
        // 						// do something with the line
        // 						//doSomething(line).then(function() {
        // 						// when processing finishes invoke the callback to move to the next one
        // 						//callback();
        // 					});
        // 				});
        // 
        // 				fs.createReadStream(csv).pipe(parser);
        //             }
        //         });
        // request('https://raw.githubusercontent.com/quankiquanki/skytrax-reviews-dataset/master/data/airport.csv')
        // 	.on('response', function(response) {
        // 		console.log(response.statusCode) // 200 
        // 		console.log(response.headers['content-type']) // 'image/png' 
        // 	})
        // 	.pipe(fs.createWriteStream('./DELAPI/CSVTOProcess/test.csv'));
        // 	
        //CSV File Path or CSV String or Readable Stream Object
        var csvFileName = "./test.csv";
        //new converter instance
        var csvConverter = new Converter();
        //end_parsed will be emitted once parsing finished
        csvConverter.on("end_parsed", function (jsonObj) {
            console.log(jsonObj); //here is your result json object
            // Connection URL 
            var url = 'mongodb://localhost:27017/';
            // Use connect method to connect to the Server 
            MongoClient.connect(url, function (err, db) {
                console.log("Connected correctly to server");
                var collection = db.collection('AirportReviews');
                collection.insert(jsonObj);
                console.log('Data Inserted Sucessfully');
            });
        });
        //read from file
        fs.createReadStream(csvFileName).pipe(csvConverter);
        return { "msg": "Done Process" };
    };
    return CSVuploadController;
}());
exports.CSVuploadController = CSVuploadController;
