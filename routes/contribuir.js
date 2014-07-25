var express = require('express');
var router = express.Router();
var Imovel = require('../models/imovel');


/* GET form. */
router.get('/', function(req, res) {
  res.render('contribuir', { title: 'Express' });
});

router.post('/receber', function(req, res) {

    var imovel = new Imovel();
    imovel.contribuidor = req.body.contribuidor;
console.log(req.body);
    // save the bear and check for errors
    imovel.save(function(err) {
        console.log(imovel);
        if (err) {
            res.render('contribuir', { msg: err });
        }

        res.render('sucesso', { msg: 'Express' });
    });
});

module.exports = router;
