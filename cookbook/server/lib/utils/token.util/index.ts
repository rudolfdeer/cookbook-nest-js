export {};

const { generateToken } = require('./generateToken.util');
const { verifyToken } = require('./verifyToken.util');

const tokenUtils = {
  generateToken,
  verifyToken,
};

module.exports = {
  tokenUtils,
};
