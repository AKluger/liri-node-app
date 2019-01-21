require("dotenv").config();

var keys = require("./keys.js");
var fs = require('fs');
var Spotify = require("node-spotify-api");
console.log(process.argv[2])

// function getSong(songName)  {
var spotify = new Spotify(keys.spotify);
var songName = process.argv[2];

spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 

})
// }
// user commands:
// concert-this artist name
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")


// spotify-this-song song name
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

// return Ace of Base The Sign if argument is blank

// movie-this movie name
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

//if user does not enter argument return "Mr. Nobody" search
// do-what-it-says use .fs to grab instructions from random.txt file;
