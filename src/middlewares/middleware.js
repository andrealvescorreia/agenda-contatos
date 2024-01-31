exports.middlewareGlobal = (req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.errors = req.flash('errors');
  res.locals.user = req.session.user;
  next();
}

exports.checkError = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') console.log('bad token!');
  if (err) return res.render('404');
}

exports.csrfMiddleware = (req, res, next) => {
  // captura o token e salva em locals
  res.locals.csrfToken = req.csrfToken();
  next();
}