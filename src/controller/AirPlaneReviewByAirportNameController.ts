/// <reference path="../../typings/tsd.d.ts" />

var MongoClient = require('mongodb').MongoClient;
import { Promise } from 'rsvp';
import nconf = require('nconf');

//Controller: To return reviews by AirportName
export class AirPlaneReviewByAirportNameController {

	public getStatProp: any;
    public mongoUrl: string;
	//TODO Clean up constructor as per requirments
	constructor() {
		
		this.mongoUrl = 'mongodb://localhost:27017/';
	}
	
		
	/**
	* @api {get} /api/stats/:airportName Request for Reviews by AirportName
	* @apiName GetReviewByAirPortName
	* @apiGroup Reviews
	*
	* @apiParam {airpotName} name of AirPort.
	*
	* @apiSuccess {String} overall_rating Name of Airport.
	* @apiSuccess {String} recommended  Count of recommendations in Syatem.
	* @apiSuccess {String} date Date of review.
	* @apiSuccess {String} author_country  Country of author.
	* @apiSuccess {String} content  Content of review.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*     {
	*       "overall_rating": "4.55",
	*       "recommended": "5",
	*       "date": "23/04/2016",
	*       "author_country": "Switzerland",
	*       "content": "Transiting via Zurich used to be great. Thanks to Terminal E the whole process is a mess."
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
	//TODO : Return real data
	//Add unit test
	public getReviewByAirPortName(airpotName): any {

         console.log("info: Entered in function to return Review by AirPortName"); 
		 
		return new Promise<any>((resolve, reject) => {
			MongoClient.connect(nconf.get("mongoUrl"), function(err, db) {
                if (err) {
					console.log("error: Mongon DB can not be connected with error" + err);
					console.log("info: Promise reject with error");
					reject(err);
				}
               
			    console.log("info: Mongo db connected sucessfully");
				
				db.collection('AirportReviews').aggregate( 
					[
			        { $match : { airport_name: airpotName } }, 
					{ $sort : { date : -1} },
					{ $project : { overall_rating : 1 ,  recommended: 2 , date:3, author_country: 4, content:5}} 
				]).toArray(function(err, result) {
					console.log("info: Resolving promise for Review by AirPortName");
					resolve(result);
				});
			});
		}).catch((err) =>{
			console.log("error: AirPlaneReviewByAirportNameController.getReviewByAirPortName - Rejected promise for Air Plane Review By Airport Name " + err);
			throw err;
		});
	}
}