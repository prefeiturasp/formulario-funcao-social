var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imovelSchema = new Schema({
  contribuidor:  String,
  email: String,
  regiao:   String,
  logradouro: String,
  numero: Number,
  bairro: String,
  cep: Number,
  nome_arquivo_original: String,
  nome_arquivo: String,
  possui_lixo: Boolean,
  portas_lacradas: Boolean,
  depredacao: Boolean,
  outros: Boolean,
  tempo_ocioso:  Number,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Imovel', imovelSchema);