
// LIRI App: access OMDB, Twitter, Spotify APIs using node.js

// CLI command is: node liri.js [LIRI command] ["Media selection: movie, song" (if any)]

// Code immediately below initializes variables for: 
//    node.js module "fs" for node file system read/write/append
//    Liri Command Request
//    Arguments Array (operands)
//    'do-what-it-says' userValue ('userOperand') 

// @link https://www.npmjs.com/package/request
// Require 'fs' NPM package for reading and writing files
var fs = require("fs");

var cmdRequest = process.argv[2];
var argumentsArray = process.argv;
var userValue = "";
//  console.log(process.argv);
//  console.log(process.argv.length);
//  console.log(argumentsArray);

switch (cmdRequest) {
    case "movie-this":
        omdb();
        break;

    case "my-tweets":
        twitter();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "do-what-it-says":
        doUserRequest();
        break;
}

/* --------- MOVIE SEARCH ----------------- */

// The following processes the code: node liri.js movie-this "Specified Movie Name"

function omdb() {

// @link https://www.npmjs.com/package/request
// Require 'request' NPM package to query website with 'queryURL'
  var request = require("request");

  var movieName = "";
//  console.log(process.argv);
//  console.log(process.argv.length);

  if (userValue != false) {
    movieName = userValue;
    }
    else if(process.argv.length == 3) {
      movieName = "Mr. Nobody";
      }
//  Assemble the movie name from the command line
      else {
        movieName = process.argv[3];
        for(i = 4; i < process.argv.length; i++) {
        movieName += "+" + process.argv[i];
            }
          }

  fs.appendFile("log.txt", "\n\nLIRI Command:\nmovie-this: " + movieName, encoding="utf8", function(err) {
            if (err) {
                return console.log(err);
                }
            });

// Request to OMDB API for the specified movie
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece&tomatoes=true&r=json";
//  console.log("queryUrl = " + queryUrl);

request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
//  console.log(JSON.parse(body));
      console.log("---------------------------------------------------");
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Year Released: " + JSON.parse(body).Year);
      console.log("iMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("---------------------------------------------------");

      fs.appendFile("log.txt", 
         "\n Movie Title: " + JSON.parse(body).Title
       + "\n Year Released: " + JSON.parse(body).Year
       + "\n iMDB Rating: " + JSON.parse(body).imdbRating
       + "\n Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating
       + "\n Country: " + JSON.parse(body).Country
       + "\n Language: " + JSON.parse(body).Language
       + "\n Plot: " + JSON.parse(body).Plot
       + "\n Actors: " + JSON.parse(body).Actors, encoding="utf8", 
        function(err) {
          if (err) {
          return console.log(err);
            }
          });
        }
    });
  }

/* --------- TWITTER ----------------- */

// The following processes the code: node liri.js my-tweets

function twitter() {

// @link https://www.npmjs.com/package/request
// Require 'twitter' NPM package for Twitter accesses
    var Twitter = require('twitter');

// Retrieve Twitter keys from 'keys.js' file
    var twitterKey = require('./keys.js');
//  console.log(twitterKey);
    var client = new Twitter(twitterKey);

/*  Create new Twitter client using the Twitter Keys congfiguration 'twitterKey'
    var client = new Twitter({
      consumer_key: 'OxkCrGDN5oluYbu3Py8JlwQK9',
      consumer_secret: '6ciEMjqS27DEfagD2xes3BD2JGhgowclrczRnDIugJ2IgSvPe1',
      access_token_key: '962423624891219969-H8wMvVPyGBdWf9Akodj4XZEyg7RNKX2',
      access_token_secret: 'ekpgULcQAm4Me9GoBPKsnNayRoijG2UMx6utzUTiESuWB'
    });
*/
  fs.appendFile("log.txt", "\n\nLIRI Command:\nmy-tweets ", encoding="utf8", function(err) {
            if (err) {
                return console.log(err);
                }
            });

// Node.js function that accesses the Twitter information:
    var params = {screen_name: 'magnetoGalaxy'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("\nHere are my most recent tweets, from @magnetoGalaxy:\n");

            for (var i = 0; i < tweets.length; i++) {
                console.log("------------------------------------------------");
                console.log(tweets[i].text);
                console.log("Tweeted on: " + tweets[i].created_at);

              fs.appendFile("log.txt", 
                "\n\n------------------------------------------------\n" 
                + tweets[i].text
                + "\nTweeted on: " + tweets[i].created_at, encoding="utf8", function(err) {
                    if (err) {
                        return console.log(err);
                        }
                  });
                }
            }
        });
}

/* --------- SPOTIFY ----------------- */

// The following processes the code: node liri.js spotify-this-song

function spotify() {

// @link https://www.npmjs.com/package/request
// Require 'node-spotify' NPM package to generate Spotify song information requests
  var Spotify = require("node-spotify-api");

  var spotify = new Spotify({
    id: "6941360c0e0b42d79dcecd4731640530",
    secret: "bc75fe707036484e90f40e7766e7c2e8"
    });

    if (userValue != false) {
      songName = userValue;
      }
      else {
        songName = "Ace of Base The Sign"
        }

// If the user has specified a song, then assemble the song name: 
  if(process.argv.length > 3) {
      songName = process.argv[3];
      for(i = 4; i < process.argv.length; i++) {
      songName += "+" + process.argv[i];
        }
      }

  fs.appendFile("log.txt", "\n\nLIRI Command:\nspotify-this-song: " + songName, encoding="utf8", function(err) {
      if (err) {
          return console.log(err);
          }
      });

  spotify.search({ 
    type: 'track', 
    query: songName + '&limit=1&'
    }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
          }

//  console.log(data.tracks.items); 
    console.log("---------------------------------------------------");
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Preview Link at Spotify: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);

    fs.appendFile("log.txt", 
      "\n---------------------------------------------------"
     + "\n Artist: " + data.tracks.items[0].artists[0].name
     + "\n Song Name: " + data.tracks.items[0].name
     + "\n Preview Link at Spotify: " + data.tracks.items[0].preview_url
     + "\n Album: " + data.tracks.items[0].album.name, encoding="utf8", 
          function(err) {
            if (err) {
            return console.log(err);
              }
            });
    });
  }

/* --------- DO WHAT IT SAYS ----------------- */

// The following processes the code: node liri.js do-what-it-says

function doUserRequest() {
// if(process.argv[2] === "do-what-it-says") {

// Running the readFile module that's inside of fs.
// Stores the read information into the variable "data"
  fs.readFile("./random.txt", "utf8", function(err, data) {
      if (err) {
          return console.log(err);
      }

// The Data is in the buffer 'Data'. Create a string array using 'split()'
    var userInput = data.split(',');
//  var userInput = data.toString().split(", ");

// The command is at index 0
    var cmdRequest = userInput[0];
// The operand (target) is at index 1
    var cmdOperand = userInput[1];

      switch (cmdRequest) {
          case "movie-this":
              userValue = cmdOperand;
              imdb();
              break;

          case "my-tweets":
              userValue = cmdOperand;
              twitter();
              break;

          case "spotify-this-song":
              userValue = cmdOperand;
              spotify();
              break;
        }
    });
}
