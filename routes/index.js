var express = require('express');
var router = express.Router();

// Load external variables
var fs = require('fs');
var dotenv  = require('dotenv');
var file    = fs.readFileSync('.env');
var config  = dotenv.parse(file); // passing in a buffer

var chave = require('crypto').createHash('sha1').update(config.PASS).digest("hex");


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


router.get('/export', function(req, res) {
    if ((req.session.hash_login !== 'undefined') && (req.session.hash_login == chave )) {
        res.render('export');
    } else {
        res.render('login');
    }
});


router.post('/export', function (req, res) {
  var post = req.body;
  if (post.user === config.USER && post.password === config.PASS) {

    req.session.hash_login = chave;
    console.log(req.session.hash_login);
    res.redirect('/funcao-social/export');
  } else {
    res.render('login',{msg:  'Usuário ou senha incorretos'});
  }
});

module.exports = router;
