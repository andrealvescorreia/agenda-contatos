require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');


mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => app.emit('pronto'))
  .catch((e) => console.log(e))

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const diasParaMilisegundos = (dias) => 1000 * 60 * 60 * 24 * dias;
const sessionOptions = session({
  secret: 'segredo secreto',
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTIONSTRING
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: diasParaMilisegundos(7),
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

// Nossos middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Rodando em http://localhost:3000');
  });
});
