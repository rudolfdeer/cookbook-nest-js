export {};

const crypto = require('crypto');
const { CRYPTO } = require('../../constants/auth');

const encryptPassword = (password: string) => {
  if (!password) {
    throw new Error('No data to encrypt.');
  }

  const encryptedPassword = crypto.pbkdf2Sync(
    password,
    CRYPTO.SALT,
    CRYPTO.ITERATIONS,
    CRYPTO.KEYLEN,
    CRYPTO.DIGEST,
  );
  return encryptedPassword.toString('hex');
};

module.exports = {
  encryptPassword,
};
