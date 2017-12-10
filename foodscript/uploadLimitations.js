//upload limitations.
var mongoose = require('mongoose');
var http = require('http');
var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');
var csv = require("fast-csv");
var async = require("async");

var count=0;

mongoose.connect('mongodb://qalorie.nullindustries.co:27017/qalorie-staging');

var Schema = mongoose.Schema;

// create a schema
var PhysicalLimitationSchema = new Schema({

  created: {type: Date, default: Date.now},
  name: String

});

var MedicinesSchema = new Schema({

  created: {type: Date, default: Date.now},
  name: String

});

var SuplementsSchema = new Schema({

  created: {type: Date, default: Date.now},
  name: String

});

var FoodLimitationSchema = new Schema({

  created: {type: Date, default: Date.now},
  name: String

});

pl = ["limit 1","limit 2","limit 3","limit 4","limit 5","limit 6","limit 7","limit 8","limit 9","limit 10"];
ml = ["med 1","med 2","med 3","med 4","med 5","med 6","med 7","med 8","med 9","med 10"];
sl = ["supl 1","supl 2","supl 3","supl 4","supl 5","supl 6","supl 7","supl 8","supl 9","supl 10"];

function saveLimitations(){
	var PhysicalLimitation = mongoose.model('physical_limitation', PhysicalLimitationSchema);
	for(var i=0;i<pl.length;i++){

		var data={
			name:pl[i]
		};

		var physicalLimitation = new PhysicalLimitation(data);
		// call the built-in save method to save to the database
		physicalLimitation.save(function(err) {
		  if (err){
		  	console.log(err)
		  }
		  console.log('Physical Limitations saved successfully!');
		});

	}
}

function saveMedicines(){
	var Medicines = mongoose.model('medicines', MedicinesSchema);
	for(var i=0;i<ml.length;i++){

		var data={
			name:ml[i]
		};

		var medicines = new Medicines(data);
		// call the built-in save method to save to the database
		medicines.save(function(err) {
		  if (err){
		  	console.log(err)
		  }
		  console.log('Medicines Limitations saved successfully!');
		});

	}
}

function saveSuplements(){
	var Suplements = mongoose.model('suplements', MedicinesSchema);
	for(var i=0;i<sl.length;i++){

		var data={
			name:sl[i]
		};

		var suplements = new Suplements(data);
		// call the built-in save method to save to the database
		suplements.save(function(err) {
		  if (err){
		  	console.log(err)
		  }
		  console.log('Suplements Limitations saved successfully!');
		});

	}
}

var api_key = "X5PCLIvlUzrNRAkyDwafgjCVOED8bAR2Yq8geD0g"

function uploadFoodLimitations(){
	var FoodLimitation = mongoose.model('food_limitation', FoodLimitationSchema);

	var req = http.get("http://api.nal.usda.gov/ndb/search/?format=json&api_key=" + api_key, function(res) {
	  console.log("Uploading Food Limitations");
	  var body = '';

	  res.on('data', function(chunk) {
	    body += chunk;
	  });

	  res.on('end', function() {
	    var data = JSON.parse(body)
	    
	  	var itemList = data.list.item;
	  	//console.log(itemList);
	  	for(var i=0;i<itemList.length;i++){
	  	  console.log(itemList[i]);
		  //getFoodDetail("01009");
		  //console.log(itemList[i]);
		  //foodPreferences.push({value:itemList[i].name});

		  console.log(itemList[i]);
		  var data={
			name:itemList[i].name
		  };

		  var foodLimitation = new FoodLimitation(data);
		  // call the built-in save method to save to the database
		  foodLimitation.save(function(err) {
		   if (err){
		  	console.log(err)
		   }
		   console.log('Food Limitations saved successfully!');
		  });


		  //getFoodDetail(itemList[i].ndbno);
		  //itemList[i].id
	  	}
		//saveFoodPreferences(foodPreferences);
		
	  });

	});
}


saveLimitations();
saveMedicines();
saveSuplements();
uploadFoodLimitations();

