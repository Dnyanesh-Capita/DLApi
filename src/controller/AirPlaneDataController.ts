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

				collection.find().toArray(function(err, result) {
					
					//Close DB
					//db.close();
					resolve(result);
				});
			});
		});
	}
	
	//TODO : Return real data
	//Add unit test
	public getStateByAirPortID(): any {

		return new Promise<any>((resolve, reject) => {
			MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
                if (err) {
					reject(err);
				}

				let collection = db.collection('AirportReviews');

				collection.find().toArray(function(err, result) {
					
					//Close DB
					//db.close();
					resolve(result);
				});
			});
		});
	}
	
	//TODO : Return real data
	//Add unit test
	public getReviewByAirPortID(): any {

		return new Promise<any>((resolve, reject) => {
			MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
                if (err) {
					reject(err);
				}

				let collection = db.collection('AirportReviews');

				collection.find().toArray(function(err, result) {
					
					//Close DB
					//db.close();
					resolve(result);
				});
			});
		});
	}
}