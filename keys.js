console.log('this is loaded');

exports.spotify = {
  id: process.env.c3b32754f48b4f2cbb78d545f9adddfa,
  secret: process.env.f41066917fde463b984faa9bd649b249
};


var artist = process.argv[3];
bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"