const jwt = require('jsonwebtoken');

const SECRET_KEY = 'some-secret-key';

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

function checkToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken, checkToken };
