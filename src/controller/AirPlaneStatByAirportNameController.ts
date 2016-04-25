/// <reference path="../../typings/tsd.d.ts" />

var MongoClient = require('mongodb').MongoClient;
import { Promise } from 'rsvp';
import nconf = require('nconf');

//Controller: Handle request to return Stat by AirPortName
export class AirPlaneStatByAirportNameController {

	/**
	* @api {get} /api/stat/:airportName Request for Stat by AirportName
	* @apiName GetStatByAirPortName
	* @apiGroup Reviews
	*
	* @apiParam {airpotName} name of AirPort.
	*
	* @apiSuccess {String} airportName Name of Airport.
	* @apiSuccess {String} countOfReviews  Count of reviews in System.
	* @apiSuccess {String} overallRating Over all Rating of review.
	* @apiSuccess {String} countOfRecommendation  Count of recommendation author.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*     {
	*       "airportName": "london-heathrow-airport",
	*       "countOfReviews": "5",
	*       "overallRating": "5.66",
	*       "countOfRecommendation": "4"
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
	public getStatByAirPortName(airpotName): any {

        console.log("info: Entered in function to return Stat by AirPortName");
		
		return new Promise<any>((resolve, reject) => {
			MongoClient.connect((nconf.get("mongoUrl")), function(err, db) {
                if (err) {
					console.log("error: AirPlaneStatByAirportNameController.getStatByAirPortName - Mongon DB can not be connected with error" + err);
					console.log("info: Promise reject with error");
					reject(err);
				}
               
			    console.log("info: Mongo db connected sucessfully");
				
				db.collection('AirportReviews').aggregate(
					[
					{ $match: { airport_name: airpotName } } ,  
					{$group : {
					_id :  "$airport_name",
					"airport name": { $first: "$airport_name" },
					"count of reviews": { $sum: 1 },
					"over all rating" :{ $avg: "$overall_rating"},
					"count of recommendations": {$sum: "$recommended"}
					}}
				]).toArray(function(err, result) {
					
					console.log("info: Resolving promise for Stat by AirPortName");
					resolve(result);
				});
			});
		}).catch((err) =>{
			console.log("error: AirPlaneStatByAirportNameController.getStatByAirPortName - Rejected promise for Stat by AirPortName " + err);
			throw err;
		});
	}
}