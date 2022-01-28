export {};

const { encryptPassword } = require('./encryptPassword.util');

const comparePasswords = (password: string, hashedPassword: string) => {
  if (!password) {
    throw new Error('No password to compare.');
  }

  const encryptedPassword = encryptPassword(password);
  return encryptedPassword === hashedPassword;
};

module.exports = {
  comparePasswords,
};
