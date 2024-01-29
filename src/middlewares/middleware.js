exports.middlewareGlobal = (req, res, next) => {
  next();
}

exports.checkCsrfError = (err, req, res, next) => {// para ser um middleware que captura erros precisa ter esses 4 argumentos! mesmo que o next nao seja usado.
  if(err && err.code === 'EBADCSRFTOKEN') {
    console.log('bad token!');
    return res.render('404');
  }
}

exports.csrfMiddleware = (req, res, next) => {
  // captura o token e salva em locals
  res.locals.csrfToken = req.csrfToken();
  next();
}