var fs = require('fs');
var readline = require('readline');
var request = require('request');
import { Promise } from 'rsvp';
import nconf = require('nconf');


// This is OPTIONAL Controller to Save Data on Disc
// Controller is to download CSV from URL and Save it to Disc
// The file data can then be moved to Mongo DB  
export class CSVDownloadController {
	
	//Function to download CSV data from given URL
	//Steps 
	//1. Downlaod Data from given URL 
	//2. Logs on response 
	//3. Pipe it to save on Disc
	public downloadCSVAndSaveToDisc(): Promise<any> {
		console.log("info: Entered to the Download CSV And Save To Disc function")
		return new Promise<any>((resolve, reject) => {
			request((nconf.get("csvURL")))
				.on('response', function(response) {
					console.log("info: Download from URL Results:");
					console.log("info: Download from URL Status code:---> " + response.statusCode);
					console.log("info: Download from URL Response Header:---> " + response.headers['content-type']);
					resolve();
				})
				//./../../CSVToProcess/AirportReviews.csv --NOT WORKING
				.pipe(fs.createWriteStream('./AirPortReviews.csv'));
				
		}).catch((err) =>{
			console.log("error: CSVDownloadController.downloadCSVAndSaveToDisc - Rejected promise for All Stat " + err);
		});
	}
}

 