# liri-node-app
A Node app that parses user input and returns song, concert, and movie info from Spotify, Bands in Town, and OMDB APIs, respectively.  Typing in a simple command will return detailed information about your query!

## Getting Started:

* To start, clone this repository to your computer
* create a .env file, here you will store your API keys, labelled as shown in the screenshot

![env-screenshot](./env-screenshot.png?raw=true ".env file")

* Next, if you do not have API keys for the webservices we are going to use follow instructions here to create accounts and obtain them:
* Spotify: https://www.npmjs.com/package/node-spotify-api
* OMDB: http://www.omdbapi.com/apikey.aspx
* Bands-in-Town: https://manager.bandsintown.com/support/bandsintown-api


## Using Liri:

* in your command line interface (Terminal in macs, Command Prompt in windows) navigate to the liri-node-app directory
* Once there, type (without quotations) "node liri"
* On the same line, you can now enter one of the following:
* "concert-this" followed by "artist name" (to look up concert dates for an artist)
* "movie-this" followed by "movie name" (to look up information about a film)
* "spotify-this-song" followed by "song name" (to grab information about a song and a link from Spotify to listen)
* "do-what-it-says" (to grab instructions from your random.txt file)


## Video Demo:
* click the file link below to download a demo exhibiting the full functionality of the app
* ![liri-demo](./node-liri-demo.mov?)



#### Authored by: Alex Kluger 2019

