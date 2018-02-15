var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { city: 'Express', data: 'Welcome to Express' });
});

module.exports = router;
