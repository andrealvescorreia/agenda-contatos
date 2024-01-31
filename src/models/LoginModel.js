const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validate();
    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push('Usuário não existe');
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    await this.userExists();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    this.user = await LoginModel.create(this.body);
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email });
    if (user) this.errors.push('E-mail já utilizado');
  }

  validate() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email))
      this.errors.push('E-mail invalido');

    if (this.body.password.length < 3 || this.body.password.length > 50)
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
  }

  cleanUp() {
    // assures every key in the object is string
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    // assures the body only has the keys "email" and "password" (removes the csrf token and anything else)
    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }

}

module.exports = Login;