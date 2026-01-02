const path = require('path');
const fs = require('fs');

const loginHtml = fs.readFileSync(
  path.join(__dirname, '../../templates/login.html'),
  'utf-8'
);
const registerHtml = fs.readFileSync(
  path.join(__dirname, '../../templates/register.html'),
  'utf-8'
);
const indexHtml = fs.readFileSync(
  path.join(__dirname, '../../templates/index.html'),
  'utf-8'
);

exports.home = (req, res) => {
  res.send(indexHtml);
};

exports.loginPage = (req, res) => {
  res.send(loginHtml);
};

exports.registerPage = (req, res) => {
  res.send(registerHtml);
};
