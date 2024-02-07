const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now() },

})

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.validate();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.validate = function () {
  this.cleanUp();

  if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');

  if (!this.body.email && !this.body.telefone) this.errors.push('É necessário imformar ao menos um contato: email ou telefone.');

  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push('E-mail invalido.');
}

Contato.prototype.cleanUp = function () {
  // assures that every key in the object is a string
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
    this.body[key] = this.body[key].trim();
  }
}

Contato.prototype.edit = async function (id) {
  console.log(this.body);
  if (typeof id !== 'string') return;
  this.validate();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })// new: true diz que assim que atualizar os dados, retornas os dados já atualizados
}

// static
Contato.getById = async function (id) {
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
};

// retorna todos os contatos em ordem de criação (mais recente a mais antigo)
Contato.getContatos = async function () {
  const contatos = await ContatoModel.find()
    .sort({ criadoEm: -1 });
  // -1: decrescente, 1: crescente.

  return contatos;
};


module.exports = Contato;