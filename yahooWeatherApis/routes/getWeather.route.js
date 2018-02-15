var express = require('express');
var router = express.Router();
var https = require('https');
var HTTPStatus = require('http-status');

router.get('/:city', function (req, res, next) {
  var searchtext = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + req.params.city + "') and u='c'"
  https.get("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json", function (response) {
    // Continuously update stream with data
    var body = '';
    response.on('data', function (d) {
      body += d;
    });
    response.on('end', function () {
      var weatherdataJson = JSON.parse(body);
      var temperature = weatherdataJson.query.results.channel.item.condition.temp;
      res.render('index', { city: req.params.city, temperature: 'Temperature: ' + temperature + ' c' });
    });
  });
});

module.exports = router;
