var mongoose = require('mongoose');
var http = require('http');
var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');
var csv = require("fast-csv");
var async = require("async");


var count=0;



mongoose.connect('mongodb://192.168.50.4:27017/qalorie-dev');

var Schema = mongoose.Schema;

// create a schema
var PreferenceSchema = new Schema({

  created: {type: Date, default: Date.now},
  food_preferences:[{
    value:String
  }],

  suplement_preferences:[{
    value:String
  }]

});

var api_key = "X5PCLIvlUzrNRAkyDwafgjCVOED8bAR2Yq8geD0g"

function uploadFoodLimitations(callback){
	var req = http.get("http://api.nal.usda.gov/ndb/search/?format=json&api_key=" + api_key, function(res) {
	  console.log("Uploading Food Limitations");
	  var body = '';

	  res.on('data', function(chunk) {
	    body += chunk;
	  });

	  res.on('end', function() {
	    var data = JSON.parse(body)
	    //console.log(data);
	  	var itemList = data.list.item;
	  	
	  	for(var i=0;i<data.list.item.length;i++){
	  	  //console.log(itemList[i]);
		  //getFoodDetail("01009");
		  //console.log(itemList[i]);
		  foodPreferences.push({value:itemList[i].name});
		  //getFoodDetail(itemList[i].ndbno);
		  //itemList[i].id
	  	}
		//saveFoodPreferences(foodPreferences);
		callback();
	  });

	});
}

function uploadSuplementsLimitations(callback){
	//Leer los CSV
	console.log("Uploading Suplement Limitations");
	var output = [];
	var parser = parse({delimiter: ','})
	var stream = fs.createReadStream('lstProducts.csv');

	
	var csvStream = csv()
	    .on("data", function(data){
	         //console.log(data[1]);
	         if(data[1]!=undefined){
				suplementLimitations.push({value:data[1]});
	         } 
	    })
	    .on("end", function(){
	         callback();
	    });
	 
	stream.pipe(csvStream);

}




console.log("Uploading Limitations");
console.log("----------------------------------------------------------------------------------------------");

var foodPreferences = [];
var suplementLimitations=[];

async.series([
    uploadFoodLimitations,
    uploadSuplementsLimitations
], function (err, results) {
    // Here, results is an array of the value from each function
    console.log("Upload complete"); // outputs: ['two', 'five']
    savePreference(foodPreferences,suplementLimitations);
});


function savePreference(foodPreferences,suplementLimitations){
	var Preference = mongoose.model('Preference', PreferenceSchema);
	// create a new user called chris
	var data = {
		food_preferences:foodPreferences,
		suplement_preferences:suplementLimitations
	}
	console.log(data);
	var preference = new Preference(data);

	// call the built-in save method to save to the database
	preference.save(function(err) {
	  if (err){
	  	console.log(err)
	  }
	  console.log('Food preferences saved successfully!');
	});

}


function saveFoodPreferences(foodPreferences){
	var Preference = mongoose.model('Preference', PreferenceSchema);
	// create a new user called chris
	var data = {
		food_preferences:foodPreferences
	}
	var preference = new Preference(data);

	// call the built-in save method to save to the database
	preference.save(function(err) {
	  if (err){
	  	console.log(err)
	  }
	  console.log('Food preferences saved successfully!');
	});

}
