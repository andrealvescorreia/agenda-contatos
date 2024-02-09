import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }
  init() {
    this.events();
  }

  events() {
    if(!this.form) return;

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      this.validate(e);
      console.log('i am alive');
    })
  }

  validate(e) {
    const formEl = e.target;
    const emailInput = formEl.querySelector('input[name="email"]');
    const passInput = formEl.querySelector('input[name="password"]');
    let error = false;

    if(!validator.isEmail(emailInput.value)) {
      error = true;
      alert('E-mail inválido');
    }
    if(passInput.value.length < 3 || passInput.value.length > 50) {
      error = true;
      alert('Senha precisa ter entre 3 a 50 caracteres');
    }

    if(!error) formEl.submit();
  }
}