import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';
import Login from './modules/Login';

const register = new Login('.form-register');
const login = new Login('.form-login');

register.init();
login.init();