/// <reference path="../../typings/tsd.d.ts" />

var MongoClient = require('mongodb').MongoClient;
import { Promise } from 'rsvp';
import nconf = require('nconf');


export class AirPlaneAllStatController {

	
	/**
	* @api {get} /api/all/stats Request for Airports with Review count
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
	// TO ADD apidoc - apidoc -i controller/ -o apidoc
	public getStat(): Promise<any> {
		
		return new Promise<any>((resolve, reject) => {
			
			console.log("info: Entered in function to return All Stat");
			
			MongoClient.connect(nconf.get("mongoUrl"), function(err, db) {
                if (err) {
					console.log("error: Mongon DB can not be connected with error" + err);
					reject(err);
				}
                
				console.log("info: Mongo db connected sucessfully");
				
				db.collection('AirportReviews').aggregate(
					[
						{$group: {
							_id: "$airport_name",
							"name of the airport": { $first: "$airport_name" },
							"count of reviews": { $sum: 1 }
						}},
                        { $sort : { "count of reviews" : -1}}
					]
				).toArray(function(err, result) {
					console.log("info: Resolving promise for All Stat Data");
					resolve(result);
				});
			});
		}).catch((err) =>{
			console.log("error: AirPlaneAllStatController.getStat - Rejected promise for All Stat " + err);
			throw err;
		});
	}
	
	public Add(){
		this.Add1();
	}
	public Add1(){
		return; 
	}
}