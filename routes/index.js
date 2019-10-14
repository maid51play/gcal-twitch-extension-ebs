var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/schedule', function(req, res, next) {
  res.status(200).send("schedule goes here")
})

module.exports = router;
