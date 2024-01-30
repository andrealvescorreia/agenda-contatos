const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  res.render('login');
}

exports.register = async (req, res) => {
  const login = new Login(req.body);
  await login.register();

  if (login.errors.length > 0) {
    req.flash('errors', login.errors);
    req.session.save(() => {
      return res.redirect('/login/index');
    });
    return;
  }


  req.flash('success', 'Usuário criado com sucesso');
  req.session.save(() => {
    return res.redirect('/login/index');
  });


}

exports.login = async (req, res, next) => {
  next();
}