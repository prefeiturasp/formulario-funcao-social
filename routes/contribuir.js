var express = require('express');
var router = express.Router();
var Imovel = require('../models/imovel');
var _ = require('underscore');

/* GET form. */
router.get('/', function(req, res) {
  res.render('contribuir', { title: 'Express' });
});

router.post('/receber', function(req, res) {

    var imovel = new Imovel();

    imovel = _.extend(imovel, req.body);

    if (_.size(req.files.foto) > 0 ) {
        imovel.arquivo = req.files.foto;
    }

    // save the bear and check for errors
    imovel.save(function(err) {
        console.log(imovel);
        if (err) {
            res.render('contribuir', { msg: err });
        }

        res.render('sucesso', { msg: 'Dados armazenados com sucesso! Para acompanhar os processos de notificações verifique seu andamento em nosso site. Agradecemos sua contribuição!' });
    });
});

module.exports = router;

