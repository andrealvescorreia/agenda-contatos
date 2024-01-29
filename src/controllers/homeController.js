exports.paginaInicial = (req, res) => {
  res.render('index');
  return;// fim (ultimo middleware)
}

exports.trataPost = (req, res) => {
  res.send(res.locals);
  return;// fim (ultimo middleware)
}