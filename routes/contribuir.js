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
    
    // imovel.contribuidor = req.body.contribuidor;
    // imovel.email = req.body.email;
    // imovel.regiao = req.body.regiao;
    // imovel.logradouro = req.body.logradouro;
    // imovel.numero = req.body.numero;
    // imovel.bairro = req.body.bairro;
    // imovel.cep = req.body.cep+req.body.cep2;
    // imovel.possui_lixo = req.body.possui_lixo;
    // imovel.portas_lacradas = req.body.portas_lacradas;
    // imovel.depredacao = req.body.depredacao;
    // imovel.outros = req.body.outros;
    // imovel.tempo_ocioso = req.body.tempo_ocioso;

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

        res.render('sucesso', { msg: 'Dados armazenados com sucesso. Se você informou um email, entraremos em contato assim que tivermos alguma novidade. <br>Obrigado!' });
    });
});

module.exports = router;

