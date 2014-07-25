var express = require('express');
var router = express.Router();

/* GET form. */
router.get('/', function(req, res) {
  res.render('contribuir', { title: 'Express' });
});

module.exports = router;
