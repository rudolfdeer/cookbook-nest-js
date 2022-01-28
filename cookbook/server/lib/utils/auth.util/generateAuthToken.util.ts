import { TokenPayload } from '../token.util/generateToken.util';

const { tokenUtils } = require('../token.util');

const generateAuthToken = (payload: TokenPayload = {}) => {
  if (!payload.email || !payload.id) {
    throw new Error('No email or id to generate token.');
  }

  const { email, id } = payload;

  const token = tokenUtils.generateToken({ email, id });

  return token;
};

module.exports = {
  generateAuthToken,
};
