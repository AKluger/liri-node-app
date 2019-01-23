require("dotenv").config();

var keys = require("./keys.js");
var fs = require('fs');
var axios = require("axios");
var Spotify = require("node-spotify-api");
// console.log(process.argv[2])

function getSong(songName) {

    var spotify = new Spotify(keys.spotify);
    var songName = process.argv.slice(3).join(" ");
    //put this outside the function...

    if (!songName) {
        songName = "The Sign"
    }

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("\n" + "Artist: " + data.tracks.items[0].album.artists[0].name + "\n" +
            "Title: " + songName + "\n" +
            "Listen here: " + data.tracks.items[0].album.external_urls.spotify + "\n" + 
            "Album: " + data.tracks.items[0].album.name);

    })
}
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

var getMovie = function (movieName) {

    var movieName = process.argv.slice(3).join(" ");

    if (!movieName) {
        movieName = "Mr Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {

        console.log( "\n" + "Title: " + response.data.Title + "\n" +
           "Year: " + response.data.Year + "\n" +
           "IMDB Rating: " + response.data.imdbRating + "\n" +
           "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" +
           "Country of Production: " + response.data.Country + "\n" +
           "Language: " + response.data.Language + "\n" +
           "Plot: " + response.data.Plot + "\n" +
           "Cast: " + response.data.Actors
           )
        })
    }

//if user does not enter argument return "Mr. Nobody" search
// do-what-it-says use .fs to grab instructions from random.txt file;
// getSong()
getMovie();