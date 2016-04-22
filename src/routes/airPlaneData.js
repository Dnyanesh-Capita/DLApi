"use strict";
var AirPlanData = (function () {
    function AirPlanData() {
    }
    AirPlanData.prototype.getStat = function (req, res) {
        var sampleJson = { name: "Dnyanesh" };
        res.json(sampleJson);
    };
    AirPlanData.prototype.getStateByAirPortID = function (req, res) {
        var sampleJson = { name: "Data by ID" };
        res.json(sampleJson);
    };
    AirPlanData.prototype.getReviewByAirPortID = function (req, res) {
        var sampleJson = { name: "Data for review by ID" };
        res.json(sampleJson);
    };
    return AirPlanData;
}());
exports.AirPlanData = AirPlanData;
