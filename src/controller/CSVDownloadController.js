"use strict";
var fs = require('fs');
var readline = require('readline');
var request = require('request');
var rsvp_1 = require('rsvp');
var nconf = require('nconf');
// This is OPTIONAL Controller to Save Data on Disc
// Controller is to download CSV from URL and Save it to Disc
// The file data can then be moved to Mongo DB  
var CSVDownloadController = (function () {
    function CSVDownloadController() {
    }
    //Function to download CSV data from given URL
    //Steps 
    //1. Downlaod Data from given URL 
    //2. Logs on response 
    //3. Pipe it to save on Disc
    CSVDownloadController.prototype.downloadCSVAndSaveToDisc = function () {
        console.log("info: Entered to the Download CSV And Save To Disc function");
        return new rsvp_1.Promise(function (resolve, reject) {
            request((nconf.get("csvURL")))
                .on('response', function (response) {
                console.log("info: Download from URL Results:");
                console.log("info: Download from URL Status code:---> " + response.statusCode);
                console.log("info: Download from URL Response Header:---> " + response.headers['content-type']);
                resolve();
            })
                .pipe(fs.createWriteStream('./AirPortReviews.csv'));
        }).catch(function (err) {
            console.log("error: CSVDownloadController.downloadCSVAndSaveToDisc - Rejected promise for All Stat " + err);
            throw err;
        });
    };
    return CSVDownloadController;
}());
exports.CSVDownloadController = CSVDownloadController;
