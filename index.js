// For Server
var express = require('express');
var app     = express();
var port    = process.env.PORT || 7070; // server || local development

//

// For Twitter API calls
var Twitter = require('twitter');
var twitterData;
// twitter credentials: https://apps.twitter.com/
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});



// Allow other localhosts to access the server
// credits: https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// For Maro.js ditribution build
app.use("/", express.static(__dirname + "/dist"));

app.get('/api/:hashtag', function(req, resp) {
  var params = {
    q     : "#" + req.params.hashtag,
    count : 50
  };

  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      twitterData = tweets;
      console.log(tweets);
    } else {
      // SEND ERROR
      console.error('There was an error with the request!');
    }
  });

  resp.json(twitterData);

});


// Listen
app.listen(port);
console.log("listenin on port: " + port);
