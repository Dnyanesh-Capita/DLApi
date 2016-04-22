/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var airPlaneData = require('./airPlaneData.ts');
//var user = require('./users.js');
 
export class routerCls {
	/*
	 * Routes that can be accessed by any one
	 */
	//router.post('/login', auth.login);
 
	/*
	 * Routes that can be accessed only by autheticated users
	 */
	constructor() {
		router.get('/api/all/stats', airPlaneData.getStat);
		router.get('api/airport: airportId/stats', airPlaneData.getStateByAirPortID);
		router.post('/api/airport: airportId/reviews', airPlaneData.getReviewByAirPortID);
	}
	/*
	 * Routes that can be accessed only by authenticated & authorized users
	 */
	// router.get('/api/v1/admin/users', user.getAll);
	// router.get('/api/v1/admin/user/:id', user.getOne);
	// router.post('/api/v1/admin/user/', user.create);
	// router.put('/api/v1/admin/user/:id', user.update);
	// router.delete('/api/v1/admin/user/:id', user.delete);
}