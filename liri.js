
var Twitter = require('twitter');
var keys = require('./keys.js');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});


var action = process.argv[2];

switch(action){
	case 'my-tweets':
		myTweets();
	break;
	case 'spotify-this-song':
		spotify();
	break;
	case 'movie-this':
		omdb();
	break;
	case 'do-what-it-says':
		textFile();
	break;
}
function textFile() {
	var fs = require('fs');

	fs.readFile("random.txt", "utf8", function(error, data) {

	//console.log(data);

	var dataArr = data.split(',');

	//console.log(dataArr);
	if(dataArr[0] == 'my-tweets') {

		function myTweets() {
			client.get('statuses/user_timeline', function(error, tweets, response){
			  if (error) {
			    console.log(error);
			  }else {
			  	for(i=0; i<20; i++) {
			  	console.log(tweets[i].text);
			  	}
			  }
			});
		}
		myTweets();
	}else if (dataArr[0] == 'movie-this') {	
		function omdb() {
		var request = require('request');
		// Store all of the arguments in an array 
		var nodeArgs = dataArr[1].split(' ');
		//console.log(nodeArgs);
		// Create an empty variable for holding the movie name
		var movieName = "";
		// Loop through all the words in the node argument
		// And do a little for-loop magic to handle the inclusion of "+"s
			for (var i=0; i<nodeArgs.length; i++){

				if (i>0 && i< nodeArgs.length) {
						movieName = movieName + "+" + nodeArgs[i];
					}else {
						movieName = movieName + nodeArgs[i];
					}
//					console.log("movie name: " + movieName)
			}
			if (nodeArgs.length < 1) {
				movieName = "mr+nobody";
			}
			// Then run a request to the OMDB API with the movie specified 
			var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';
			// This line is just to help us debug against the actual URL.  
			//console.log(queryUrl);
			request(queryUrl, function (error, response, body) {
				// If the request is successful (i.e. if the response status code is 200)
				if (!error && response.statusCode == 200) {
					console.log("Title: " + JSON.parse(body)["Title"])
					console.log("Year: " + JSON.parse(body)["Year"])
					console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"])
					console.log("Country: " + JSON.parse(body)["Country"])
					console.log("Language: " + JSON.parse(body)["Language"])
					console.log("Plot: " + JSON.parse(body)["Plot"])
					console.log("Actors: " + JSON.parse(body)["Actors"])
					console.log("Tomato Rater: " + JSON.parse(body)["tomatoUserMeter"])
					console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"])
				}
			});
		}
		omdb();
	}else if(dataArr[0] == 'spotify-this-song') {
	function spotify() {
			var spotify = require('spotify');

			var nodeArgs = dataArr[1].split(' ');

			var songName = "";

			for (var i=0; i<nodeArgs.length; i++){

				if (i>0 && i< nodeArgs.length) {
						songName = songName + "+" + nodeArgs[i];
					}else {
						songName = songName + nodeArgs[i];
					}
					//console.log("movie name: " + songName)
			}
			if (nodeArgs.length < 1) {
				songName = "whats+my+age+again";
			}
			spotify.search({
				type: 'track',
				query: songName,
				}, function(err, data) {
				if (err) {
		        console.log('Error occurred: ' + err);
		        return;
		    	}else {
					console.log("Song Name: " + data.tracks.items[0].name);
		      		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		      		console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
		      		console.log("Album: " + data.tracks.items[0].album.name);
		    	}
			})
		}
		spotify();
	}

});
}

function myTweets() {
	client.get('statuses/user_timeline', function(error, tweets, response){
	  if (error) {
	    console.log(error);
	  }else {
	  	for(i=0; i<20; i++) {
	  	console.log(tweets[i].text);
	  }
	  }
	});
}	
function omdb() {
var request = require('request');
// Store all of the arguments in an array 
var nodeArgs = process.argv;
// Create an empty variable for holding the movie name
var movieName = "";
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
	for (var i=3; i<nodeArgs.length; i++){

		if (i>3 && i< nodeArgs.length) {
				movieName = movieName + "+" + nodeArgs[i];
			}else {
				movieName = movieName + nodeArgs[i];
			}
	}
	if (nodeArgs.length < 4) {
		movieName = "mr+nobody";
	}
	// Then run a request to the OMDB API with the movie specified 
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';
	// This line is just to help us debug against the actual URL.  
	//console.log(queryUrl);
	request(queryUrl, function (error, response, body) {
		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode == 200) {
			console.log("Title: " + JSON.parse(body)["Title"])
			console.log("Year: " + JSON.parse(body)["Year"])
			console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"])
			console.log("Country: " + JSON.parse(body)["Country"])
			console.log("Language: " + JSON.parse(body)["Language"])
			console.log("Plot: " + JSON.parse(body)["Plot"])
			console.log("Actors: " + JSON.parse(body)["Actors"])
			console.log("Tomato Rater: " + JSON.parse(body)["tomatoUserMeter"])
			console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"])
		}
	});
}

function spotify() {
	var spotify = require('spotify');

	var nodeArgs = process.argv;

	var songName = "";

	for (var i=3; i<nodeArgs.length; i++){

		if (i>3 && i< nodeArgs.length) {
				songName = songName + "+" + nodeArgs[i];
			}else {
				songName = songName + nodeArgs[i];
			}
	}
	if (nodeArgs.length < 4) {
		songName = "whats+my+age+again";
	}
	spotify.search({
		type: 'track',
		query: songName,
		}, function(err, data) {
		if (err) {
        console.log('Error occurred: ' + err);
        return;
    	}else {
			console.log("Song Name: " + data.tracks.items[0].name);
      		console.log("Artist: " + data.tracks.items[0].artists[0].name);
      		console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
      		console.log("Album: " + data.tracks.items[0].album.name);
    	}
	})
}






