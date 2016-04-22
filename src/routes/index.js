/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var airPlaneData = require('./airPlaneData.ts');
//var user = require('./users.js');
var routerCls = (function () {
    /*
     * Routes that can be accessed by any one
     */
    //router.post('/login', auth.login);
    /*
     * Routes that can be accessed only by autheticated users
     */
    function routerCls() {
        router.get('/api/all/stats', airPlaneData.getStat);
        router.get('api/airport: airportId/stats', airPlaneData.getStateByAirPortID);
        router.post('/api/airport: airportId/reviews', airPlaneData.getReviewByAirPortID);
    }
    return routerCls;
}());
exports.routerCls = routerCls;
