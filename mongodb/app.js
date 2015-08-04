var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var db_url = 'mongodb://localhost:27017/test';


var insertDocument = function(db, callback) {
	db.collection('restaurants').insertOne( {
		"address" : {
			"street" : "2 Avenue",
			"zipcode" : "10075",
			"building" : "1480",
			"coord" : [ -73.9557413, 40.7720266 ],
		},
		"borough" : "Manhattan",
		"cuisine" : "Italian",
		"grades" : [
			{
				"date" : new Date("2014-10-01T00:00:00Z"),
				"grade" : "A",
				"score" : 11
			},
			{
				"date" : new Date("2014-01-16T00:00:00Z"),
				"grade" : "B",
				"score" : 17
			}
		],
		"name" : "Vella",
		"restaurant_id" : "41704620"
	}, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted a document into the restaurants collection.");
		callback(result);
	});
};

var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find( );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

var findFilteredRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find( { "borough": "Manhattan" } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

var findComboRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find(
		{ "cuisine": "Italian", "address.zipcode": "10075" }
	);
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

var findSort = function(db, callback) {
	var cursor = db.collection('restaurants').find().sort( { "borough": 1, "address.zipcode": 1 } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

// finds the first document with the name 'Juni' and updates the values
var updateRestaurants = function(db, callback) {
	db.collection('restaurants').updateOne(
		{ "name" : "Juni" },
		{
			$set: { "cuisine": "American (New)" },
			$currentDate: { "lastModified": true }
		}, function(err, results) {
			console.log(results);
			callback();
	});
};

// updates all documents with the address.zipcode of '10016' and updates 
var updateMultipleRestaurants = function(db, callback){
	db.collection('restaurants').updateMany(
		{ "address.zipcode": "10016", cuisine: "Other" },
		{
			$set: { cuisine: "Category To Be Determined" },
			$currentDate: { "lastModified": true }
		}, function(err, results) {
			console.log(results);
			callback();
	});
};

/* Update Fields */
/*

MongoClient.connect(db_url, function(err, db){
	assert.equal(null, err);

	updateMultipleRestaurants(db, function(){
		db.close();
	});
});

*/

/* Query dataset */
/*

MongoClient.connect(db_url, function(err, db) {
	assert.equal(null, err);
	findSort(db, function() {
		db.close();
	});
});

*/

/* Insert document */
/*

MongoClient.connect(db_url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server.");

	insertDocument(db, function(){
		db.close();	
	});
});

*/