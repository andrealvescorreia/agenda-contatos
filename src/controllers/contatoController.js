const Contato = require("../models/ContatoModel");


exports.index = (req, res) => {
  res.render('index-contato', {
    contato: {}
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('/contato/index'));
      return;
    }

    req.flash('success', 'Contato adicionado')
    req.session.save(() => res.redirect(`index/${contato.contato._id}`));
  } catch (e) {
    console.log(e);
    res.rende('404');
    return;
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render('404');
  const contato = await Contato.getById(req.params.id);
  if (!contato) return res.render('404');
  return res.render('index-contato', { contato });
};