// Консольная утилита для ввода учетных данных пользователя, которому будет доступна админка
// Введенные email и хэш пароля сохраняются в базе данных db.js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const db = require('./db.js');
const psw = require('../libs/password');

let email = '';
let hash = '';
let salt = '';
let password = {};

rl.question('Email: ', answer => {
  email = answer;
  rl.question('Password: ', answer => {
    password = psw.setPassword(answer);
    hash = password.hash;
    salt = password.salt;
    rl.close();
  });
});

rl.on('close', () => {
  db.set('user', { email, hash, salt }).write();
});
