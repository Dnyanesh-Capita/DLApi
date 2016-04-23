/// <reference path="../../typings/tsd.d.ts" />

var MongoClient = require('mongodb').MongoClient;
import { Promise } from 'rsvp';

export class AirPlanDataController {

	public getStatProp: any;
    public mongoUrl: string;
	//TODO Clean up constructor as per requirments
	constructor() {
		this.getStatProp = this.getStat();
		this.mongoUrl = 'mongodb://localhost:27017/';
	}
	
	//TODO : Return real data
	//Add unit test
	public getStat(): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
                if (err) {
					reject(err);
				}

				let collection = db.collection('AirportReviews');


				collection.aggregate(
					[{
						$group: {
							_id: "$airport_name",
							"name of the airport": { $first: "$airport_name" },
							"count of reviews": { $sum: 1 }
						}
					}]
				).toArray(function(err, result) {
					
					//Close DB
					//db.close();
					resolve(result);
				});
			});
		});
	}
	
	//TODO : Return real data
	//Add unit test
	public getStateByAirPortID(airpotName): any {

		return new Promise<any>((resolve, reject) => {
			MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
                if (err) {
					reject(err);
				}

				let collection = db.collection('AirportReviews');


				collection.aggregate(
					[
					{ $match: { airport_name: "aalborg-airport" } } ,  
					{$group : {
					_id :  "$airport_name",
					"airport name": { $first: "$airport_name" },
					"count of reviews": { $sum: 1 },
					"over all rating" :{ $avg: "$overall_rating"},
					"count of recommendations": {$sum: "$recommended"}
					}}
				]).toArray(function(err, result) {
					
					//Close DB
					//db.close();
					resolve(result);
				});
			});
		});
	}
	
	//TODO : Return real data
	//Add unit test
	public getReviewByAirPortID(airpotName): any {

		return new Promise<any>((resolve, reject) => {
			MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
                if (err) {
					reject(err);
				}

				let collection = db.collection('AirportReviews');

				collection.aggregate( [
					{ $match : { airport_name: "aalborg-airport" } }, 
					{ $sort : { date : -1} },
					{ $project : { overall_rating : 1 ,  recommended: 2 , date:3, author_country: 4, content:5} } 
				]).toArray(function(err, result) {
					
					//Close DB
					//db.close();
					resolve(result);
				});
			});
		});
	}
}