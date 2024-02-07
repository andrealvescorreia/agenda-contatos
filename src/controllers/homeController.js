const Contato = require("../models/ContatoModel");

exports.index = async (req, res) => {
  const contatos = await Contato.getContatos();
  console.log(contatos)
  res.render('index', { contatos });
};