var mongoose = require('mongoose');
var http = require('http');

var count=0;

console.log("Get food list");

/*mongo:
  ip:
    staging : "192.168.3.4"
    dev: "192.168.50.4"
  port:
    dev: "27017"
    staging: "27017"
  database:
    dev: "qalorie-dev"
    staging: "qalorie-staging"
*/
//qalorie-staging
mongoose.connect('mongodb://192.168.50.4:27017/qalorie-dev');
//mongoose.connect('mongodb://qalorie.nullindustries.co:27017/qalorie-staging');


var Schema = mongoose.Schema;

// create a schema
var FoodSchema = new Schema({
	created: {type: Date, default: Date.now},

	  /*
	    type:
	      - generic
	      - user
	  */
	  type: { type: String, default: 'user' },
	  /*
	    when type = user must have user relation
	  */
	  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},

	  // TODO: think a best way to add food to favories per user
	  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'users', unique: true}],

	  // food bran/restaurant/name
	  name: String,
	  description: String,
	  serving_type: String,
	  serving_per_container: String,

	  // nutricional faqs values
	  // data source: http://products.wolframalpha.com/api/
	  carbs: Number,
	  fat: Number,
	  protein: Number,
	  cholesterol: Number,
	  sodium: Number,
	  potassium: Number,
	  calories: Number,
	  satured: Number,
	  polyunsaturated: Number,
	  dietary_fiber: Number,
	  monounsaturated: Number,
	  sugars: Number,
	  trans: Number,
	  vitamin_a: Number,
	  vitamin_c: Number,
	  calcium: Number,
	  iron: Number
});



var api_key = "X5PCLIvlUzrNRAkyDwafgjCVOED8bAR2Yq8geD0g"
//&max=1000&offset=0
var req = http.get("http://api.nal.usda.gov/ndb/search/?format=json&api_key=" + api_key, function(res) {
  
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
	  getFoodDetail(itemList[i].ndbno);
	  //itemList[i].id
  	}
  });

});

//http://api.nal.usda.gov/ndb/reports/?ndbno=01009&type=b&format=xml&api_key=DEMO_KEY

function getFoodDetail(ndbno){
	//http://api.nal.usda.gov/ndb/reports/?ndbno=11987&type=b&format=fjson&api_key=DEMO_KEY
	var url = "http://api.nal.usda.gov/ndb/reports/?ndbno=" + ndbno + "&type=b&format=json&api_key=" + api_key;
	//console.log(url);
	var req = http.get(url, function(res) {
	  
	  var body = '';

	  res.on('data', function(chunk) {
	    body += chunk;
	  });

	  res.on('end', function() {
	  	try{
		    var data = JSON.parse(body)
		    console.log("Saving " + count)
		    saveFood(data.report.food.name,data.report.food.nutrients);
	  	}catch(e){
	  		console.log(e);
	  	}

	  });

	});  
}


function saveFood(name,nutrients){
	var data = {
		name:name,
		description:name,
		protein:0,
		cholesterol:0,
		sugars:0,
		carbs:0,
		fat:0,
		sodium:0,
		potassium:0,
		calories:0,
		satured:0,
		polyunsaturated:0,
		dietary_fiber:0,
		monounsaturated:0,
		trans:0,
	    vitamin_a: 0,
	    vitamin_c: 0,
	    calcium: 0,
	    iron: 0,
	    type:'generic',
	    serving_per_container:100,
	    serving_type:1
	};

	for(var i=0;i<nutrients.length;i++){
		if(nutrients[i].name=="Protein"){
			data.protein = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Cholesterol"){
			data.cholesterol = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Sugars, total"){
			data.sugars = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Carbohydrate, by difference"){
			data.carbs = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Total lipid (fat)"){
			data.fat = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Sodium, Na"){
			data.sodium = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Potassium, K"){
			data.potassium = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Energy"){
			data.calories = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Fatty acids, total saturated"){
			data.satured = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Fatty acids, total polyunsaturated"){
			data.polyunsaturated = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Fiber, total dietary"){
			data.dietary_fiber = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Fatty acids, total monounsaturated"){
			data.monounsaturated = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Vitamin A, RAE"){
			data.vitamin_a = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Vitamin C, total ascorbic acid"){
			data.vitamin_c = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Calcium, Ca"){
			data.calcium = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Iron, Fe"){
			data.iron = parseFloat(nutrients[i].value);
		}
		if(nutrients[i].name=="Fatty acids, total trans"){
			data.trans = parseFloat(nutrients[i].value);
		}

	}

	var Food = mongoose.model('Food', FoodSchema);

	// create a new user called chris
	var food = new Food(data);

	//console.log(food);

	// call the built-in save method to save to the database
	food.save(function(err) {
	  if (err){
	  	console.log(err)
	  }
	  count++;
	  console.log('Food saved successfully!');
	});
}

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
  console.log(e);
});


