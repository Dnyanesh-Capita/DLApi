/// <reference path="../../typings/tsd.d.ts" />

var MongoClient = require('mongodb').MongoClient;
import { Promise } from 'rsvp';
import nconf = require('nconf');


export class AllReviewsOverAllRatingAboveTowController {

		
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
	public getReviewsOverAllRatingAboveTwo(): Promise<any> {
		
		return new Promise<any>((resolve, reject) => {
			
			console.log("info: Entered in function to return All Stat");
			
			MongoClient.connect(nconf.get("mongoUrl"), function(err, db) {
                if (err) {
					console.log("error: Mongon DB can not be connected with error" + err);
					reject(err);
				}
                
				console.log("info: Mongo db connected sucessfully");
				
				db.collection('AirportReviews').find({overall_rating: { $gt: 2 } })
				.toArray(function(err, result) {
					console.log("info: Resolving promise for All Stat Data");
					resolve(result);
				});
			});
		}).catch((err) =>{
			console.log("error: AirPlaneAllStatController.getStat - Rejected promise for All Stat " + err);
			throw err;
		});
	}
}