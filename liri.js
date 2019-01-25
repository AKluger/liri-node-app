// assign requirements to variables
require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");

var artist = process.argv.slice(3).join(" ");
//function for bandsintown
function concertThis(artist) {

    
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + process.env.BANDSINTOWN_ID

    axios.get(queryUrl).then(
        function (response) {
            // fix THIS
            for (var i = 0; i < response.data.length; i++)

                if (artist) {
                    var concertInfo = response.data[i];

                    //use moment to convert concert date format
                    var dateFormat = moment.ISO_8601;
                    var concertDate = concertInfo.datetime
                    var convertedDate = moment(concertDate, dateFormat);

                    console.log("\n" + "Venue Name: " + concertInfo.venue.name + "\n" +
                        "Location " + concertInfo.venue.city + "\n" +
                        "Date: " + convertedDate.format("MM/DD/YY"))
                }
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

var songName = process.argv.slice(3).join(" ");
//function for Spotify
function getSong(songName) {

    
    var spotify = new Spotify(keys.spotify);

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

var movieName = process.argv.slice(3).join(" ");
//function for omdb
function getMovie(movieName) {

    if (!movieName) {
        movieName = "Mr Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&plot=short&apikey=" + process.env.OMDB_ID;

    axios.get(queryUrl).then(
        function (response) {

            console.log("\n" + "Title: " + response.data.Title + "\n" +
                "Year: " + response.data.Year + "\n" +
                "IMDB Rating: " + response.data.imdbRating + "\n" +
                "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" +
                "Country of Production: " + response.data.Country + "\n" +
                "Language: " + response.data.Language + "\n" +
                "Plot: " + response.data.Plot + "\n" +
                "Cast: " + response.data.Actors
            )
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

// function to grab instructions from random.txt
function doWhatItSays() {
    
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        for (var i = 0; i < dataArr.length; i++)
        
        if (dataArr[i] === "spotify-this-song") {
            getSong(dataArr[i + 1])
            }
        else if (dataArr[i] === "movie-this") {
            getMovie(dataArr[i + 1])
        }
        else if (dataArr[i] === "concert-this") {
            concertThis(dataArr[i + 1])
        }
        //show the user what input is being used
        console.log(dataArr);
    })
}

//switch statement taking in user input to execute desired function
var command = process.argv[2];
switch (command) {

    case "movie-this":
        getMovie();
        break;

    case "spotify-this-song":
        getSong();
        break;

    case "concert-this":
        concertThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("\n Please enter a valid command, options are:" +
        "\n movie-this" + "\n concert-this" + "\n spotify-this-song" + "\n do-what-it-says")
}
