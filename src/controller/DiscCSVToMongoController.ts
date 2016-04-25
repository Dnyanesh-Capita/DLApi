var fs = require('fs');
var async = require('async');
var Converter = require("csvtojson").Converter;
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
import { Promise } from 'rsvp';
import nconf = require('nconf');


// This is OPTIONAL Controller to push CSV data from disc to MongoDB
// Controller is to push CSV from Disc and move to MongoDb
export class DiscCSVToMongoController {

    //Function: Read data from Disc file and upload to mongo collection
	public pushDiscCSVToMongoDB(): Promise<any> {
		console.log("info: Entered to the Push Disc CSV To MongoDB function");
		return new Promise<any>((resolve, reject) => {
			
			//CSV File Path 
			var csvFileName = "./AirPortReviews.csv";
			var csvConverter = new Converter();

			//end_parsed will be emitted once parsing finished
			csvConverter.on("end_parsed", function(jsonObj) {

				// Use connect method to connect to the Server 
				MongoClient.connect((nconf.get("mongoUrl")), function(err, db) {
					if (err) {
						console.log("error: DiscCSVToMongoController.pushDiscCSVToMongoDB - Mongon DB can not be connected with error" + err);
						console.log("info: Promise reject with error");
						reject(err);
					}
                    
					console.log("info: Mongo db connected sucessfully");

					db.collection('AirportReviews').insert(jsonObj, {_id: "userid",seq: 0});
					console.log('AirportReviews Data Inserted Sucessfully');
					resolve({"msg":"Data Uploaded Sucessfully"});
				});
			});

			//read from file
			fs.createReadStream(csvFileName).pipe(csvConverter);

		}).catch((err) => {
			console.log("error: DiscCSVToMongoController.pushDiscCSVToMongoDB - Rejected promise for Stat by AirPortName " + err);
			throw err;
		});;
	}
}