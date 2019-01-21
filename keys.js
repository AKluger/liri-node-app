console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};


var artist = process.argv[3];
bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"