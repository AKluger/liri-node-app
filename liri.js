require("dotenv").config();

var keys = require("./keys.js");
var fs = require('fs');
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
// console.log(process.argv[2])


function concertThis(artist) {

    var artist = process.argv.slice(3).join(" ");

    if (!artist) {
        artist = "Action Bronson"
        // what to do here.. not currently working...
    }


    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id="+process.env.BANDSINTOWN_ID

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
        })
}
// user commands:
// concert-this artist name
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")



var songName = process.argv.slice(3).join(" ");

function getSong(songName) {

    var spotify = new Spotify(keys.spotify);

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

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+process.env.OMDB_ID;

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (error, response) {

            if (error) {
                return console.log(error);
            }

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
}


function doWhatItSays() {
    // grab instructions from random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        for (var i = 0; i < dataArr.length; i++)
            if (dataArr[i] === "spotify-this-song") {
                getSong(dataArr[i + 1])
            }
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
    })
}



// getSong()
// getMovie();
// doWhatItSays();
// concertThis();

var command = process.argv[2];

switch (command)    {
    
    case "movie-this":
        getMovie();
        break;

    case "spotify-this":
        getSong();
        break;
    
    case "concert-this":
        concertThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        ("Please enter a valid command.")
}
