export {};

const { encryptPassword } = require('./encryptPassword.util');
const { generateAuthToken } = require('./generateAuthToken.util');
const { comparePasswords } = require('./comparePasswords.util');

const authUtils = {
  encryptPassword,
  generateAuthToken,
  comparePasswords,
};

module.exports = {
  authUtils,
};
