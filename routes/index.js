var express = require("express");
var router = express.Router();
var bluebird = require("bluebird");

var Place = require("../models/index").Place;
var Hotel = require("../models/index").Hotel;
var Activity = require("../models/index").Activity;
var Restaurant = require("../models/index").Restaurant;


router.get("/", function(req,res,next){
	var promiseOne = Hotel.find({});
	var promiseTwo = Activity.find({});
	var promiseThree = Restaurant.find({});
	Promise.all([promiseOne, promiseTwo, promiseThree]).then(function(allInfo){
		res.render("index", {
			allHotels: allInfo[0],
			allActivities: allInfo[1],
			allRestaurants: allInfo[2]
		})
		// res.json(allInfo[1])
		// res.json(allInfo[2])
	}).then(null, next);
	// Hotel.find({}).then(function(hotels){
	// 	res.json(hotels)
	// }).then
});

module.exports = router;