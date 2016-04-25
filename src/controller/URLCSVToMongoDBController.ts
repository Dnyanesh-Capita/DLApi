var fs = require('fs');
var async = require('async');
var Converter = require("csvtojson").Converter;
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
import nconf = require('nconf');
import { Promise } from 'rsvp';

//Controller to take data from URL CSV and push it to Mongo DB
export class URLCSVToMongoDBController {

    //Function: Read data from URL CSV file and upload to mongo collection
	public pushURLCSVToMongoDB(): Promise<any> {

		console.log("info: Entered to the Push URL CSV To MongoDB function");

		return new Promise<any>((resolve, reject) => {

			var csvConverter = new Converter();
			csvConverter.on("end_parsed", function(jsonObj) {

				MongoClient.connect((nconf.get("mongoUrl")), function(err, db) {
					if (err) {
						console.log("error: URLCSVToMongoDBController.pushURLCSVToMongoDB - Mongon DB can not be connected with error" + err);
						console.log("info: Promise reject with error");
						reject(err);
					}

					console.log("info: Mongo db connected sucessfully");
                    
					db.collection('AirportReviews').insert(jsonObj, { _id: "userid", seq: 0 });
					console.log('info: AirportReviews Data Inserted Sucessfully');
					resolve({"msg":"Data Uploaded Sucessfully"});
				});
			});
			//read from file
			request(nconf.get("csvURL")).pipe(csvConverter);
			
		}).catch((err) => {
			console.log("error: URLCSVToMongoDBController.pushURLCSVToMongoDB - Rejected promise for Stat by AirPortName " + err);
			throw err;
		});
	}
}